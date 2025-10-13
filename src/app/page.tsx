import { CertificationSection } from "./components/CertificationSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { WhyProjectsSection } from "./components/WhyProjectsSection";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <CertificationSection />
                <WhyProjectsSection />
            </main>
            <Footer />
        </div>
    );
}
