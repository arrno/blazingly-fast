import { PageSection } from "./PageSection";

const faqItems = [
  {
    question: "Do you verify the speed?",
    answer: "No. We believe in trust and optimism.",
  },
  {
    question: "What if my project isn’t fast?",
    answer: "Then make it blazingly fast and re-apply.",
  },
  {
    question: "Is there a badge for that?",
    answer: "Coming soon: actually.blazingly.fast.",
  },
];

export function CertificationSection() {
  return (
    <div className="bg-white">
      <PageSection
        id="faq"
        className="grid gap-12 border-t border-gray-100 py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
      >
        <div className="space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-600">
              FAQ
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
              Trust the badge. Trust yourself.
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-gray-600">
              Certified Blazingly Fast™ is a self-reported performance standard.
              We measure confidence, not microbenchmarks.
            </p>
          </div>

          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="space-y-2">
                <dt className="text-sm font-semibold text-gray-900">
                  {item.question}
                </dt>
                <dd className="text-sm leading-relaxed text-gray-600">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          id="submit"
          className="relative rounded-[36px] border border-gray-200 bg-white/80 p-8 shadow-2xl shadow-gray-900/10 backdrop-blur"
        >
          <div className="absolute -top-10 -left-6 hidden h-32 w-32 rounded-full bg-gradient-to-tr from-gray-200 via-transparent to-transparent blur-3xl lg:block" />
          <div className="absolute -bottom-10 -right-6 hidden h-28 w-28 rounded-full bg-gradient-to-tr from-blue-200 via-transparent to-transparent blur-3xl lg:block" />
          <div className="relative space-y-6">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-500">
              <span>Certification form</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-600">
                Live preview
              </span>
            </div>

            <div className="space-y-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Repo URL
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-gray-600">
                  <span className="text-xs text-gray-400">https://github.com/</span>
                  <span className="text-gray-900">you/yourproject</span>
                </div>
              </label>

              <fieldset className="rounded-xl border border-gray-200 bg-white p-4">
                <legend className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Is your project blazingly fast?
                </legend>
                <div className="mt-3 space-y-3 text-sm text-gray-700">
                  <label className="flex items-center gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-md border border-gray-300 bg-white text-xs text-gray-300">
                      ✖
                    </span>
                    No
                  </label>
                  <label className="flex items-center gap-3">
                    <span className="grid h-5 w-5 place-items-center rounded-md border border-gray-900 bg-gray-900 text-xs font-semibold text-white">
                      ✓
                    </span>
                    Yes
                  </label>
                </div>
              </fieldset>

              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Copy & paste badge
                </p>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-gray-900 p-4 text-[13px] leading-relaxed text-gray-100">
{`![blazingly fast](https://blazingly.fast/badge.svg?repo=you/yourproject)`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
