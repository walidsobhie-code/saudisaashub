#!/usr/bin/env python3
"""
SaudiSaaSHub Social Media Automation
Generates and publishes social media posts for new articles
"""

import os
import json
import re
from datetime import datetime
from typing import List, Dict
import hashlib

# Configuration
SITE_URL = "https://saudisaashub.pages.dev"
TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID", "")

# Saudi accent question hooks
SAUDI_HOOKS = [
    "وش رايك؟ 🤔",
    "هل سمعت عن هذا؟ 🤨",
    "والله تستاهل تعرف! 🙌",
    "морф 😱 اقرأ وأخبرني",
    "وش المثير في هذا؟ 🔥",
    "هل تعرف شنو يعني هذا؟ 🧐",
    "والله موضوع مهم! 💡",
    "شفت مثل هذا من قبل؟ 👀",
]

# Category translations and hashtags
CATEGORY_DATA = {
    "SaaS": {"hashtags": ["#SaaS", "#البرمجيات_السحابية", "#التحول_الرقمي"], "ar": "البرمجيات كخدمة"},
    "FinTech": {"hashtags": ["#FinTech", "#التقنية_المالية", "#زاتكا"], "ar": "التقنية المالية"},
    "Cyber Security": {"hashtags": ["#الأمن_السيبراني", "#CyberSecurity", "#PDPL"], "ar": "الأمن السيبراني"},
    "Healthcare": {"hashtags": ["#الصحة_الرقمية", "#Healthcare", "#رؤية2030"], "ar": "الرعاية الصحية"},
    "E-Commerce": {"hashtags": ["#تجارة_إلكترونية", "#ECommerce", "#سلامه", "#زد"], "ar": "التجارة الإلكترونية"},
    "EdTech": {"hashtags": ["#التعليم_التقني", "#EdTech", "#تعلم"], "ar": "التعليم التقني"},
    "IoT": {"hashtags": ["#إنترنت_الأشياء", "#IoT", "#smart"], "ar": "إنترنت الأشياء"},
    "Logistics": {"hashtags": ["#اللوجستيات", "#Logistics", "#سلاسل_الإمداد"], "ar": "اللوجستيات"},
    "تقارير السوق": {"hashtags": ["#تقارير", "#السوق_السعودي", "#رؤية2030"], "ar": "تقارير السوق"},
    "أخبار السوق": {"hashtags": ["#أخبار", "#السعودية", "#التقنية"], "ar": "أخبار السوق"},
}

def extract_article_info(article_data: Dict) -> Dict:
    """Extract and enrich article data"""
    title = article_data.get("title", "")
    excerpt = article_data.get("excerpt", "")
    slug = article_data.get("slug", "")
    categories = article_data.get("categories", [])
    
    # Generate article URL
    article_url = f"{SITE_URL}/articles/{slug}"
    
    # Get hashtags from categories
    hashtags = []
    for cat in categories:
        if cat in CATEGORY_DATA:
            hashtags.extend(CATEGORY_DATA[cat]["hashtags"])
    
    # Add default hashtags
    hashtags.extend(["#SaudiSaaS", "#السعودية", "#التقنية", "#Startups"])
    hashtags = list(set(hashtags))[:15]  # Limit to 15
    
    return {
        "title": title,
        "excerpt": excerpt,
        "url": article_url,
        "categories": categories,
        "hashtags": " ".join(hashtags),
    }

def generate_linkedin_post(article: Dict) -> str:
    """Generate LinkedIn post"""
    hook = "🎯 " + SAUDI_HOOKS[hash(article["title"]) % len(SAUDI_HOOKS)]
    
    post = f"""{hook}

{article['title']}

📝 {article['excerpt']}

👇 اقرأ المزيد:
{article['url']}

{article['hashtags']}

#SaudiSaaS #السعودية #ريادة_الأعمال"""

    return post

def generate_twitter_post(article: Dict) -> str:
    """Generate Twitter post (280 chars limit)"""
    hook = SAUDI_HOOKS[hash(article["title"]) % len(SAUDI_HOOKS)]
    
    # Truncate for Twitter
    title = article["title"][:100]
    hashtags = " ".join(article["hashtags"].split()[:5])
    
    post = f"""{hook}

{title}

🔗 {article['url']}

{hashtags}"""

    return post

def generate_instagram_post(article: Dict) -> str:
    """Generate Instagram post"""
    hook = "✨ " + SAUDI_HOOKS[hash(article["title"]) % len(SAUDI_HOOKS)]
    
    post = f"""{hook}

{article['title']}

📖 {article['excerpt']}

👆 رابط الحلقة في البايو!

{article['hashtags']}

#saudisaas #السعودية_السعودة #technology #entrepreneur"""

    return post

def generate_telegram_message(article: Dict) -> str:
    """Generate Telegram message with buttons"""
    linkedin = generate_linkedin_post(article)
    twitter = generate_twitter_post(article)
    instagram = generate_instagram_post(article)
    
    message = f"""📰 **{article['title']}**

{article['excerpt']}

🔗 {article['url']}

---

📱 *LinkedIn:*
{linkedin}

---

🐦 *Twitter:*
{twitter}

---

📸 *Instagram:*
{instagram}

---

{article['hashtags']}"""

    return message

def send_telegram_message(message: str) -> bool:
    """Send message to Telegram"""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("Telegram credentials not configured")
        return False
    
    import requests
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    data = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": message,
        "parse_mode": "Markdown"
    }
    
    try:
        response = requests.post(url, json=data, timeout=10)
        return response.status_code == 200
    except Exception as e:
        print(f"Telegram error: {e}")
        return False

def load_articles() -> List[Dict]:
    """Load articles from articles-data.ts"""
    import sys
    sys.path.insert(0, 'lib')
    from articles_data import articles
    return articles

def get_new_articles():
    """Get list of articles to process"""
    articles = load_articles()
    return [extract_article_info(a) for a in articles]

def main():
    """Main function"""
    print("🚀 SaudiSaaSHub Social Media Automation")
    print("=" * 50)
    
    # Get articles
    articles = get_new_articles()
    print(f"Found {len(articles)} articles")
    
    # Process each article
    for article in articles[:3]:  # Process latest 3
        print(f"\n📝 {article['title']}")
        
        # Generate posts
        linkedin = generate_linkedin_post(article)
        twitter = generate_twitter_post(article)
        instagram = generate_instagram_post(article)
        
        print("\n📱 LinkedIn:")
        print(linkedin[:200] + "...")
        
        print("\n🐦 Twitter:")
        print(twitter[:200] + "...")
        
        print("\n📸 Instagram:")
        print(instagram[:200] + "...")
        
        # Send to Telegram
        if TELEGRAM_BOT_TOKEN:
            message = generate_telegram_message(article)
            if send_telegram_message(message):
                print("\n✅ Sent to Telegram!")
    
    print("\n" + "=" * 50)
    print("Done!")

if __name__ == "__main__":
    main()
