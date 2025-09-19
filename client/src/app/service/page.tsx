"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Palette,
  LineChart,
  Cloud,
  GraduationCap,
  Layers,
} from "lucide-react";
import ClientTestimony from "@/components/ClientTestimony";
import Image from "next/image";

export default function ServicePage() {
  const services = [
    {
      title: "Web Development",
      description:
        "We build scalable, modern, and fast web applications tailored to your business needs.",
      icon: Globe,
      image: "/services/web.png",
      link: "/services/web",
    },
    {
      title: "UI/UX Design",
      description:
        "Creating user-friendly, engaging, and modern interfaces that leave lasting impressions.",
      icon: Palette,
      image: "/services/ui.png",
      link: "/services/design",
    },
    {
      title: "SEO & Marketing",
      description:
        "Optimized strategies to boost your brand’s online visibility and reach the right audience.",
      icon: LineChart,
      image: "/services/ceo.png",
      link: "/services/seo",
    },
    {
      title: "Cloud Solutions",
      description:
        "Secure, reliable, and cost-efficient cloud infrastructure setup and management.",
      icon: Cloud,
      image: "/services/cloud.png",
      link: "/services/cloud",
    },
    {
      title: "Full Stack Education",
      description:
        "Comprehensive training in MERN/Next.js, DevOps, and best practices for aspiring developers.",
      icon: GraduationCap,
      image: "/services/fullstack.png",
      link: "/services/education",
    },
    {
      title: "Enterprise Solutions",
      description:
        "Complex, scalable enterprise-grade applications with modern architecture and cloud integration.",
      icon: Layers,
      image: "/services/enterprise.png",
      link: "/services/enterprise",
    },
  ];

  return (
    <div className=" space-y-5 bg-sidebar-border">
      <div
        className="h-72 relative  flex  flex-col justify-center items-center "
        style={{
          backgroundImage:
            'url(" https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 z-0  bg-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4 z-10 "
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary animate-fadeInUp">
            Our Services
          </h1>
          <p className=" text-primary-foreground ">
            We craft innovative digital solutions — from development and design
            to cloud and education — empowering your growth in the modern world.
          </p>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-6 space-y-15 py-10">
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
                {/* Service image */}
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
                  <Button className="rounded-full">Read More</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

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
            size="lg"
            className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Get in Touch
          </Button>
        </motion.div>
        <Testimonials />
      </div>
    </div>
  );
}
