"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import Homepage from "@/components/Homepage"
import Projects from "@/components/Projects"
import About from "@/components/About"
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function Home() {


  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenis.on('scroll', ScrollTrigger.update)
  
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
  
    gsap.ticker.lagSmoothing(0)
  }, [])



  return (
    <>
      <div className="main w-full overflow-hidden">
        <Navbar />
        <section id="home">
          <Homepage />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="about">
          <About />
        </section>
      </div>
    </>


  );
}
