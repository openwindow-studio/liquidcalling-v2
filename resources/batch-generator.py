#!/usr/bin/env python3
"""
Batch Article Generator for Liquid Calling
Generates larger batches of articles for cron jobs
"""

import os
import sys
from datetime import datetime
from article_generator import generate_articles, save_articles

def generate_batch(batch_size: int = 500):
    """Generate a large batch of articles"""

    print(f"🚀 Generating {batch_size} SEO articles for Liquid Calling...")
    print("=" * 60)

    # Create timestamped output directory
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_dir = f"batch_articles_{timestamp}"

    # Generate articles
    articles = generate_articles(batch_size)

    # Save to timestamped directory
    save_articles(articles, output_dir)

    print(f"\n✅ Batch generation complete!")
    print(f"Generated {len(articles)} articles in {output_dir}/")

    # Create symlink to latest batch
    latest_link = "latest_batch"
    if os.path.exists(latest_link):
        os.remove(latest_link)
    os.symlink(output_dir, latest_link)

    print(f"Latest batch accessible via: {latest_link}/")

    return output_dir

def main():
    """Main function with CLI argument handling"""

    # Default batch size
    batch_size = 500

    # Check for command line argument
    if len(sys.argv) > 1:
        try:
            batch_size = int(sys.argv[1])
        except ValueError:
            print("Error: Batch size must be a number")
            print("Usage: python3 batch-generator.py [batch_size]")
            sys.exit(1)

    # Validate batch size
    if batch_size < 1 or batch_size > 2000:
        print("Error: Batch size must be between 1 and 2000")
        sys.exit(1)

    # Generate batch
    output_dir = generate_batch(batch_size)

    print(f"\nTo generate more batches:")
    print(f"python3 batch-generator.py 1000")

if __name__ == "__main__":
    main()