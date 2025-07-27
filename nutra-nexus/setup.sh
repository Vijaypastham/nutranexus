#!/bin/bash

# Nutra Nexus Setup Script
# This script helps you set up the development environment

set -e

echo "🥜 Nutra Nexus Setup"
echo "===================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file with default values..."
    cat > .env << 'EOF'
# Application Configuration
NODE_ENV=development
APP_NAME=Nutra Nexus

# Port Configuration
FRONTEND_PORT=3000
BACKEND_PORT=8000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nutra_nexus
DB_USER=postgres
DB_PASSWORD=password

# Stripe Configuration (Replace with your actual keys)
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Logging
LOG_LEVEL=info
EOF
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env file with your actual Stripe keys!"
    echo "   You need to update:"
    echo "   - STRIPE_PUBLISHABLE_KEY"
    echo "   - STRIPE_SECRET_KEY"
    echo "   - STRIPE_WEBHOOK_SECRET"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Ask user what they want to do
echo "What do you want to do?"
echo "1) Start the application with Docker (Recommended)"
echo "2) Just create .env file and exit"
echo ""
read -p "Choose an option (1-2): " choice

case $choice in
    1)
        echo "🚀 Starting Docker environment..."
        docker-compose up -d --build
        echo ""
        echo "✅ Application is starting!"
        echo "   Frontend: http://localhost:3000"
        echo "   Backend: http://localhost:8000"
        echo "   Database: localhost:5432"
        echo ""
        echo "📋 To view logs: docker-compose logs -f"
        echo "📋 To stop: docker-compose down"
        ;;
    2)
        echo "✅ Setup complete!"
        echo ""
        echo "📋 Next steps:"
        echo "   1. Edit .env file with your Stripe keys"
        echo "   2. Run: docker-compose up -d --build"
        echo ""
        ;;
    *)
        echo "❌ Invalid option. Please choose 1 or 2."
        exit 1
        ;;
esac

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📚 Useful commands:"
echo "   - Start: docker-compose up -d"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop: docker-compose down"
echo "   - Restart: docker-compose restart"
echo "   - Clean reset: docker-compose down -v && docker-compose up -d --build"
echo ""
echo "🔧 For production mode:"
echo "   NODE_ENV=production docker-compose up -d --build"
echo ""
echo "🔧 For Stripe webhook testing:"
echo "   stripe listen --forward-to localhost:8000/api/webhooks/stripe"
echo ""
echo "📖 Read README.md for more information." 