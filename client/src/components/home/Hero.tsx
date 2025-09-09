"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div
      className="h-[80vh] relative overflow-hidden"
      style={{
        backgroundImage: "url('/home.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10 space-y-7 flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <motion.h1 className="text-4xl text-background font-bold md:text-5xl lg:text-6xl">
            Welcome to <span className="text-primary">Debbal</span>
          </motion.h1>
          <h2 className="text-xl text-background font-medium md:text-2xl lg:text-3xl">
            Building Smarter Digital Solutions for the Future
          </h2>
        </motion.div>
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-border max-w-2xl"
          >
            We help businesses design, build, and scale modern technology — from
            intuitive web & mobile apps to enterprise-grade platforms — so you
            can stay ahead in the digital era.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="flex gap-4"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
