"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
export default function ReadyToContact() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className=" text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fadeInUp">
          Ready to Elevate Your Business?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-fadeIn delay-200">
          Let’s collaborate and build impactful solutions that combine
          technology, design, and education for long-term success.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </motion.div>
    </div>
  );
}
