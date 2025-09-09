"use client";

import { Controller, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSendEmail } from "@/api/useSendEmail";
import Spinner from "@/components/SpinnerMini";

type FormValues = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>();
  const { mutate, isPending } = useSendEmail();

  function onSubmit(values: FormValues) {
    mutate(values, {
      onSuccess: () => reset(),
    });
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="w-full min-h-screen bg-sidebar-border">
      <section
        className="relative h-[60vh] flex items-center justify-center text-primary-foreground overflow-hidden"
        style={{
          backgroundImage: 'url("/contact.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center px-6 z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-3 mb-6 bg-primary-foreground/10 backdrop-blur-sm"
          >
            <MessageSquare className="h-12 w-12 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            We&apos;d love to hear from you! Reach out with your questions,
            feedback, or just to say hello.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto py-12">
        {" "}
        <section className=" px-6 -mt-16 relative z-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Mail className="h-6 w-6" />,
                title: "Email Us",
                detail: "info@example.com",
                description: "Send us an email anytime",
              },
              {
                icon: <Phone className="h-6 w-6" />,
                title: "Call Us",
                detail: "+251935444997",
                description: "Mon-Fri from 8am to 6pm",
              },
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "Visit Us",
                detail: "Arat Anbessa",
                description: "Jimma, Ethiopia",
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Open Hours",
                detail: "Mon - Fri: 9am - 5pm",
                description: "Weekends: Closed",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="text-center p-6 rounded-none h-full shadow-lg border-0 bg-background transition-all duration-300 hover:shadow-xl">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 text-primary mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="font-medium text-primary mb-1">{item.detail}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
        <div className="px-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-5 py-10 ">
          <div className="flex-1 space-y-5 border px-4 py-10 bg-background">
            <h1 className="text-center text-muted-foreground text-xl font-medium">
              Send us message
            </h1>
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  className="rounded-none"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  className="rounded-none"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Phone (optional)</Label>
                <Input className="rounded-none" {...register("phone")} />
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Controller
                  name="subject"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full max-w-[200px] rounded-none">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="NewProject">
                            New Project
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subject && (
                  <p className="text-destructive text-sm">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  className="rounded-none h-32"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <p className="text-destructive text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full rounded-none">
                {isPending ? <Spinner /> : "Send Message"}
              </Button>
            </form>
          </div>

          <div className="flex-1 h-[450px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127641.00164575593!2d38.6853267!3d9.0107934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85c0d9efad5d%3A0x8d6cf5d85edfd8c7!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1692832822222!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <FrequentlyAskedQuestion />
        </div>
      </div>
    </div>
  );
}

function FrequentlyAskedQuestion() {
  const faqList = [
    {
      question: "What's your typical response time for new inquiries?",
      answer:
        "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call our office directly.",
    },
    {
      question: "Do you offer free consultations?",
      answer:
        "Yes! We offer a free 30-minute initial consultation to discuss your project needs and determine if we're a good fit for each other.",
    },
    {
      question: "What information should I include in my project inquiry?",
      answer:
        "The more details you can provide about your goals, timeline, and budget, the better we can tailor our response. Include any relevant documents or examples that illustrate what you're looking for.",
    },
    {
      question: "Can I visit your office in person?",
      answer:
        "Absolutely! We'd love to meet you. Please schedule an appointment in advance so we can ensure the right team members are available to meet with you.",
    },
  ];

  return (
    <section className="space-y-8 px-5">
      <header>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground">
          Frequently Asked Questions
        </h1>
        <div className="w-full h-[2px] bg-border mt-4 mb-6" />
      </header>

      <div className="space-y-4">
        {faqList.map((faq, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={`faq-${index}`}>
              <AccordionTrigger className="lg:text-xl font-medium text-muted-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
