#!/bin/bash

# Setup cron job for automated article generation
# Run this script to set up automatic article generation

echo "🚀 Setting up Liquid Calling SEO Article Generation Cron Job"
echo "============================================================"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BATCH_GENERATOR="$SCRIPT_DIR/batch-generator.py"

# Verify batch generator exists
if [ ! -f "$BATCH_GENERATOR" ]; then
    echo "❌ Error: batch-generator.py not found at $BATCH_GENERATOR"
    exit 1
fi

# Make scripts executable
chmod +x "$BATCH_GENERATOR"
echo "✅ Made batch-generator.py executable"

# Create log directory
LOG_DIR="$SCRIPT_DIR/logs"
mkdir -p "$LOG_DIR"
echo "✅ Created log directory: $LOG_DIR"

# Create cron job command
CRON_COMMAND="cd $SCRIPT_DIR && python3 batch-generator.py 100 >> $LOG_DIR/article_generation.log 2>&1"

echo ""
echo "📝 Cron job command:"
echo "$CRON_COMMAND"
echo ""

# Offer different scheduling options
echo "Choose scheduling frequency:"
echo "1) Daily at 3 AM"
echo "2) Weekly (Sundays at 2 AM)"
echo "3) Twice daily (6 AM & 6 PM)"
echo "4) Custom schedule"
echo "5) Just show me the commands (don't install)"

read -p "Enter choice (1-5): " choice

case $choice in
    1)
        CRON_SCHEDULE="0 3 * * *"
        DESCRIPTION="Daily at 3 AM"
        ;;
    2)
        CRON_SCHEDULE="0 2 * * 0"
        DESCRIPTION="Weekly on Sundays at 2 AM"
        ;;
    3)
        CRON_SCHEDULE="0 6,18 * * *"
        DESCRIPTION="Twice daily at 6 AM and 6 PM"
        ;;
    4)
        echo "Enter custom cron schedule (e.g., '0 3 * * *' for daily 3 AM):"
        read -p "Schedule: " CRON_SCHEDULE
        DESCRIPTION="Custom schedule: $CRON_SCHEDULE"
        ;;
    5)
        echo ""
        echo "📋 Manual cron job commands:"
        echo ""
        echo "To add the cron job manually:"
        echo "1. Run: crontab -e"
        echo "2. Add this line:"
        echo "   0 3 * * * $CRON_COMMAND"
        echo ""
        echo "To view current cron jobs: crontab -l"
        echo "To remove the job: crontab -e (then delete the line)"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

# Add to crontab
echo ""
echo "📅 Setting up cron job: $DESCRIPTION"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "batch-generator.py"; then
    echo "⚠️  Existing article generation cron job found"
    read -p "Replace existing job? (y/n): " replace
    if [[ $replace =~ ^[Yy]$ ]]; then
        # Remove existing job and add new one
        (crontab -l 2>/dev/null | grep -v "batch-generator.py"; echo "$CRON_SCHEDULE $CRON_COMMAND") | crontab -
        echo "✅ Replaced existing cron job"
    else
        echo "❌ Aborted - keeping existing cron job"
        exit 1
    fi
else
    # Add new job
    (crontab -l 2>/dev/null; echo "$CRON_SCHEDULE $CRON_COMMAND") | crontab -
    echo "✅ Added new cron job"
fi

echo ""
echo "🎉 Cron job setup complete!"
echo ""
echo "Details:"
echo "- Schedule: $DESCRIPTION"
echo "- Command: python3 batch-generator.py 100"
echo "- Logs: $LOG_DIR/article_generation.log"
echo ""
echo "To check if it's working:"
echo "- View logs: tail -f $LOG_DIR/article_generation.log"
echo "- List cron jobs: crontab -l"
echo "- Test manually: cd $SCRIPT_DIR && python3 batch-generator.py 10"
echo ""
echo "To remove the cron job:"
echo "- Run: crontab -e"
echo "- Delete the line containing 'batch-generator.py'"