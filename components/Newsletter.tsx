'use client';

export function Newsletter() {
  return (
    <div className="bg-card rounded-xl border border-white/5 p-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
      <p className="text-text-secondary mb-8 max-w-xl mx-auto">
        Get weekly insights on Saudi SaaS companies, funding rounds, and compliance updates delivered to your inbox.
      </p>
      <form className="max-w-md mx-auto flex gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg bg-background border border-white/10 text-white focus:border-accent-green focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-accent-green text-background font-semibold rounded-lg hover:bg-accent-green/90 transition-all"
        >
          Subscribe
        </button>
      </form>
      <p className="text-text-muted text-xs mt-4">
        No spam, unsubscribe anytime. By subscribing, you agree to our Terms.
      </p>
    </div>
  );
}
