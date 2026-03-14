import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">About Saudi SaaS Hub</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-text-secondary text-lg mb-6">
            Saudi SaaS Hub is the premier directory and research platform for Software-as-a-Service companies in Saudi Arabia. 
            We provide data, analysis, and tools that help businesses find the right SaaS solutions and make informed decisions.
          </p>

          <p className="text-text-secondary mb-6">
            Founded in 2026, we have quickly become the go-to resource for startups, enterprises, and investors looking to navigate the rapidly evolving Saudi SaaS ecosystem. Our platform combines comprehensive company data, original research, and practical guides—all delivered with the highest standards of accuracy and transparency.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h2>
          <p className="text-text-secondary mb-6">
            To accelerate the adoption of SaaS in Saudi Arabia by providing transparent, data-driven insights and connecting companies with the solutions they need to grow.
          </p>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What We Do</h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
            <li>Curate a directory of 250+ Saudi SaaS companies with verified data</li>
            <li>Publish original research and market reports (State of Saudi SaaS quarterly)</li>
            <li>Provide comparison tools to help businesses choose the right SaaS</li>
            <li>Track funding rounds and ZATCA compliance developments</li>
            <li>Publish breaking news and weekly digests</li>
            <li>Offer practical guides (ZATCA compliance, funding, pricing, more)</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Methodology</h2>
          <p className="text-text-secondary mb-6">
            We are committed to transparency and rigor. Every company profile, funding round, and compliance update undergoes multi-step verification. We publish our sources, update频率, and quality standards openly.
          </p>
          <div className="mb-6">
            <Link 
              href="/methodology" 
              className="inline-flex items-center gap-2 text-accent-green hover:underline font-medium"
            >
              Read Our Methodology →
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Contact Us</h2>
          <p className="text-text-secondary mb-6">
            Have questions, feedback, or want to contribute? Reach out:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
            <li><strong>Email:</strong> <a href="mailto:hello@saudisaashub.com" className="text-accent-green hover:underline">hello@saudisaashub.com</a></li>
            <li><strong>Address:</strong> Riyadh, Saudi Arabia</li>
            <li><strong>Response time:</strong> We aim to respond within 24 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
