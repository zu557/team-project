"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Globe,
  Palette,
  LineChart,
  Cloud,
  GraduationCap,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Service() {
  const services = [
    {
      title: "Web Development",
      description:
        "We build scalable, modern, and fast web applications tailored to your business needs.",
      icon: Globe,
      image: "/services/web.png",
    },
    {
      title: "UI/UX Design",
      description:
        "Creating user-friendly, engaging, and modern interfaces that leave lasting impressions.",
      icon: Palette,
      image: "/services/ui.png",
    },
    {
      title: "SEO & Marketing",
      description:
        "Optimized strategies to boost your brand’s online visibility and reach the right audience.",
      icon: LineChart,
      image: "/services/ceo.png",
    },
    {
      title: "Cloud Solutions",
      description:
        "Secure, reliable, and cost-efficient cloud infrastructure setup and management.",
      icon: Cloud,
      image: "/services/cloud.png",
    },
    {
      title: "Full Stack Education",
      description:
        "Comprehensive training in MERN/Next.js, DevOps, and best practices for aspiring developers.",
      icon: GraduationCap,
      image: "/services/fullstack.png",
    },
    {
      title: "Enterprise Solutions",
      description:
        "Complex, scalable enterprise-grade applications with modern architecture and cloud integration.",
      icon: Layers,
      image: "/services/enterprise.png",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-background via-muted/40 to-background">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="space-y-5 max-w-7xl mx-auto px-5 py-16">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold">
          Our <span className="text-primary">Services</span>
        </h1>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto">
          Discover our range of services designed to help your business grow,
          scale, and thrive in the digital age.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mt-10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="group relative overflow-hidden border-none shadow-lg rounded-2xl">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <service.icon className="w-12 h-12 text-white group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-center">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Button className="rounded-full" asChild>
                    <Link href="/service">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
