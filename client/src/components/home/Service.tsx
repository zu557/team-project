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
export default function Service() {
  const services = [
    {
      title: "Web Development",
      description:
        "We build scalable, modern, and fast web applications tailored to your business needs.",
      icon: Globe,
    },
    {
      title: "UI/UX Design",
      description:
        "Creating user-friendly, engaging, and modern interfaces that leave lasting impressions.",
      icon: Palette,
    },
    {
      title: "SEO & Marketing",
      description:
        "Optimized strategies to boost your brand’s online visibility and reach the right audience.",
      icon: LineChart,
    },
    {
      title: "Cloud Solutions",
      description:
        "Secure, reliable, and cost-efficient cloud infrastructure setup and management.",
      icon: Cloud,
    },
    {
      title: "Full Stack Education",
      description:
        "Comprehensive training in MERN/Next.js, DevOps, and best practices for aspiring developers.",
      icon: GraduationCap,
    },
    {
      title: "Enterprise Solutions",
      description:
        "Complex, scalable enterprise-grade applications with modern architecture and cloud integration.",
      icon: Layers,
    },
  ];
  return (
    <section className="bg-sidebar-border">
      <div className="space-y-5 max-w-7xl  mx-auto px-5 py-10">
        <h1 className="text-center text-3xl md:text-4xl font-bold">
          Our Service
        </h1>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:border-primary shadow-sm hover:shadow-xl transition-shadow border border-border group cursor-pointer rounded-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                    <service.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
