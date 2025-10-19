import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { PageSection } from "../components/PageSection";
import { ProjectTable } from "../components/ProjectTable";

export default function HallOfSpeedPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            <main className="flex-1 bg-gradient-to-b from-white via-white to-gray-50">
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
                    <div className="w-full max-w-5xl">
                        <ProjectTable />
                    </div>
                </PageSection>
            </main>
            <Footer />
        </div>
    );
}
