'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TransitionLink } from '../utils/TransitionLink'
import Magnetic from './ui/Magnetic'
import ShinyText from './ui/ShinyText'
gsap.registerPlugin();

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const menuContentRef = useRef(null)
  const menuIconRef = useRef(null)
  const navbarRef = useRef(null)

  // Track scroll position and control navbar visibility
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    // Initial animation
    gsap.fromTo(navbar,
      { y: -100, opacity: 0, },
      {
        y: 0,
        opacity: 1,
        duration: 1.8,
        stagger: 0.5,
        ease: 'power3.out',
        delay: 0.4
      }
    );

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide navbar
        gsap.to(navbar, {
          y: -100,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      } else if (currentScrollY < lastScrollY || currentScrollY < 10) {
        // Scrolling up or at top - show navbar
        gsap.to(navbar, {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out'
        });

      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      gsap.killTweensOf(navbar);
    };
  }, [])

  // Hamburger Menu Animation
  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        ease: "power3.out"
      });
      gsap.to(menuContentRef.current, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        delay: 0.2,
        ease: "power3.out"
      });
      gsap.to(menuIconRef.current, {
        duration: 0.9,
        rotation: 180,
        ease: "power2.inOut"
      });
    }
    // close menu
    else {
      gsap.to(menuContentRef.current, {
        duration: 0.7,
        opacity: 0,
        y: 30,
        ease: "power2.inOut"
      });
      gsap.to(menuRef.current, {
        duration: 0.9,
        opacity: 0,
        y: "-100%",
        delay: 0.1,
        ease: "expo.inOut"
      });
      gsap.to(menuIconRef.current, {
        duration: 0.8,
        rotation: 0,
        ease: "expo.inOut"
      });
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const menuItems = [
    { label: 'Projects', href: '/#projects' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Resume', href: '' }
  ];

  return (
    <>
      <div ref={navbarRef} className={`content h-12 px-4 md:px-5 py-6 flex justify-between items-center fixed font-pretendard  transition-all duration-300 backdrop-blur-md z-50 w-[80%] ml-[10%] mt-4 rounded-full bg-zinc-950/20 text-zinc-200 to-zinc-950 cursor-pointer border border-zinc-800/40 
      `}
        style={{ transform: 'translateY(-100%)' }}
      >
        <div className="logo-name flex items-center py-4 ">
          <TransitionLink href="/">
            <ShinyText text="R A T A N" />
          </TransitionLink>
        </div>

        <div className="links hidden lg:flex lg:gap-10 gap-2 uppercase ">
          {menuItems.map((item) => (
            <Magnetic key={item.label}>
              <div className='relative group'>
                <TransitionLink href={item.href}>
                  <div className='overflow-hidden'>
                    <ShinyText
                      text={item.label}
                      className="font-medium lg:text-sm text-xs tracking-tight"
                      speed={3}
                      disabled={false}
                    />
                    <span className='block h-[0.5px] w-0 bg-gradient-to-tr from-zinc-200 to-zinc-300 absolute bottom-0 left-0 group-hover:w-full transition-all duration-300'></span>
                  </div>
                </TransitionLink>
              </div>
            </Magnetic>
          ))}
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-zinc-500 focus:outline-none w-6 h-6 relative z-[70]">
            <svg ref={menuIconRef} xmlns="http://www.w3.org/2000/svg" width="24" height="24" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              {isMenuOpen ? (
                <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

    {/* menu on mobile */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-black bg-opacity-100 z-50 flex flex-col items-center justify-center ${isMenuOpen ? '' : 'pointer-events-none'}`}
        style={{ opacity: 0, transform: 'translateY(-100%)' }}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-8  text-zinc-400 hover:text-white transition-colors duration-300 focus:outline-none z-60"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div
          ref={menuContentRef}
          className="text-center relative z-50"
          style={{ opacity: 0, transform: 'translateY(50px)' }}
        >
          {menuItems.map((item) => (
            <div key={item.label} className="my-6">
              <TransitionLink href={item.href} onClick={() => setIsMenuOpen(false)}>
                <ShinyText
                  text={item.label}
                  className="text-4xl font-medium hover:text-white transition-colors duration-300"
                  speed={3}
                  disabled={false}
                />
              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

