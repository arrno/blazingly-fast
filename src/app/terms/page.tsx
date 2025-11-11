import type { Metadata } from "next";
import { ContactModal } from "../components/ContactModal";
import { Footer } from "../components/Footer";
// import { LiveSubmissionCounter } from "../components/LiveSubmissionCounter";
import { ModalForm } from "../components/ModalForm";
import { Navbar } from "../components/Navbar";
import { PageSection } from "../components/PageSection";

const description =
    "The friendly (and mostly common-sense) terms behind the Certified Blazingly Fast experiment.";

export const metadata: Metadata = {
    title: "Terms of Service",
    description,
    alternates: { canonical: "/terms" },
    openGraph: {
        title: "Terms of Service",
        description,
        url: "https://blazingly.fast/terms",
    },
    twitter: { title: "Terms of Service", description },
};

const lastUpdated = "November 9, 2025";

const sections = [
    {
        heading: "The gist",
        body: [
            "Certified Blazingly Fast is a community experiment celebrating speed claims across open source. By using the site, you agree that this is all in good fun: a badge of vibes, not a benchmark of truth.",
            "Nothing here is a performance guarantee, endorsement, or legally binding statement—just mutual encouragement and a little friendly chaos.",
        ],
    },
    {
        heading: "Eligibility & submissions",
        body: [
            "When you submit a project, you confirm that you either own it or are nominating it in good faith because you think it deserves to shine.",
            "You’re welcome to nominate projects you don’t own, but if the project owner asks us to update or remove it, we’ll defer to them.",
            "Submissions should stay positive, creative, and respectful. Content that’s offensive, derogatory, profane, discriminatory, or grossly off-topic may be hidden or removed at our discretion.",
            "Spammy or automated submissions will be purged faster than a cold-start cache.",
        ],
    },
    {
        heading: "Badges & claims",
        body: [
            "The badge is symbolic—it means you said it’s fast. We take your word for it.",
            "You’re free to display your Certified Blazingly Fast™ badge anywhere your project lives. Please link it back here so others can appreciate the glorious context.",
            "Don’t modify the badge in misleading ways or use it to promote unrelated products, services, or investments. This is for open-source celebration, not marketing campaigns.",
        ],
    },
    {
        heading: "Ownership & contact",
        body: [
            "If a repo you own has been nominated and you’d like to claim ownership, change the speed statement, or remove it entirely, reach out through the contact form and we’ll sort it out quickly.",
            "By submitting, you grant us permission to display the project name, repository metadata, and badge publicly on the site.",
        ],
    },
    {
        heading: "Community conduct",
        body: [
            "Operate in good faith. Don’t abuse submissions, scripts, or automation to flood the Hall of Speed.",
            "Encouragement and humor are strongly recommended. Sarcasm, roasting, and memes are welcome—as long as they punch up, not down.",
            "We reserve the right to moderate, hide, or remove any content or behavior that disrupts the spirit of the community.",
        ],
    },
    {
        heading: "Liability",
        body: [
            "We do our best to keep things online, safe, and fun. That said, we make no warranties about uptime, accuracy, or the speed of anything—including ourselves.",
            "Use the site at your own risk and with a sense of humor. We are not responsible for losses of reputation, cache, or karma.",
        ],
    },
    {
        heading: "Changes",
        body: [
            `We may update these terms as the project evolves. If we do, we’ll update the date here. Continued use after changes means you’re good with the new version. Last updated: ${lastUpdated}.`,
        ],
    },
];

export default function TermsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white text-gray-900">
            <Navbar />
            {/* <LiveSubmissionCounter /> */}
            <main className="flex-1 bg-gradient-to-b from-white via-white to-gray-50">
                <PageSection className="flex max-w-3xl flex-col gap-12 py-16 sm:py-24">
                    <header className="space-y-4 text-center sm:text-left">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                            Legal-ish
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl">
                            Terms of Service
                        </h1>
                        <p className="text-base leading-relaxed text-gray-600">
                            We take fun seriously. These terms set out the
                            common-sense guidelines for submitting, celebrating,
                            and keeping the Hall of Speed full of good energy,
                            not bad vibes.
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
