import { getAllNews, newsItems } from './news';

export interface DigestIssue {
  id: string;
  publish_date: string;
  week_of: string; // ISO date (Monday)
  top_funding_rounds: Array<{
    title: string;
    link: string;
    amount: string;
  }>;
  regulation_updates: Array<{
    title: string;
    link: string;
  }>;
  upcoming_events: Array<{
    name: string;
    date: string;
    link: string;
  }>;
  summary: string;
}

// Generate digest for a given week
export function generateDigest(weekOf: Date): DigestIssue {
  const weekStart = new Date(weekOf);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Monday

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  // Get news from this week
  const weekNews = newsItems.filter(item => {
    const date = new Date(item.publish_date);
    return date >= weekStart && date <= weekEnd;
  });

  // Extract funding rounds
  const fundingRounds = weekNews
    .filter(item => item.category === 'funding')
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      link: `/news/${item.slug}`,
      amount: extractAmount(item.content) || 'Undisclosed',
    }));

  // Extract regulation updates
  const regulations = weekNews
    .filter(item => item.category === 'regulation')
    .slice(0, 3)
    .map(item => ({
      title: item.title,
      link: `/news/${item.slug}`,
    }));

  // Get upcoming events (next 30 days)
  const upcomingEvents: Array<{name: string; date: string; link: string}> = []; // Would integrate with events lib

  return {
    id: `digest-${weekStart.toISOString().split('T')[0]}`,
    publish_date: new Date(weekEnd).toISOString(),
    week_of: weekStart.toISOString().split('T')[0],
    top_funding_rounds: fundingRounds,
    regulation_updates: regulations,
    upcoming_events: upcomingEvents,
    summary: `This week in Saudi SaaS: ${weekNews.length} updates including major funding rounds and regulatory changes.`,
  };
}

// Helper to extract funding amount from content (simple regex)
function extractAmount(content: string): string | null {
  const match = content.match(/\$(\d+(?:\.\d+)?[MBK]?)/i);
  return match ? match[0] : null;
}

// Generate plain text email template
export function generatePlainTextDigest(digest: DigestIssue): string {
  let text = `📰 Saudi SaaS Hub - Weekly Digest\n`;
  text += `Week of ${digest.week_of}\n\n`;

  if (digest.top_funding_rounds.length > 0) {
    text += `💰 TOP FUNDING ROUNDS\n`;
    digest.top_funding_rounds.forEach(round => {
      text += `• ${round.title} - ${round.amount}\n  ${round.link}\n\n`;
    });
  }

  if (digest.regulation_updates.length > 0) {
    text += `⚖️ REGULATION UPDATES\n`;
    digest.regulation_updates.forEach(update => {
      text += `• ${update.title}\n  ${update.link}\n\n`;
    });
  }

  text += `📊 Full news feed: https://saudisaashub.pages.dev/news\n`;
  text += `🔔 Subscribe: https://saudisaashub.pages.dev/contact?type=newsletter\n`;

  return text;
}

// Generate HTML email template
export function generateHTMLDigest(digest: DigestIssue): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Saudi SaaS Hub - Weekly Digest</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0A0A0A; color: #ffffff; }
    .header { background: linear-gradient(135deg, #004ada, #e369ef); padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    h1 { margin: 0; font-size: 24px; }
    .section { margin-bottom: 30px; }
    h2 { color: #10B981; border-bottom: 1px solid #333; padding-bottom: 10px; }
    a { color: #10B981; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .news-item { margin-bottom: 15px; padding-left: 20px; border-left: 3px solid #10B981; }
    .footer { text-align: center; color: #888; font-size: 12px; margin-top: 40px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📰 Saudi SaaS Hub</h1>
    <p>Weekly Digest • Week of ${digest.week_of}</p>
  </div>

  ${digest.top_funding_rounds.length > 0 ? `
  <div class="section">
    <h2>💰 Top Funding Rounds</h2>
    ${digest.top_funding_rounds.map(round => `
      <div class="news-item">
        <strong>${round.title}</strong> - ${round.amount}<br>
        <a href="https://saudisaashub.pages.dev${round.link}">Read more</a>
      </div>
    `).join('')}
  </div>
  ` : ''}

  ${digest.regulation_updates.length > 0 ? `
  <div class="section">
    <h2>⚖️ Regulation Updates</h2>
    ${digest.regulation_updates.map(update => `
      <div class="news-item">
        <strong>${update.title}</strong><br>
        <a href="https://saudisaashub.pages.dev${update.link}">Read more</a>
      </div>
    `).join('')}
  </div>
  ` : ''}

  <div class="section">
    <p>📊 <a href="https://saudisaashub.pages.dev/news">View full news feed</a></p>
    <p>🔔 <a href="https://saudisaashub.pages.dev/contact?type=newsletter">Subscribe to newsletter</a></p>
  </div>

  <div class="footer">
    <p>Saudi SaaS Hub • https://saudisaashub.pages.dev</p>
    <p>You're receiving this because you subscribed to our digest.</p>
  </div>
</body>
</html>`;
}

// Get all digest issues (static for now, would pull from generated files)
export function getAllDigests(): DigestIssue[] {
  // In future: read from generated digest files in /public/digests/
  return [generateDigest(new Date())]; // Current week only for now
}
