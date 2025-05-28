"use client";

import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

export default function Portfolio() {
  return (
    <main>
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
