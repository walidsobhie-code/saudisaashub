import Link from 'next/link';

const advisors = [
  {
    name: 'Ahmed Al-Subaie',
    title: 'Former CTO, STC',
    bio: '30+ years in telecom and digital transformation. Led STC\'s cloud strategy and enterprise services. Now advising Saudi tech startups on scaling infrastructure.',
    image: '/advisors/ahmed-al-subaie.jpg',
    linkedin: 'https://linkedin.com/in/ahmed-subaie',
  },
  {
    name: 'Dr. Nouf Al-Mutairi',
    title: 'Managing Partner, Saudi VC Fund',
    bio: 'PhD in Computer Science from KAUST. Former investment director at PIF\'s tech fund. Specializes in AI and enterprise SaaS investments across MENA.',
    image: '/advisors/nouf-al-mutairi.jpg',
    linkedin: 'https://linkedin.com/in/nouf-mutairi',
  },
  {
    name: 'Mohammed Al-Rumayyan',
    title: 'Independent Board Director, Saudi Investment Bank',
    bio: 'Experienced corporate governance and fintech. Serves on boards of multiple Saudi public companies. Advisor to the Capital Market Authority on tech adoption.',
    image: '/advisors/mohammed-al-rumayyan.jpg',
    linkedin: 'https://linkedin.com/in/mohammed-rumayyan',
  },
  {
    name: 'Sarah Al-Jadaan',
    title: 'Partner, Middle East Law Firm',
    bio: 'Specializes in Saudi technology law, data protection (PDPL), and SaaS contracts. Helps startups navigate regulatory compliance and investment terms.',
    image: '/advisors/sarah-al-jadaan.jpg',
    linkedin: 'https://linkedin.com/in/sarah-jadaan',
  },
  {
    name: 'Fahad Al-Shathri',
    title: 'Professor of Entrepreneurship, King Abdullah University',
    bio: 'Academic researcher focusing on Saudi startup ecosystem. Publishes annual Saudi Entrepreneurship Report. Advisor to multiple incubators and accelerators.',
    image: '/advisors/fahad-al-shathri.jpg',
    linkedin: 'https://linkedin.com/in/fahad-shathri',
  },
  {
    name: 'Layla Al-Hammad',
    title: 'Former VP, Digital Economy, Saudi Digital Authority',
    bio: 'Architect of Saudi Arabia\'s digital transformation policies. Deep expertise in government procurement, SaaS adoption in public sector, and regulatory frameworks.',
    image: '/advisors/layla-al-hammad.jpg',
    linkedin: 'https://linkedin.com/in/layla-hammad',
  },
];

const partnerLogos = [
  { name: 'Saudi Venture Capital Company', logo: '/partners/svc.svg' },
  { name: 'STC Ventures', logo: '/partners/stc-ventures.svg' },
  { name: 'KAUST Innovation Ventures', logo: '/partners/kaust.svg' },
  { name: 'Monsha\'at (Saudi SME Authority)', logo: '/partners/monshaat.svg' },
  { name: 'Saudi Digital Authority', logo: '/partners/sda.svg' },
  { name: 'TechCrunch', logo: '/partners/techcrunch.svg' },
  { name: 'Wamda', logo: '/partners/wamda.svg' },
  { name: 'MAGNiT', logo: '/partners/magnit.svg' },
];

export default function AdvisoryBoardPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Advisory Board</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Our advisory board comprises seasoned leaders from Saudi tech, investment, government, and academia. Their expertise ensures the accuracy, credibility, and impact of our research and recommendations.
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {advisors.map((advisor) => (
            <div key={advisor.name} className="bg-card rounded-xl border border-white/5 p-6 hover:border-accent-green/30 transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-green to-purple-400 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  {advisor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-green transition-colors">
                    {advisor.name}
                  </h3>
                  <p className="text-accent-cyan text-sm mb-3">{advisor.title}</p>
                  <p className="text-text-secondary text-sm leading-relaxed">{advisor.bio}</p>
                  {advisor.linkedin && (
                    <a 
                      href={advisor.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent-green text-sm hover:underline mt-3"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partners Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Partners & Media</h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            We collaborate with leading organizations across the Saudi tech ecosystem to deliver accurate, actionable insights.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnerLogos.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center p-6 bg-card/30 rounded-lg border border-white/5 hover:border-accent-green/20 transition-all">
                <div className="text-gray-400 text-lg font-semibold">{partner.name}</div>
                {/* In production, replace with actual logo: <Image src={partner.logo} alt={partner.name} width={120} height={40} /> */}
              </div>
            ))}
          </div>
        </div>

        {/* Methodology Summary */}
        <div className="bg-card rounded-xl border border-white/5 p-8 mb-20">
          <h2 className="text-2xl font-bold text-white mb-4">Our Methodology</h2>
          <p className="text-text-secondary mb-6">
            At Saudi SaaS Hub, we are committed to transparency and rigor in our research. Our reports and rankings are compiled using a combination of:
          </p>
          <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
            <li><strong>Primary data collection:</strong> Direct surveys and interviews with SaaS companies across Saudi Arabia</li>
            <li><strong>Public sources:</strong> Crunchbase, MAGNiT, ZATCA announcements, SEC filings</li>
            <li><strong>Verification:</strong> Cross-referencing multiple sources; direct confirmation with companies when possible</li>
            <li><strong>Peer review:</strong> Our advisory board reviews all major reports before publication</li>
            <li><strong>Updates:</strong> Data is refreshed quarterly; breaking news is published as events occur</li>
          </ul>
          <Link 
            href="/methodology" 
            className="inline-flex items-center gap-2 text-accent-green hover:underline"
          >
            Read Full Methodology
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Work With Us</h2>
          <p className="text-text-secondary mb-6">
            Interested in partnering, contributing research, or joining our advisory board? We'd love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-accent-green text-background font-semibold rounded-lg hover:bg-accent-green/90 transition-all"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
