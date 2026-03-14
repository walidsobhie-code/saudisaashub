import Link from 'next/link';

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Methodology</h1>
        <p className="text-text-secondary text-lg mb-12">
          How we research, verify, and publish insights about Saudi SaaS companies.
        </p>

        <div className="prose prose-invert max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Accuracy</h2>
            <p className="text-text-secondary leading-relaxed">
              Saudi SaaS Hub is committed to providing accurate, verifiable, and actionable data. Every company profile, funding round, and compliance update undergoes a multi-step verification process before publication. We believe transparency in our methods is essential to building trust with our users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Company Data Collection</h2>
            <h3 className="text-xl font-semibold text-accent-green mb-3">Sources</h3>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li><strong>Direct submissions:</strong> Companies can submit their data via our contact form. All submissions are verified before inclusion.</li>
              <li><strong>Public databases:</strong> Crunchbase, MAGNiT, ZATCA public registers, Saudi Ministry of Commerce records</li>
              <li><strong>News aggregation:</strong> Funding rounds and partnerships from reputable tech media (TechCrunch, Wamda, etc.)</li>
              <li><strong>Manual research:</strong> Our team actively monitors LinkedIn, company websites, and press releases for updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Fields & Verification</h2>
            <p className="text-text-secondary mb-4">
              Each company profile includes the following fields, verified as indicated:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border border-white/10 rounded-lg overflow-hidden">
                <thead className="bg-card">
                  <tr>
                    <th className="px-4 py-3 text-left text-white font-semibold border-b border-white/10">Field</th>
                    <th className="px-4 py-3 text-left text-white font-semibold border-b border-white/10">Verification Method</th>
                    <th className="px-4 py-3 text-left text-white font-semibold border-b border-white/10">Confidence</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary text-sm">
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3">Company name, description, categories</td>
                    <td className="px-4 py-3">Direct submission or official website</td>
                    <td className="px-4 py-3 text-accent-green">High</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3">Founding year, headquarters</td>
                    <td className="px-4 py-3">Ministry of Commerce records, website</td>
                    <td className="px-4 py-3 text-accent-green">High</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3">Funding rounds (amount, date, investors)</td>
                    <td className="px-4 py-3">Press releases, Crunchbase, investor announcements</td>
                    <td className="px-4 py-3 text-accent-green">High (if sourced)</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="px-4 py-3">Leadership team</td>
                    <td className="px-4 py-3">LinkedIn, company website, press releases</td>
                    <td className="px-4 py-3 text-accent-cyan">Medium</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Customer testimonials</td>
                    <td className="px-4 py-3">Company-provided or public case studies</td>
                    <td className="px-4 py-3 text-accent-cyan">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Funding Data Pipeline</h2>
            <p className="text-text-secondary mb-4">
              Our funding tracker is updated through a multi-channel approach:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li><strong>Real-time alerts:</strong> We monitor Crunchbase, MAGNiT, and Dealroom for new rounds involving Saudi companies.</li>
              <li><strong>News aggregation:</strong> RSS feeds from TechCrunch, Wamda, Saudi Press Agency are parsed for funding announcements.</li>
              <li><strong>Manual validation:</strong> Each round is cross-checked against at least two independent sources before publication.</li>
              <li><strong>Company confirmation:</strong> When possible, we reach out to the company for direct confirmation.</li>
              <li><strong>Quarterly audit:</strong> At the end of each quarter, we review all funding data for completeness and accuracy.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">ZATCA Compliance Tracking</h2>
            <p className="text-text-secondary mb-4">
              Our ZATCA compliance status for each company is determined by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li><strong>Official ZATCA registers:</strong> We check the e-invoicing compliance portal for certified solutions.</li>
              <li><strong>Company declarations:</strong> Companies self-report compliance status; we verify through documentation when available.</li>
              <li><strong>Public announcements:</strong> ZATCA press releases and circulars are tracked for changes to deadlines or requirements.</li>
              <li><strong>User reports:</strong> We accept tips from the community about compliance issues; all reports are investigated.</li>
            </ul>
            <p className="text-text-secondary mt-4">
              <strong>Note:</strong> Compliance status is marked as "self-reported" unless we have direct verification from ZATCA or audited documentation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Editorial Standards</h2>
            <p className="text-text-secondary mb-4">
              All articles and guides published on Saudi SaaS Hub adhere to the following standards:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li><strong>Minimum word count:</strong> 1,500 words for articles; 2,000+ for guides; 3,000+ for reports.</li>
              <li><strong>Original analysis:</strong> No surface-level summaries. We provide unique insights, data interpretation, and actionable recommendations.</li>
              <li><strong>Citations:</strong> All claims are backed by linked sources. Data visualizations include source attribution.</li>
              <li><strong>Author credentials:</strong> Every article lists the author with relevant expertise (e.g., "Saudi SaaS Research Team", "ZATCA Compliance Specialist").</li>
              <li><strong>Bilingual requirement:</strong> All flagship content is published in both Arabic and English.</li>
              <li><strong>Multi-step review:</strong> All content undergoes thorough internal review for accuracy and quality before publication.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Updates & Corrections</h2>
            <p className="text-text-secondary mb-4">
              We strive to keep our data current and accurate:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li><strong>Daily updates:</strong> Breaking news and funding rounds are published as they happen (target &lt;24h latency).</li>
              <li><strong>Quarterly reviews:</strong> All company profiles are reviewed and updated at minimum every 3 months.</li>
              <li><strong>Correction policy:</strong> If you identify an error, email corrections@saudisaashub.com. We will investigate and correct within 48 hours, with a public correction notice if warranted.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Feedback & Contributions</h2>
            <p className="text-text-secondary mb-4">
              We welcome input from the Saudi tech community:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li><strong>Submit company data:</strong> Found a SaaS company not listed? Add it via our contact form.</li>
              <li><strong>Report errors:</strong> See outdated info? Let us know.</li>
              <li><strong>Suggest topics:</strong> Have a research idea? We'd love to hear it.</li>
              <li><strong>Join as contributor:</strong> Experts in SaaS, ZATCA, or Saudi tech are invited to write for us.</li>
            </ul>
            <p className="text-text-secondary mt-4">
              Contact: <a href="mailto:saudisaashub@outlook.com" className="text-accent-green hover:underline">saudisaashub@outlook.com</a>
            </p>
          </section>
        </div>

        {/* Back */}
        <div className="mt-12 text-center">
          <Link href="/about" className="inline-flex items-center gap-2 text-accent-green hover:underline">
            ← Back to About
          </Link>
        </div>
      </div>
    </div>
  );
}
