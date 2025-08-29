"use client";
import { Lightbulb, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomeAbout() {
  const coreValues = [
    {
      title: "Innovation First",
      desc: "We challenge conventional thinking with emerging technologies.",
      icon: Lightbulb,
    },
    {
      title: "Integrity Always",
      desc: "Transparency and trust guide every solution we deliver.",
      icon: ShieldCheck,
    },
    {
      title: "Collaborative Spirit",
      desc: "The best results come from diverse teams working together.",
      icon: Users,
    },
  ];

  return (
    <section>
      <div className="max-w-7xl  mx-auto px-5 py-10    space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-primary text-center"
        >
          About Us
        </motion.h2>

        <p className=" text-[14px] md:text-base text-muted-foreground max-w-3xl mx-auto">
          At Debbal.com, we craft digital solutions that inspire growth and
          creativity. From software development to cloud and education, we
          empower businesses and individuals to thrive in the digital era.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="p-6 h-full text-left rounded-none">
                <CardTitle className="flex items-center gap-3 mb-3">
                  <value.icon className="text-primary" size={32} />
                  {value.title}
                </CardTitle>
                <CardContent>
                  <p>{value.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="px-8 py-2 rounded-full">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
