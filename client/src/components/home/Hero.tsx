"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Welcome to",
    subtitle: "Building Smarter Digital Solutions for the Future",
    description:
      "We help businesses design, build, and scale modern technology — from intuitive web & mobile apps to enterprise-grade platforms — so you can stay ahead in the digital era.",
    image: "/home.png",
  },
  {
    title: "Innovate with",
    subtitle: "Your Technology Partner for Growth",
    description:
      "From startups to enterprises, we create solutions that transform ideas into scalable digital products.",
    image: "/home2.png",
  },
  {
    title: "Future-Ready",
    subtitle: "Empowering Businesses Worldwide",
    description:
      "We deliver enterprise-grade systems that help organizations stay ahead in competitive markets.",
    image: "/home3.png",
  },
];
export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <div
      className="h-[80vh] relative overflow-hidden"
      style={{
        backgroundImage: `url('${slide.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 flex flex-col justify-center h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl text-background font-bold md:text-5xl lg:text-6xl">
              {slide.title} <span className="text-primary">Debbal</span>
            </h1>
            <h2 className="text-xl text-background font-medium md:text-2xl lg:text-3xl">
              {slide.subtitle}
            </h2>
            <p className="text-border max-w-2xl">{slide.description}</p>

            <div className="flex gap-4">
              <Button asChild className="px-8 py-2 rounded-full">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-8 py-2 rounded-full"
              >
                <Link href="/service">Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index
                ? "bg-primary scale-125 shadow-lg"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
