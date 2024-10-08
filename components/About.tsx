import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Magnetic from './ui/Magnetic'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const About = () => {

    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const contentRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const container = containerRef.current
        const title = titleRef.current
        const content = contentRef.current
        const pic = document.querySelector('.pic') as HTMLElement
        const icons = document.querySelector('.icons') as HTMLElement

        if (container && title && content && pic && icons) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top 100%',
                    end: 'bottom bottom',
                    toggleActions: 'play none none reverse',
                    scrub: 1,
                }
            });

            tl.fromTo(
                [title, content],
                {
                    opacity: 0,
                    y: 50,
                    backgroundImage: 'linear-gradient(to right, rgba(161, 161, 170, 0) 0%, rgba(161, 161, 170, 0) 100%)',
                },
                {
                    opacity: 1,
                    y: 0,
                    backgroundImage: 'linear-gradient(to right, rgba(161, 161, 170, 1) 0%, rgba(244, 244, 245, 1) 100%)',
                    ease: 'power2.out',
                    duration: 1,
                    stagger: 0.5,
                }
            )
            .fromTo(
                title,
                { backgroundSize: '0% 100%' },
                { backgroundSize: '100% 100%', duration: 1, ease: 'power2.out' },
                '<'
            )
            .fromTo(
                content,
                { clipPath: 'inset(0 100% 0 0)' },
                { clipPath: 'inset(0 0% 0 0)', duration: 1.5, ease: 'power2.out' },
                '<0.2'
            );

            gsap.fromTo(
                pic,
                { opacity: 0, scale: 0.8 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: pic,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )

            gsap.fromTo(
                icons.children,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: icons,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    }
                }
            )
        }

        // Cleanup function
        return () => {
            // Kill all ScrollTriggers to prevent memory leaks
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []) 

    return (
        <div ref={containerRef} className='about-content w-full min-h-screen bg-gradient-to-t to-zinc-900 from-zinc-800 overflow-hidden'>
            <div className='content flex flex-col w-full justify-center min-h-screen items-center p-4 sm:p-8 md:p-16'>
                <h1 ref={titleRef} className='text-4xl sm:text-5xl md:text-6xl font-deutschlander w-fit h-fit p-4 text-center font-bold bg-gradient-to-r from-zinc-500 to-zinc-100 bg-clip-text text-transparent'>About</h1>

                <div className='flex flex-col md:flex-row justify-between items-center p-4 mt-8 md:mt-16'>
                    <div className="pic lg:w-64 lg:h-72 w-40 h-40 m-4 md:m-10 rounded-2xl overflow-hidden">
                        <Image src="/images/me.jpg" alt="Ratan Rathod" width={300} height={300} className='w-full h-full object-cover hover:scale-105 transition-all duration-150 ease-in-out' />
                    </div>

                    <div className='flex flex-col justify-center font-malven leading-normal tracking-wider items-center mt-14 md:mt-10'>
                        <p ref={contentRef} className='text-base sm:text-lg md:text-xl bg-gradient-to-r self-center text-center from-zinc-500 to-zinc-100 bg-clip-text text-transparent w-full md:w-[50vw]'>
                            Im Ratan Rathod, a passionate software developer based in Pune. As a self-taught developer, I love building innovative projects and exploring new technologies. With expertise in JavaScript, TypeScript, and various frontend frameworks like React and Next.js, I specialize in creating responsive and interactive web applications. My experience extends to backend technologies as well, including Node.js and Express.
                            <br />
                            <br />
                            I&apos;m dedicated to optimizing performance and enhancing user experiences through advanced UI/UX design principles and cutting-edge animation techniques.</p>

                        <div className="icons mt-6 flex justify-center items-center flex-col w-full">
                            <div className="flex justify-center items-center space-x-4 sm:space-x-6 md:space-x-10">
                                <Magnetic>
                                <a href="https://github.com/ratanz" target="_blank" rel="noopener noreferrer" className="text-zinc-400 w-fit
                                bg-zinc-900 p-2 rounded-md hover:text-zinc-100 transition-colors">
                                    <FaGithub className="w-6 h-6" />
                                </a>
                                </Magnetic>
                                <Magnetic>
                                <a href="https://linkedin.com/in/ratanrathod7" target="_blank" rel="noopener noreferrer" className="text-zinc-400 w-fit bg-zinc-900 p-2 rounded-md hover:text-zinc-100 transition-colors">
                                    <FaLinkedin className="w-6 h-6" />
                                </a>
                                </Magnetic>
                                <Magnetic>
                                <a href="https://twitter.com/ratanz_codes" target="_blank" rel="" className="text-zinc-400 bg-zinc-900 p-2 rounded-md hover:text-zinc-100 transition-colors">
                                    <FaTwitter className="w-6 h-6" />
                                </a>
                                </Magnetic>
                                <Magnetic>
                                <a href="mailto:ratanrathod7@outlook.com" className="text-zinc-400 bg-zinc-900 p-2 rounded-md hover:text-zinc-100 transition-colors">
                                    <MdEmail className="w-6 h-6" />
                                </a>
                                </Magnetic>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
