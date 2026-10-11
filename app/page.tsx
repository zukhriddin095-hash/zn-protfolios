import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Journey } from "@/components/journey";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main><Hero /><Marquee /><About /><Skills /><Projects /><Journey /><Contact /></main>
      <Footer />
    </>
  );
}
