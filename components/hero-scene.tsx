"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VS = `attribute vec3 aB;attribute float aR;uniform float uT,uMix,uB,uP;uniform vec2 uM;varying float vA;
void main(){vec3 p=mix(position,aB,uMix);p.z+=sin(uT*.8+aR*6.28)*.25;p.y+=sin(uT+aR*20.)*.04;
vec2 d=p.xy-uM;float f=smoothstep(2.6,0.,length(d));p.xy+=normalize(d+1e-4)*f*1.7;p.z+=f*2.6*(aR-.5)*2.;
p.xy+=normalize(p.xy+1e-3)*uB*(2.+aR*10.);p.z+=uB*(aR-.5)*14.;vA=.4+.6*(1.-f*.6);
vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=uP*(1.+aR)*(10./-mv.z);}`;
const FS = `uniform vec3 uC;varying float vA;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(uC,vA*smoothstep(.5,.1,d));}`;

/** GPU particles: "</>" morphs into "ZN" on scroll, repels from the cursor, spells whatever is typed in the terminal. */
export default function HeroScene({ heroRef }: { heroRef: React.RefObject<HTMLElement> }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const [nogl, setNogl] = useState(false);

  useEffect(() => {
    const canvas = cv.current, hero = heroRef.current;
    if (!canvas || !hero) return;
    const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let R: THREE.WebGLRenderer;
    try { R = new THREE.WebGLRenderer({ canvas, alpha: true, powerPreference: "low-power" }); } catch { setNogl(true); return; }

    const mob = innerWidth < 760, N = mob ? 2600 : 6500, ff = getComputedStyle(document.body).fontFamily;
    R.setPixelRatio(Math.min(devicePixelRatio, mob ? 1.5 : 2));
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    cam.position.z = 14;
    let dead = false, raf = 0, vis = true, burst = 0, px = 0, py = 0, tm = 0, m = 0, sx = 0, sy = 0, hw = 10;
    const hh = 5.8, clk = new THREE.Clock(), g = new THREE.BufferGeometry();
    let mat: THREE.ShaderMaterial, pts: THREE.Points;
    const dark = () => document.documentElement.classList.contains("dark");

    const sample = (t: string, fs: number) => {
      const c = document.createElement("canvas"); c.width = 640; c.height = 260;
      const x = c.getContext("2d")!; x.fillStyle = "#fff"; x.font = `700 ${fs}px ${ff}`; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(t, 320, 135);
      const d = x.getImageData(0, 0, 640, 260).data, p: number[] = [];
      for (let i = 0; i < d.length; i += 4) if (d[i] > 128) { const k = i / 4; p.push(k % 640, (k / 640) | 0); }
      const a = new Float32Array(N * 3), n = Math.max(1, p.length / 2);
      for (let i = 0; i < N; i++) { const j = ((Math.random() * n) | 0) * 2; a[i * 3] = (p[j] - 320) * 0.014; a[i * 3 + 1] = -(p[j + 1] - 135) * 0.014; a[i * 3 + 2] = (Math.random() - 0.5) * 0.6; }
      return a;
    };
    const setText = (t?: string) => {
      const s = (t || "</>").slice(0, 12), fs = Math.min(190, Math.floor(600 / (s.length * 0.6)));
      g.attributes.position.array.set(sample(s, fs)); g.attributes.position.needsUpdate = true;
      burst = Math.max(burst, 0.25); if (rm) draw();
    };
    const theme = () => {
      if (!mat) return;
      mat.uniforms.uC.value.set(dark() ? 0x39ff88 : 0x007a3d);
      mat.blending = dark() ? THREE.AdditiveBlending : THREE.NormalBlending; mat.needsUpdate = true; if (rm) draw();
    };
    function size() {
      const w = hero!.clientWidth, h = hero!.clientHeight, d = w > 900;
      R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); hw = hh * cam.aspect;
      pts.scale.setScalar(Math.min(0.95, (d ? 0.093 : 0.178) * hw)); pts.position.set(d ? hw * 0.5 : 0, d ? 0 : hh * 0.5, 0); if (rm) draw();
    }
    function draw() {
      const u = mat.uniforms, s = pts.scale.x;
      if (!rm) {
        m += (tm - m) * 0.06; sx += (px - sx) * 0.12; sy += (py - sy) * 0.12; burst *= 0.94;
        u.uT.value = clk.getElapsedTime(); u.uMix.value = m; u.uB.value = burst > 0.01 ? burst : 0;
        u.uM.value.set((sx * hw - pts.position.x) / s, (-sy * hh - pts.position.y) / s);
      }
      pts.position.z = -m * 3; R.render(sc, cam);
    }
    const loop = () => { if (!vis) return; draw(); raf = requestAnimationFrame(loop); };
    const onMove = (e: PointerEvent) => { px = (e.clientX / innerWidth) * 2 - 1; py = (e.clientY / innerHeight) * 2 - 1; };
    const onScroll = () => { tm = Math.min(1, (scrollY / innerHeight) * 1.8); };
    const onText = (e: Event) => setText((e as CustomEvent).detail);
    const onBurst = () => { if (!rm) burst = 1; };
    const onVis = () => { vis = !document.hidden; cancelAnimationFrame(raf); if (vis && !rm) loop(); };
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting && !document.hidden; cancelAnimationFrame(raf); if (vis && !rm) loop(); });
    const mo = new MutationObserver(theme);
    const lost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); setNogl(true); };

    Promise.resolve(document.fonts?.load(`700 190px ${ff}`)).catch(() => {}).then(() => {
      if (dead) return;
      g.setAttribute("position", new THREE.BufferAttribute(sample("</>", 190), 3));
      g.setAttribute("aB", new THREE.BufferAttribute(sample("ZN", 250), 3));
      g.setAttribute("aR", new THREE.BufferAttribute(Float32Array.from({ length: N }, Math.random), 1));
      mat = new THREE.ShaderMaterial({
        uniforms: { uT: { value: 0 }, uMix: { value: 0 }, uB: { value: 0 }, uM: { value: new THREE.Vector2(99, 99) }, uP: { value: 3.2 * R.getPixelRatio() }, uC: { value: new THREE.Color(0x39ff88) } },
        vertexShader: VS, fragmentShader: FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      });
      pts = new THREE.Points(g, mat); pts.frustumCulled = false; sc.add(pts);
      theme(); size();
      addEventListener("pointermove", onMove, { passive: true }); addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", size); addEventListener("zn:text", onText); addEventListener("zn:burst", onBurst);
      document.addEventListener("visibilitychange", onVis); canvas.addEventListener("webglcontextlost", lost);
      io.observe(hero); mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      if (rm) draw(); else loop();
    });

    return () => {
      dead = true; cancelAnimationFrame(raf); io.disconnect(); mo.disconnect();
      removeEventListener("pointermove", onMove); removeEventListener("scroll", onScroll); removeEventListener("resize", size);
      removeEventListener("zn:text", onText); removeEventListener("zn:burst", onBurst);
      document.removeEventListener("visibilitychange", onVis); canvas.removeEventListener("webglcontextlost", lost);
      g.dispose(); mat?.dispose(); R.dispose();
    };
  }, [heroRef]);

  return nogl ? (
    <div aria-hidden className="absolute right-[8%] top-[22%] aspect-square w-[min(38vw,420px)] rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)),transparent_70%)] opacity-30 blur-2xl" />
  ) : (
    <canvas ref={cv} aria-hidden="true" className="absolute inset-0 h-full w-full max-md:opacity-60" />
  );
}
