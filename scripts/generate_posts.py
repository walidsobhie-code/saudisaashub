#!/usr/bin/env python3
"""
Simple Social Media Post Generator for SaudiSaaSHub
Run locally or in GitHub Actions
"""

# Sample article data (will be loaded from articles-data.ts in production)
SAMPLE_ARTICLES = [
    {
        "title": "سوق البرمجيات السحابية في المملكة — وين وصل وإلى وين رايح؟",
        "slug": "saas-market-saudi-arabia-2026",
        "excerpt": "يُتوقع أن يصل حجم سوق SaaS في المملكة إلى 6.49 مليار دولار بحلول عام 2030، بمعدل نمو سنوي مركّب يبلغ 14.63%.",
        "categories": ["SaaS", "تقارير السوق"],
        "readingTime": 5
    },
    {
        "title": "سلامه vs زد vs شوبيفاي — أي منصة تجارة إلكترونية تناسب مشروعك؟",
        "slug": "salla-vs-zid-vs-shopify-2026",
        "excerpt": "مقارنة شاملة بين أفضل 3 منصات تجارة إلكترونية للسوق السعودي. تسعير، مميزات، وداعلات.",
        "categories": ["مقارنة", "تجارة إلكترونية"],
        "readingTime": 6
    },
    {
        "title": "دليل الامتثال لنظام حماية البيانات الشخصية (PDPL) للشركات",
        "slug": "pdpl-compliance-guide-2026",
        "excerpt": "كل ما تحتاج معرفته للامتثال لنظام حماية البيانات الشخصية في المملكة العربية السعودية.",
        "categories": ["دليل عملي", "امتثال"],
        "readingTime": 7
    }
]

SITE_URL = "https://saudisaashub.pages.dev"

# Saudi accent hooks
SAUDI_HOOKS = [
    "وش رايك؟ 🤔",
    "هل سمعت عن هذا؟ 🤨",
    "والله تستاهل تعرف! 🙌",
    "اقرى وأخبرني! 😱",
    "وش المثير في هذا؟ 🔥",
    "هل تعرف شنو يعني هذا؟ 🧐",
    "والله موضوع مهم! 💡",
    "شفت مثل هذا من قبل؟ 👀",
]

CATEGORY_HASHTAGS = {
    "SaaS": ["#SaaS", "#البرمجيات_السحابية", "#التحول_الرقمي"],
    "FinTech": ["#FinTech", "#التقنية_المالية", "#زاتكا"],
    "Cyber Security": ["#الأمن_السيبراني", "#CyberSecurity"],
    "Healthcare": ["#الصحة_الرقمية", "#Healthcare"],
    "E-Commerce": ["#تجارة_إلكترونية", "#سلامه", "#زد"],
    "EdTech": ["#التعليم_التقني", "#EdTech"],
    "IoT": ["#إنترنت_الأشياء", "#IoT"],
    "Logistics": ["#اللوجستيات", "#Logistics"],
    "مقارنة": ["#مقارنة", "#دليل"],
    "دليل عملي": ["#دليل", "#شرح"],
    "امتثال": ["#PDPL", "#امتثال"],
}

def get_hashtags(categories):
    tags = set()
    tags.update(["#SaudiSaaS", "#السعودية", "#التقنية", "#Startups"])
    for cat in categories:
        if cat in CATEGORY_HASHTAGS:
            tags.update(CATEGORY_HASHTAGS[cat])
    return " ".join(list(tags)[:12])

def get_hook(title):
    import random
    random.seed(hash(title))
    return "🎯 " + random.choice(SAUDI_HOOKS)

def generate_linkedin(article):
    hook = get_hook(article["title"])
    url = f"{SITE_URL}/articles/{article['slug']}"
    hashtags = get_hashtags(article["categories"])
    
    return f"""{hook}

{article['title']}

📝 {article['excerpt']}

👇 اقرأ المزيد:
{url}

{hashtags}

#SaudiSaaS #السعودية #ريادة_الأعمال #Tech"""

def generate_twitter(article):
    hook = get_hook(article["title"])
    url = f"{SITE_URL}/articles/{article['slug']}"
    hashtags = " ".join(get_hashtags(article["categories"]).split()[:5])
    
    return f"""{hook}

{article['title'][:80]}...

🔗 {url}

{hashtags}"""

def generate_instagram(article):
    hook = "✨ " + get_hook(article["title"]).replace("🎯 ", "")
    url = f"{SITE_URL}/articles/{article['slug']}"
    hashtags = get_hashtags(article["categories"])
    
    return f"""{hook}

{article['title']}

📖 {article['excerpt']}

👆 رابط الحلقة في البايو!

{hashtags}

#saudisaas #السعودية #technology #entrepreneur"""

def main():
    print("=" * 60)
    print("🚀 SaudiSaaSHub - Social Media Post Generator")
    print("=" * 60)
    
    for i, article in enumerate(SAMPLE_ARTICLES, 1):
        print(f"\n{'='*60}")
        print(f"📰 Article {i}: {article['title'][:50]}...")
        print(f"{'='*60}")
        
        print(f"\n📱 LINKEDIN POST:")
        print("-" * 40)
        print(generate_linkedin(article))
        
        print(f"\n🐦 TWITTER POST:")
        print("-" * 40)
        print(generate_twitter(article))
        
        print(f"\n📸 INSTAGRAM POST:")
        print("-" * 40)
        print(generate_instagram(article))
        
        print(f"\n🔗 SHORT URL: {SITE_URL}/articles/{article['slug']}")
        
    print(f"\n{'='*60}")
    print("✨ Done! Copy posts to respective platforms.")
    print("=" * 60)

if __name__ == "__main__":
    main()
