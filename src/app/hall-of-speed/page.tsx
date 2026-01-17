import type { Metadata } from "next";
import { ContactModal } from "../components/ContactModal";
import { Footer } from "../components/Footer";
import { ModalForm } from "../components/ModalForm";
import { Navbar } from "../components/Navbar";
import { PageSection } from "../components/PageSection";
import { RepoListTable } from "../components/RepoListTable";
// import { LiveSubmissionCounter } from "../components/LiveSubmissionCounter";

const description =
    "Browse every Certified Blazingly Fast™ project, complete with maintainers, repos, and speed claims in the Hall of Speed.";

export const metadata: Metadata = {
    title: "Hall of Speed",
    description,
    alternates: {
        canonical: "/hall-of-speed",
    },
    openGraph: {
        title: "Hall of Speed",
        description,
        url: "https://blazingly.fast/hall-of-speed",
        images: [
            {
                url: "/fast-badge.svg",
                alt: "Certified Blazingly Fast badge",
            },
        ],
    },
    twitter: {
        title: "Hall of Speed",
        description,
        images: ["/fast-badge.svg"],
    },
};

export default function HallOfSpeedPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            {/* <LiveSubmissionCounter /> */}
            <main className="flex-1 bg-zinc-50">
                <PageSection className="flex flex-col items-center gap-10 py-24 text-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                            <span className="sm:text-4xl text-3xl">🏆</span>{" "}
                            Hall of Speed{" "}
                            <span className="sm:text-4xl text-3xl">🏆</span>
                        </h1>
                        <p className="max-w-2xl text-base leading-relaxed text-gray-600">
                            Every badge we issue lands here. Bold claims, honest
                            checkboxes, and a public record of projects that
                            proudly shout “blazingly fast” before the benchmarks
                            catch up.
                        </p>
                    </div>
                    <div className="w-full max-w-4xl">
                        <RepoListTable />
                    </div>
                </PageSection>
            </main>
            <Footer />
            <ModalForm />
            <ContactModal />
        </div>
    );
}
