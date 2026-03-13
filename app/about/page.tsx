export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">About Saudi SaaS Hub</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-text-secondary text-lg mb-6">
            Saudi SaaS Hub is the premier directory and research platform for Software-as-a-Service companies in Saudi Arabia. 
            We provide data, analysis, and tools to help businesses find the right SaaS solutions.
          </p>
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h2>
          <p className="text-text-secondary mb-6">
            To accelerate the adoption of SaaS in Saudi Arabia by providing transparent, data-driven insights and connecting companies with the solutions they need to grow.
          </p>
          <h2 className="text-2xl font-bold text-white mt-12 mb-4">What We Do</h2>
          <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
            <li>Curate a directory of 250+ Saudi SaaS companies</li>
            <li>Publish original research and market reports</li>
            <li>Provide comparison tools to help businesses choose</li>
            <li>Track funding and compliance developments</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
