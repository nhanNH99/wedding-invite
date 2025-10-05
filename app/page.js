import EventsSection from "./components/EventsSection";
import Hero from "./components/Hero";
import NameSection from "./components/NameSection";
import Timeline from "./components/Timeline";
import Countdown from "./components/Countdown";
import AboutUs from "./components/AboutUs";
import OurJourney from "./components/OurJourney";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import ThankYou from "./components/ThankYou";
import MusicPlayer from "./components/MusicPlayer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingHearts from "./components/FloatingHearts";

export default function Page() {
  return (
    <>
      <main className="mx-auto max-w-screen-md px-4 sm:px-6 bg-[var(--paper)] text-[var(--ink)]">
        {/* HERO */}
        <Hero />

        {/* NAMES */}
        <NameSection />

        {/* EVENTS */}
        <EventsSection />

        {/* TIME LINE */}
        <Timeline />

        {/* COUNTDOWN */}
        <Countdown />

        {/* ABOUT US */}
        <AboutUs />

        {/* OUR JOURNEY */}
        <OurJourney />

        {/* GALLERY */}
        <Gallery />

        {/* RSVP - Gửi lời chúc */}
        <RSVP />

        {/* THANK YOU */}
        <ThankYou />
      </main>

      {/* Music Player - Fixed position */}
      <MusicPlayer />

      {/* Scroll to Top Button - Fixed position */}
      <ScrollToTop />

      {/* Floating Hearts Animation */}
      <FloatingHearts />
    </>
  );
}
