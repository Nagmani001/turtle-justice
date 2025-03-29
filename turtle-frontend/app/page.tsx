import Footer from "./components/Footer";
import HeroSection from "./components/Hero";
import NavBar from "./components/Nav";
import Pitch from "./components/Pitch";

export default function Home() {
  return <div>
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <NavBar />
      <HeroSection />
      <Pitch />
      <Footer />
    </div>
  </div>
}
