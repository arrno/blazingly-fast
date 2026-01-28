import { CertificationSection } from "./components/CertificationSection";
import { ContactModal } from "./components/ContactModal";
import { Footer } from "./components/Footer";
import { HowSection } from "./components/HowSection";
import { TerminalHero } from "./components/TerminalHero";
// import { LiveSubmissionCounter } from "./components/LiveSubmissionCounter";
import { ModalForm } from "./components/ModalForm";
import { Navbar } from "./components/Navbar";
import { WhyProjectsSection } from "./components/WhyProjectsSection";

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            {/* <LiveSubmissionCounter /> */}
            <main className="flex-1">
                <TerminalHero variant="lightPurple" />
                <HowSection />
                <CertificationSection />
                <WhyProjectsSection />
            </main>
            <Footer />
            <ModalForm />
            <ContactModal />
        </div>
    );
}
