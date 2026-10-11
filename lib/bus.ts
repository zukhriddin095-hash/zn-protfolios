// Tiny event bus: terminal <-> 3D scene.
export const emit = (name: "text" | "burst", detail?: string) =>
  window.dispatchEvent(new CustomEvent("zn:" + name, { detail }));
