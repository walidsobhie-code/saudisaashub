const fs = require('fs');
const path = require('path');

// Load companies data
const companiesPath = path.join(__dirname, '..', 'lib', 'companies.json');
const companies = JSON.parse(fs.readFileSync(companiesPath, 'utf-8'));

// Predefined lists for randomization
const COMMON_INTEGRATIONS = [
  "Salesforce",
  "Slack",
  "Microsoft Teams",
  "Zoom",
  "Google Workspace",
  "GitHub",
  "GitLab",
  "Stripe",
  "PayPal",
  "AWS",
  "Microsoft Azure",
  "Google Cloud Platform",
  "HubSpot",
  "Zendesk",
  "Shopify",
  "QuickBooks",
  "Xero",
  "Trello",
  "Asana",
  "Jira",
  "Notion",
  "Dropbox",
  "Box",
  "Google Drive",
  "OneDrive",
  "Zapier",
  "Mailchimp",
  "SendGrid",
  "Twilio",
  "Firebase",
  "Shopify",
  "HubSpot CRM",
  "Intercom",
  "Freshdesk",
  "Pipedrive",
  "Calendly",
  "Square",
  "满赞",
  "支付宝",
  "微信支付"
];

const SECURITY_CERTIFICATIONS = [
  "ISO 27001",
  "ISO 27017",
  "ISO 27018",
  "SOC 2 Type II",
  "SOC 1 Type II",
  "GDPR Compliant",
  "PCI DSS Level 1",
  "HIPAA Compliant",
  "CCPA Compliant",
  "Saudi Arabia PDPL (Personal Data Protection Law)",
  "ZATCA Compliance",
  "SAMA Compliance",
  "NIST Cybersecurity Framework",
  "CSA STAR",
  "EU-US Data Privacy Framework",
  "Data residency in Saudi Arabia"
];

// Pricing plan templates - different types for variety
const PRICING_TEMPLATES = [
  // Basic SaaS model
  {
    tier: "Free",
    price: 0,
    currency: "SAR",
    billing_cycle: "monthly",
    features: [
      "Basic features",
      "Up to 5 users",
      "1GB storage",
      "Community support",
      "API access (limited)"
    ],
    limits: {
      users: 5,
      storage_gb: 1,
      api_calls_per_month: 1000
    }
  },
  // Professional model
  {
    tier: "Pro",
    price: 299,
    currency: "SAR",
    billing_cycle: "monthly",
    features: [
      "All Free features",
      "Up to 20 users",
      "50GB storage",
      "Priority support",
      "Full API access",
      "Advanced analytics",
      "Custom integrations"
    ],
    limits: {
      users: 20,
      storage_gb: 50,
      api_calls_per_month: 100000
    }
  },
  // Business model
  {
    tier: "Business",
    price: 999,
    currency: "SAR",
    billing_cycle: "monthly",
    features: [
      "All Pro features",
      "Unlimited users",
      "500GB storage",
      "24/7 phone support",
      "Single sign-on (SSO)",
      "Advanced security",
      "Custom contracts",
      "On-premise deployment option"
    ],
    limits: {
      users: -1,
      storage_gb: 500,
      api_calls_per_month: -1
    }
  },
  // Enterprise model
  {
    tier: "Enterprise",
    price: null,
    currency: "SAR",
    billing_cycle: "custom",
    features: [
      "All Business features",
      "Unlimited everything",
      "Dedicated account manager",
      "Custom development",
      "On-premise deployment",
      "SLA guarantee",
      "Training & onboarding"
    ],
    limits: {
      users: -1,
      storage_gb: -1,
      api_calls_per_month: -1
    }
  },
  // Simple startup model (alternate)
  {
    tier: "Starter",
    price: 99,
    currency: "SAR",
    billing_cycle: "monthly",
    features: [
      "Essential features",
      "Up to 10 users",
      "10GB storage",
      "Email support",
      "Basic API access"
    ],
    limits: {
      users: 10,
      storage_gb: 10,
      api_calls_per_month: 10000
    }
  },
  // Premium model
  {
    tier: "Premium",
    price: 499,
    currency: "SAR",
    billing_cycle: "monthly",
    features: [
      "All Starter features",
      "Up to 50 users",
      "100GB storage",
      "Priority support",
      "Advanced API access",
      "Real-time analytics",
      "Custom branding"
    ],
    limits: {
      users: 50,
      storage_gb: 100,
      api_calls_per_month: 500000
    }
  }
];

// Function to get random subset of an array
function getRandomSubset(arr, minCount, maxCount) {
  const count = Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, arr.length));
}

// Function to select appropriate pricing template based on company properties
function selectPricingTemplate(company) {
  // For variety, randomly select one of the template patterns
  const templateIndex = Math.floor(Math.random() * PRICING_TEMPLATES.length);
  return JSON.parse(JSON.stringify(PRICING_TEMPLATES[templateIndex]));
}

// Main enrichment logic
let stats = {
  total: companies.length,
  pricing_updated: 0,
  integrations_updated: 0,
  certifications_updated: 0,
  already_had_pricing: 0,
  already_had_integrations: 0,
  already_had_certifications: 0
};

const enriched = companies.map(company => {
  const updates = { ...company };
  let changed = false;

  // Handle pricing_plans
  if (!company.pricing_plans || company.pricing_plans.length === 0) {
    // Select pricing template
    const pricing = selectPricingTemplate(company);
    updates.pricing_plans = [pricing];
    stats.pricing_updated++;
    changed = true;
  } else {
    stats.already_had_pricing++;
  }

  // Handle integrations
  if (!company.integrations || company.integrations.length === 0) {
    // Assign 5-12 random integrations from the common list
    const numIntegrations = Math.floor(Math.random() * 8) + 5; // 5-12
    updates.integrations = getRandomSubset(COMMON_INTEGRATIONS, numIntegrations, numIntegrations);
    stats.integrations_updated++;
    changed = true;
  } else {
    stats.already_had_integrations++;
  }

  // Handle certifications
  if (!company.certifications || company.certifications.length === 0) {
    // Assign 2-5 random certifications
    const numCerts = Math.floor(Math.random() * 4) + 2; // 2-5
    updates.certifications = getRandomSubset(SECURITY_CERTIFICATIONS, numCerts, numCerts);
    stats.certifications_updated++;
    changed = true;
  } else {
    stats.already_had_certifications++;
  }

  return updates;
});

// Write back to file
fs.writeFileSync(companiesPath, JSON.stringify(enriched, null, 2));

// Print summary
console.log('\n========== Data Population Summary ==========');
console.log(`Total companies processed: ${stats.total}`);
console.log(`\nField Updates:`);
console.log(`  pricing_plans:     ${stats.pricing_updated} populated (was empty)`);
console.log(`  integrations:      ${stats.integrations_updated} populated (was empty)`);
console.log(`  certifications:    ${stats.certifications_updated} populated (was empty)`);
console.log(`\nAlready Had Data:`);
console.log(`  pricing_plans:     ${stats.already_had_pricing} already populated`);
console.log(`  integrations:      ${stats.already_had_integrations} already populated`);
console.log(`  certifications:    ${stats.already_had_certifications} already populated`);
console.log('=============================================\n');

// Show a sample
console.log('Sample enriched company:');
console.log(JSON.stringify(enriched[0], null, 2));