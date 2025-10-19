import { CertificationSection } from "./components/CertificationSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { ModalForm } from "./components/ModalForm";
import { Navbar } from "./components/Navbar";
import { WhyProjectsSection } from "./components/WhyProjectsSection";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            <main className="flex-1">
                <img
                    src="/fast-badge.svg"
                    alt="Blazingly fast badge"
                    className="mx-auto mt-6 block"
                />
                <img
                    src="/slow-badge.svg"
                    alt="Blazingly pending badge"
                    className="mx-auto mt-2 block"
                />
                <img
                    src="/mid-badge.svg"
                    alt="Blazingly pending badge"
                    className="mx-auto mt-2 block"
                />
                <Hero />
                <CertificationSection />
                <WhyProjectsSection />
            </main>
            <Footer />
            <ModalForm />
        </div>
    );
}
