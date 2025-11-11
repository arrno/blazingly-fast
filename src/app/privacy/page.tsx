import type { Metadata } from "next";
import { ContactModal } from "../components/ContactModal";
import { Footer } from "../components/Footer";
// import { LiveSubmissionCounter } from "../components/LiveSubmissionCounter";
import { ModalForm } from "../components/ModalForm";
import { Navbar } from "../components/Navbar";
import { PageSection } from "../components/PageSection";

const lastUpdated = "November 9, 2025";

const description =
    "How we handle submissions, GitHub repo snapshots, and privacy-first analytics on blazingly.fast.";

export const metadata: Metadata = {
    title: "Privacy",
    description,
    alternates: { canonical: "/privacy" },
    openGraph: {
        title: "Privacy",
        description,
        url: "https://blazingly.fast/privacy",
    },
    twitter: { title: "Privacy", description },
};

const sections = [
    {
        heading: "What we collect",
        body: [
            "What you submit: project name, repo URL, your heroic performance claim, and (optionally) contact email.",
            "GitHub snapshot: when you submit, we fetch public repo metadata (e.g., stars, forks, issues, topics, default branch) to display in the Hall of Speed. We may refresh this occasionally to keep things current.",
            "Analytics: we use privacy-first, cookie-free Vercel Web Analytics to see high-level traffic trends (page views, referrers, device type, approximate location at country/region level). No cross-site tracking, no selling data.",
            "Server logs: standard HTTP logs (IP address, user agent) for security, abuse prevention, and debugging. These are retained for a short, reasonable period.",
        ],
    },
    {
        heading: "How we use it",
        body: [
            "To publicly display your submission, generate your Certified Blazingly Fast™ badge URL, and list you in the Hall of Speed.",
            "To sort, feature, or combat spam using the GitHub snapshot (all from public data).",
            "To understand what’s working (or breaking) via aggregated analytics so we can keep things fast and friendly.",
            "If you share an email, we’ll use it for transactional messages about your submission. No marketing unless you explicitly opt in.",
        ],
    },
    {
        heading: "How we store it",
        body: [
            "Data lives on reputable cloud infrastructure with encryption in transit and at rest provided by our vendors. Access is limited to the tiny crew running Certified Blazingly Fast.",
            "Removal: want your submission deleted? Use the contact link and we’ll remove the submission and associated snapshot as quickly as humanly reasonable. Backups and logs may persist briefly until they naturally rotate out.",
        ],
    },
    {
        heading: "Sharing & third parties",
        body: [
            "We don’t sell or rent your data. Ever.",
            "Public is public: submissions and repo snapshots are shown on the site by design.",
            "Service providers we rely on: Vercel (hosting & analytics) and GitHub’s public API (to read public repo metadata). If we add new providers, we’ll update this page.",
        ],
    },
    {
        heading: "Cookies",
        body: [
            "We don’t use marketing cookies. Vercel Web Analytics is cookie-free.",
            "If this changes, we’ll update this page before anything starts crunching crumbs.",
        ],
    },
    {
        heading: "Emails & updates",
        body: [
            "We only email when it’s relevant to your submission or when you’ve opted into something new.",
            "Unsubscribe requests are honored promptly—because inbox clutter stresses us out too.",
        ],
    },
    {
        heading: "Kids’ privacy",
        body: [
            "This site is for developers and OSS communities, not children. If you’re under 13 (or the local equivalent), please don’t submit anything.",
        ],
    },
    {
        heading: "Changes",
        body: [
            `If we update this policy, we’ll change the date here. Last updated: ${lastUpdated}.`,
        ],
    },
];

export default function PrivacyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            {/* <LiveSubmissionCounter /> */}
            <main className="flex-1 bg-gradient-to-b from-white via-white to-gray-50">
                <PageSection className="flex max-w-3xl flex-col gap-12 py-16 sm:py-24">
                    <header className="space-y-4 text-center sm:text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                            Privacy matters
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                            Privacy
                        </h1>
                        <p className="text-base leading-relaxed text-gray-600">
                            We like fast sites, not fast-and-loose data. This
                            page explains what we collect, why we collect it,
                            and how we keep it reasonable while celebrating your
                            blazingly fast project.
                        </p>
                    </header>
                    <div className="space-y-10 text-left">
                        {sections.map((section) => (
                            <section
                                key={section.heading}
                                className="space-y-3"
                            >
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {section.heading}
                                </h2>
                                {section.body.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        className="text-sm leading-relaxed text-gray-600"
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </section>
                        ))}
                    </div>
                </PageSection>
            </main>
            <Footer />
            <ModalForm />
            <ContactModal />
        </div>
    );
}
