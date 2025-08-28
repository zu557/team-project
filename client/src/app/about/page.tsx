"use client";
import { Lightbulb, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      desc: "Debbal.com was founded by three friends in a small coworking space with one big vision.",
    },
    {
      year: "2020",
      title: "First Milestone",
      desc: "Launched our first SaaS product and onboarded 10+ international clients.",
    },
    {
      year: "2022",
      title: "Expanding Globally",
      desc: "Reached clients across 5 countries, growing our team and expertise.",
    },
    {
      year: "2024",
      title: "Innovation & Education",
      desc: "Introduced training programs, empowering hundreds of developers worldwide.",
    },
  ];

  const coreValues = [
    {
      title: "Innovation First",
      desc: "We challenge conventional thinking to develop solutions that give our clients a competitive edge through emerging technologies.",
      icon: Lightbulb,
    },
    {
      title: "Integrity Always",
      desc: "We maintain transparency in all our dealings and take responsibility for delivering on our promises, every time.",
      icon: ShieldCheck,
    },
    {
      title: "Collaborative Spirit",
      desc: "We believe the best solutions emerge from diverse perspectives working together toward shared goals.",
      icon: Users,
    },
  ];

  const stats = [
    { value: "200+", label: "Satisfied Clients" },
    { value: "98%", label: "Client Retention" },
    { value: "5", label: "Countries Served" },
    { value: "40+", label: "Industry Awards" },
  ];

  return (
    <div className="space-y-16 bg-sidebar-border ">
      <div
        className="h-92 relative  flex  flex-col justify-center items-center "
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center z-10 space-y-4 px-4 md:px-0"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary animate-fadeInUp">
            About Us
          </h1>
          <p className="text-background leading-relaxed text-center max-w-2xl mx-auto">
            At Debbal.com, we craft digital solutions that inspire growth,
            creativity, and lasting impact. From development and design to cloud
            and education, we empower businesses and individuals to thrive in
            the digital era.
          </p>
        </motion.div>
      </div>

      <div className="space-y-10 py-10">
        <div className="relative max-w-5xl mx-auto px-6 py-10">
          <h2 className="text-4xl font-bold text-center text-primary mb-20">
            Our Journey
          </h2>

          <div className="  relative">
            <div className="absolute left-1/2 top-0 h-full w-1 bg-primary/30 transform -translate-x-1/2" />
            <div className="absolute top-8 left-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background transform -translate-x-1/2 shadow-md" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative w-full md:w-1/2 px-6 py-4 ${
                  i % 2 === 0
                    ? "md:pr-12 md:ml-auto text-left"
                    : "md:pl-12 text-right"
                }`}
              >
                <div className="bg-card text-card-foreground shadow-xl  cursor-pointer rounded-none p-8 hover:shadow-2xl transition-shadow duration-300">
                  <span className="text-sm font-medium text-primary tracking-wide">
                    {item.year}
                  </span>
                  <h3 className="text-2xl font-semibold mt-2">{item.title}</h3>
                  <p className="text-muted-foreground mt-3 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className=" px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.3 }}
            className="flex items-center gap-4 max-w-6xl mx-auto flex-col md:grid md:grid-cols-3 lg:grid-cols-3"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.3 * index }}
              >
                <Card className="px-12 py-4 rounded-none">
                  <CardTitle className="flex items-center gap-3">
                    <value.icon className="text-primary " size={40} />{" "}
                    <span>{value.title}</span>
                  </CardTitle>
                  <CardContent>
                    <p>{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <section
          className="relative py-20"
          style={{
            backgroundImage: 'url("/about.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="text-5xl font-extrabold tracking-tight text-primary">
                    {stat.value}
                  </h3>
                  <p className="text-lg text-background">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
