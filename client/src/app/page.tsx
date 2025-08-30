import HomeAbout from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Service from "@/components/home/Service";
import ClientTestimony from "@/components/ClientTestimony";

export default function Home() {
  return (
    <>
      <Hero />
      <Service />
      <HomeAbout />
      <ClientTestimony />
    </>
  );
}
