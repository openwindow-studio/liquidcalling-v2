#!/usr/bin/env python3
"""
Liquid Calling Markdown to HTML Converter
Converts generated markdown articles to HTML using the LC brand template
"""

import json
import os
import re
from datetime import datetime
from typing import Dict, List, Any

def load_html_template() -> str:
    """Load the HTML template"""
    with open('LIQUID_CALLING_DESIGN.html', 'r', encoding='utf-8') as f:
        return f.read()

def markdown_to_html(markdown_content: str) -> str:
    """Convert markdown content to HTML"""

    # Convert headers
    html_content = re.sub(r'^# (.+)$', r'<h1 class="article-title">\1</h1>', markdown_content, flags=re.MULTILINE)
    html_content = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html_content, flags=re.MULTILINE)
    html_content = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html_content, flags=re.MULTILINE)

    # Convert bold text
    html_content = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html_content)

    # Convert italic text
    html_content = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html_content)

    # Convert bullet lists
    lines = html_content.split('\n')
    in_list = False
    converted_lines = []

    for line in lines:
        if line.strip().startswith('- '):
            if not in_list:
                converted_lines.append('<ul>')
                in_list = True
            list_item = line.strip()[2:]  # Remove '- '
            converted_lines.append(f'<li>{list_item}</li>')
        else:
            if in_list:
                converted_lines.append('</ul>')
                in_list = False
            converted_lines.append(line)

    if in_list:
        converted_lines.append('</ul>')

    html_content = '\n'.join(converted_lines)

    # Convert key takeaways section
    key_takeaways_pattern = r'## Key Takeaways\n((?:- .+\n?)+)'

    def replace_key_takeaways(match):
        takeaways = match.group(1)
        takeaways_html = takeaways.replace('- ', '<li>').replace('\n', '</li>\n')
        takeaways_html = takeaways_html.replace('</li>\n</li>', '</li>')

        return f'''<div class="key-takeaways">
    <h3 class="takeaways-title">Key Takeaways</h3>
    <ul class="takeaways-list">
{takeaways_html}    </ul>
</div>'''

    html_content = re.sub(key_takeaways_pattern, replace_key_takeaways, html_content, flags=re.MULTILINE)

    # Convert tables
    def convert_table(match):
        table_content = match.group(0)
        lines = table_content.strip().split('\n')

        if len(lines) < 3:
            return table_content

        # Parse header
        header_row = lines[0].strip('|').split('|')
        header_row = [cell.strip() for cell in header_row]

        # Parse data rows (skip separator line)
        data_rows = []
        for line in lines[2:]:
            if line.strip():
                row = line.strip('|').split('|')
                row = [cell.strip() for cell in row]
                data_rows.append(row)

        # Generate HTML table
        table_html = '<table class="feature-table">\n<thead>\n<tr>\n'
        for header in header_row:
            table_html += f'<th>{header}</th>\n'
        table_html += '</tr>\n</thead>\n<tbody>\n'

        for row in data_rows:
            table_html += '<tr>\n'
            for cell in row:
                table_html += f'<td>{cell}</td>\n'
            table_html += '</tr>\n'

        table_html += '</tbody>\n</table>'
        return table_html

    # Match tables
    table_pattern = r'\|.+\|\n\|[-:| ]+\|\n(?:\|.+\|\n?)+'
    html_content = re.sub(table_pattern, convert_table, html_content, flags=re.MULTILINE)

    # Convert paragraphs
    paragraphs = html_content.split('\n\n')
    processed_paragraphs = []

    for para in paragraphs:
        para = para.strip()
        if para and not para.startswith('<') and not para.startswith('#'):
            processed_paragraphs.append(f'<p>{para}</p>')
        else:
            processed_paragraphs.append(para)

    html_content = '\n\n'.join(processed_paragraphs)

    return html_content

def generate_article_tags(title: str, content: str, category: str) -> List[str]:
    """Generate relevant tags based on article content"""

    # Base tags for all articles
    base_tags = ["Anonymous Calling", "Privacy", "Secure Communication"]

    # Category-specific tags
    category_tags = {
        "crypto_focused": ["Web3", "Crypto Trading", "USDC Payments", "DAO", "DeFi"],
        "how_to": ["Tutorial", "Guide", "Setup"],
        "comparison": ["Reviews", "Alternatives"],
        "listicle": ["Best Practices", "Tools"],
        "ultimate_guide": ["Complete Guide", "Advanced"],
        "location_based": ["Regional", "Local"]
    }

    # Content-based tags
    content_keywords = {
        "browser": "Browser-Based",
        "crypto": "Cryptocurrency",
        "trading": "Trading",
        "business": "Business",
        "encrypted": "Encryption",
        "hyperliquid": "Hyperliquid",
        "base": "Base Chain",
        "usdc": "USDC",
        "dao": "DAO Governance",
        "defi": "DeFi",
        "mobile": "Mobile",
        "international": "International"
    }

    # Start with base tags
    tags = base_tags.copy()

    # Add category-specific tags
    if category in category_tags:
        tags.extend(category_tags[category][:3])  # Max 3 category tags

    # Add content-based tags
    title_lower = title.lower()
    content_lower = content.lower()

    for keyword, tag in content_keywords.items():
        if keyword in title_lower or keyword in content_lower:
            if tag not in tags:
                tags.append(tag)

    # Return max 6 tags
    return tags[:6]

def create_html_page(article_content: str, metadata: Dict[str, Any], template: str) -> str:
    """Create complete HTML page from article content and metadata"""

    # Extract the title from content
    title_match = re.search(r'<h1 class="article-title">(.+?)</h1>', article_content)
    if title_match:
        article_title = title_match.group(1)
        # Remove the title from content since it's handled in header
        article_content = re.sub(r'<h1 class="article-title">(.+?)</h1>\s*', '', article_content)
    else:
        article_title = metadata['title']

    # Generate category badge with user-friendly names
    category_mapping = {
        'listicle': 'GUIDES',
        'how_to': 'TUTORIALS',
        'comparison': 'REVIEWS',
        'ultimate_guide': 'COMPLETE GUIDES',
        'location_based': 'REGIONAL',
        'crypto_focused': 'CRYPTO & WEB3'
    }

    display_category = category_mapping.get(metadata['category'], metadata['category'].replace('_', ' ').title().upper())
    category_badge = f'''<a href="/resources/category/{metadata['category']}" class="category-badge">
                    <div class="category-dot"></div>
                    {display_category}
                </a>'''

    # Generate tags
    article_tags = generate_article_tags(article_title, article_content, metadata['category'])
    tags_html = '<div class="article-tags">'
    for tag in article_tags:
        tag_slug = tag.lower().replace(' ', '-')
        tags_html += f'\n                    <a href="/resources/tag/{tag_slug}" class="tag">{tag}</a>'
    tags_html += '\n                </div>'

    # Generate breadcrumbs
    breadcrumbs = f'<a href="/">Home</a> → <a href="/resources">Resources</a> → {article_title}'

    # Calculate reading time
    word_count = len(article_content.split())
    read_time = max(1, word_count // 200)  # 200 words per minute

    # Format date
    pub_date = datetime.fromisoformat(metadata['published_date'].replace('Z', '+00:00'))
    formatted_date = pub_date.strftime('%B %d, %Y').upper()

    # Generate conclusion
    conclusion_options = [
        "In an era where digital privacy is increasingly rare, Liquid Calling offers a refreshing approach to secure communication. With its browser-based platform, pay-per-use model, and commitment to anonymity, it's the perfect solution for anyone who values their privacy.",
        "Whether you're a business professional handling sensitive calls or simply someone who values privacy, Liquid Calling provides the tools you need for secure, anonymous voice communication.",
        "The future of private communication is here, and it doesn't require downloads, accounts, or subscriptions. Try Liquid Calling today and experience the difference.",
        "Stop compromising your privacy for convenience. With Liquid Calling, you get both - instant access to encrypted voice calls without sacrificing your anonymity.",
        "Join thousands of privacy-conscious users who have already made the switch to browser-based anonymous calling. Your conversations deserve better protection."
    ]
    import random
    conclusion_text = random.choice(conclusion_options)

    # Replace placeholders in template
    html_page = template.replace(
        '<title>Anonymous Calling for Crypto Traders | Liquid Calling Resources</title>',
        f'<title>{article_title} | Liquid Calling Resources</title>'
    )

    # Replace meta description
    html_page = re.sub(
        r'<meta name="description" content="[^"]*">',
        f'<meta name="description" content="{metadata.get("meta_description", "")}">',
        html_page
    )

    # Add meta description if not present
    if 'meta name="description"' not in html_page:
        description_meta = f'<meta name="description" content="{metadata.get("meta_description", "")}">'
        html_page = html_page.replace('<meta name="viewport"', f'{description_meta}\n    <meta name="viewport"')

    # Replace conclusion placeholder and datetime template strings
    html_page = html_page.replace('{conclusion_text}', conclusion_text)
    html_page = html_page.replace('{datetime.now().strftime("%B %d, %Y")}', datetime.now().strftime("%B %d, %Y"))

    # Replace article title
    html_page = re.sub(
        r'<h1 class="article-title">[^<]+</h1>',
        f'<h1 class="article-title">{article_title}</h1>',
        html_page
    )

    # Replace article meta
    meta_html = f'''<div class="article-meta">
                    <time class="meta-item" datetime="{metadata['published_date']}">{formatted_date}</time>
                    <span class="meta-item">{read_time} MIN READ</span>
                </div>

                {category_badge}

                {tags_html}'''

    html_page = re.sub(
        r'<div class="article-meta">.*?</div>\s*</header>',
        f'{meta_html}\n            </header>',
        html_page,
        flags=re.DOTALL
    )

    # Replace breadcrumbs
    html_page = re.sub(
        r'<div class="breadcrumbs">.*?</div>',
        f'<div class="breadcrumbs">{breadcrumbs}</div>',
        html_page
    )

    # Replace article content
    content_start = html_page.find('<div class="article-content">')
    content_end = html_page.find('</div>', content_start) + 6

    if content_start != -1 and content_end != -1:
        new_content = f'<div class="article-content">\n{article_content}\n            </div>'
        html_page = html_page[:content_start] + new_content + html_page[content_end:]

    return html_page

def convert_articles_to_html():
    """Convert all markdown articles to HTML"""

    # Load template
    print("📄 Loading HTML template...")
    template = load_html_template()

    # Load articles index
    print("📋 Loading articles metadata...")
    with open('generated_articles/articles_index.json', 'r', encoding='utf-8') as f:
        articles_metadata = json.load(f)

    # Create output directory
    output_dir = 'html_articles'
    os.makedirs(output_dir, exist_ok=True)

    # Convert each article
    print(f"🔄 Converting {len(articles_metadata)} articles to HTML...")

    for i, metadata in enumerate(articles_metadata):
        # Read markdown file
        md_file = f"generated_articles/{metadata['slug']}.md"

        if not os.path.exists(md_file):
            print(f"⚠️ Markdown file not found: {md_file}")
            continue

        with open(md_file, 'r', encoding='utf-8') as f:
            markdown_content = f.read()

        # Convert to HTML
        html_content = markdown_to_html(markdown_content)

        # Create complete HTML page
        html_page = create_html_page(html_content, metadata, template)

        # Save HTML file
        html_file = f"{output_dir}/{metadata['slug']}.html"
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(html_page)

        if (i + 1) % 50 == 0:
            print(f"Converted {i + 1}/{len(articles_metadata)} articles...")

    print(f"\n✅ Conversion complete! Generated {len(articles_metadata)} HTML articles.")
    print(f"HTML articles saved to: {output_dir}/")

    # Generate index page
    generate_index_page(articles_metadata, template, output_dir)

def generate_index_page(articles_metadata: List[Dict], template: str, output_dir: str):
    """Generate an index page listing all articles"""

    # Group articles by category
    categories = {}
    for article in articles_metadata:
        cat = article['category']
        if cat not in categories:
            categories[cat] = []
        categories[cat].append(article)

    # Generate index content
    index_content = '''<div class="page-header">
        <h1 class="page-title">Liquid Calling Resources</h1>
        <p class="page-description">Comprehensive guides on anonymous calling, private voice chat, and secure communication.</p>
    </div>'''

    for category, articles in categories.items():
        category_name = category.replace('_', ' ').title()
        index_content += f'\n\n<h2>{category_name} ({len(articles)} articles)</h2>\n<ul class="article-list">'

        for article in articles[:10]:  # Show first 10 articles per category
            index_content += f'\n<li><a href="{article["slug"]}.html">{article["title"]}</a></li>'

        if len(articles) > 10:
            index_content += f'\n<li><em>...and {len(articles) - 10} more articles</em></li>'

        index_content += '\n</ul>'

    # Create index page
    index_page = template.replace(
        '<title>Anonymous Calling for Crypto Traders | Liquid Calling Resources</title>',
        '<title>Resources | Liquid Calling</title>'
    )

    # Replace breadcrumbs for index
    index_page = re.sub(
        r'<div class="breadcrumbs">.*?</div>',
        '<div class="breadcrumbs"><a href="/">Home</a> → Resources</div>',
        index_page
    )

    # Replace content
    content_start = index_page.find('<div class="main-content">')
    article_start = index_page.find('<article class="article-container">')
    cta_start = index_page.find('<div class="cta-section">')

    if content_start != -1 and article_start != -1 and cta_start != -1:
        new_content = f'''<div class="main-content">
        <!-- Breadcrumbs -->
        <div class="breadcrumbs">
            <a href="/">Home</a> → Resources
        </div>

        {index_content}

        <!-- CTA Section -->'''

        index_page = index_page[:content_start] + new_content + index_page[cta_start:]

    # Save index page
    with open(f'{output_dir}/index.html', 'w', encoding='utf-8') as f:
        f.write(index_page)

    print(f"📄 Generated index page: {output_dir}/index.html")

if __name__ == "__main__":
    print("🚀 Liquid Calling Markdown to HTML Converter")
    print("=" * 50)

    convert_articles_to_html()

    print("\n🎉 All articles converted successfully!")