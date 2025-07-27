# 🥜 Nutra Nexus

Premium e-commerce platform for NutriPro+ - a blend of organic dry fruits and essential vitamins. Built with **Next.js 15**, **Express**, **TypeScript**, and **PostgreSQL**.

## 🌟 Features

- **Modern Stack**: Next.js 15, Express, TypeScript, PostgreSQL
- **Payment Processing**: Stripe integration with webhooks
- **Docker Support**: Complete containerization with hot reload
- **Admin Dashboard**: Order management, inventory tracking, analytics
- **Responsive Design**: Mobile-first approach with dark mode
- **Email Notifications**: Order confirmations and updates
- **Stock Management**: Real-time inventory tracking with low-stock alerts
- **Product Reviews**: Customer feedback system
- **Order Tracking**: Real-time order status updates

## 🚀 Quick Start

### Prerequisites

- **Docker & Docker Compose**
- **Node.js 18+** (for local development)

### Docker Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd nutra-nexus
   ```

2. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Edit your environment variables:**
   ```bash
   # The setup script creates a .env file
   # Edit it with your actual Stripe keys
   nano .env
   ```

4. **Start the application:**
   ```bash
   docker-compose up -d --build
   ```

5. **Access the application:**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8000
   - **Database**: localhost:5432 (nutra_nexus)
   - **Health Check**: http://localhost:8000/health

### Manual Setup (Alternative)

1. **Create .env file:**
   ```bash
   # Copy the example or create manually with required variables
   ```

2. **Start with Docker:**
   ```bash
   docker-compose up -d --build
   ```

## 🔧 Environment Variables

All configuration is managed through a single `.env` file in the root directory:

```env
# Application Configuration
NODE_ENV=development
APP_NAME=Nutra Nexus
FRONTEND_PORT=3000
BACKEND_PORT=8000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nutra_nexus
DB_USER=postgres
DB_PASSWORD=password

# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Logging
LOG_LEVEL=info
```

### Production Mode

To run in production mode, change `NODE_ENV=production` in your `.env` file or:

```bash
NODE_ENV=production docker-compose up -d --build
```

## 🐳 Docker Commands

### Basic Commands

```bash
# Start application
docker-compose up -d

# Start with build
docker-compose up -d --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f database

# Stop services
docker-compose down

# Clean up (remove volumes)
docker-compose down -v

# Restart services
docker-compose restart

# Rebuild and restart
docker-compose down && docker-compose up -d --build
```

### Production Deployment

```bash
# Production mode
NODE_ENV=production docker-compose up -d --build

# Check status
docker-compose ps

# Scale services (if needed)
docker-compose up -d --scale backend=2
```

## 📁 Project Structure

```
nutra-nexus/
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── database/       # Database configuration
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   └── Dockerfile          # Docker configuration
├── frontend/               # Next.js application
│   ├── app/               # Next.js 13+ App Router
│   ├── components/        # React components
│   ├── lib/              # Utility libraries
│   └── Dockerfile        # Docker configuration
├── database/             # Database initialization
│   └── init.sql         # Database schema
├── docker-compose.yml    # Docker orchestration
├── .env                 # Environment variables
├── setup.sh            # Setup script
└── README.md          # This file
```

## 🔄 API Endpoints

### Orders
- `GET /api/orders` - List all orders
- `GET /api/orders/:id` - Get specific order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order

### Stripe
- `POST /api/stripe/create-payment-intent` - Create payment intent
- `POST /api/webhooks/stripe` - Stripe webhook handler

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get specific product

## 🚧 Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `.env` file if 3000/8000 are occupied
2. **Database connection**: Ensure PostgreSQL is running and credentials are correct
3. **Stripe webhooks**: Use Stripe CLI for local development: 
   ```bash
   stripe listen --forward-to localhost:8000/api/webhooks/stripe
   ```
4. **Docker issues**: Run `docker-compose down -v` to clean up volumes

### Database Issues

```bash
# Reset database
docker-compose down -v
docker-compose up database -d
```

### Build Issues

```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Database Management

### Access Database

```bash
# Connect to database
docker-compose exec database psql -U postgres -d nutra_nexus
```

### Common Database Commands

```sql
-- List tables
\dt

-- View orders
SELECT * FROM orders LIMIT 5;

-- Check table structure
\d orders
```

## 🔐 Security Features

- **Helmet.js**: Security headers
- **CORS**: Configured for frontend domain
- **Environment Variables**: Sensitive data in env files
- **Stripe Webhooks**: Signature verification
- **Docker**: Containerized deployment

## 📈 Performance Features

- **Hot Reload**: Development changes auto-reload
- **Volume Mounts**: Live code editing in containers
- **Production Optimization**: Optimized builds when NODE_ENV=production
- **Database Connection Pooling**: Efficient PostgreSQL connections

## 🎯 Development Workflow

1. **Make code changes** in your editor
2. **See changes immediately** with hot reload
3. **View logs** with `docker-compose logs -f`
4. **Test features** at http://localhost:3000
5. **Check database** with `docker-compose exec database psql -U postgres -d nutra_nexus`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with Docker: `docker-compose up -d --build`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for premium health and wellness products** https://github.com/Vijaypastham/nutranexus.git
