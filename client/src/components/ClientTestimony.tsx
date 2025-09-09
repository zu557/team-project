"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO, TechNova",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "Working with this team transformed our product. The process was smooth, communication was excellent, and delivery exceeded expectations.",
    },
    {
      name: "James Lee",
      role: "Founder, Finlytics",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "Their full-stack expertise is unmatched. They brought our MVP to market twice as fast as expected, with beautiful design and solid code.",
    },
    {
      name: "Alicia Gomez",
      role: "CEO, BrightLearn",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      quote:
        "The best development partner we’ve had. Professional, detail-oriented, and genuinely invested in our success.",
    },
  ];

  return (
    <section className="py-20  bg-sidebar-border">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What Our Clients Say
        </h2>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.3 }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                delay: i * 0.4,
                ease: [0, 0, 0.58, 1],
              }}
            >
              <Card className=" rounded-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <Avatar className="w-16 h-16 border-4 border-primary/20">
                    <AvatarImage src={t.image} alt={t.name} />
                    <AvatarFallback>{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-600 italic">“{t.quote}”</p>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
