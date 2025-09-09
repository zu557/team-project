import HomeAbout from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Service from "@/components/home/Service";
import ClientTestimony from "@/components/ClientTestimony";
import ReadyToContact from "@/components/home/ReadyToContact";

export default function Home() {
  return (
    <>
      <Hero />
      <Service />
      <HomeAbout />
      <ReadyToContact />
      <ClientTestimony />
    </>
  );
}
