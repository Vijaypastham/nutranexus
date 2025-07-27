# 🐳 Docker Setup Guide

This guide provides detailed instructions for running Nutra Nexus with Docker.

## 🏗️ Architecture

The Docker setup includes:
- **Frontend**: Next.js 15 with hot reload in development
- **Backend**: Express.js with TypeScript and hot reload
- **Database**: PostgreSQL 15 with persistent volumes
- **Networking**: Internal Docker network for service communication

## 📋 Prerequisites

- Docker 20.10+ 
- Docker Compose 2.0+
- 4GB+ available RAM
- 2GB+ free disk space

## ⚡ Quick Start

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd nutra-nexus
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Edit environment variables:**
   ```bash
   # The setup script creates .env file
   # Edit with your actual Stripe keys
   nano .env
   ```

3. **Start the application:**
   ```bash
   docker-compose up -d --build
   ```

## 🔧 Environment Configuration

### Single .env File

All configuration is managed through one `.env` file in the root directory:

```env
# Application - Controls development vs production mode
NODE_ENV=development
APP_NAME=Nutra Nexus
FRONTEND_PORT=3000
BACKEND_PORT=8000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nutra_nexus
DB_USER=postgres
DB_PASSWORD=password

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here

# Logging
LOG_LEVEL=info
```

### Development vs Production

The same Docker setup automatically adapts based on `NODE_ENV`:

- **Development** (`NODE_ENV=development`):
  - Hot reload enabled
  - Volume mounts for live editing
  - Debug logging
  - Development server commands

- **Production** (`NODE_ENV=production`):
  - Optimized builds
  - No volume mounts
  - Production server commands
  - Minimal logging

## 🚀 Running the Application

### Basic Docker Compose Commands

```bash
# Start application (development mode by default)
docker-compose up -d

# Start with build
docker-compose up -d --build

# Production mode
NODE_ENV=production docker-compose up -d --build

# Background mode (default with -d flag)
docker-compose up -d --build
```

## 🔄 Development Features

### Hot Reload

When `NODE_ENV=development`:
- **Frontend**: Next.js dev server with hot reload
- **Backend**: tsx watch mode for TypeScript hot reload
- **Volume Mounts**: Live code editing without rebuilding

### Live Editing

Your local code is mounted into containers:
```yaml
volumes:
  - ./backend:/app      # Backend code
  - ./frontend:/app     # Frontend code
  - /app/node_modules   # Preserve node_modules
```

## 🏭 Production Mode

### Enable Production Mode

```bash
# Method 1: Edit .env file
NODE_ENV=production

# Method 2: Environment variable
NODE_ENV=production docker-compose up -d --build
```

### Production Optimizations

- **Optimized builds**: `npm run build` during Docker build
- **Production servers**: `npm start` commands
- **No volume mounts**: Code baked into images
- **Minimal logging**: Less verbose output

## 📊 Database Management

### Access Database

```bash
# Connect to database
docker-compose exec database psql -U postgres -d nutra_nexus
```

### Database Operations

```sql
-- Check tables
\dt

-- View orders
SELECT * FROM orders LIMIT 5;

-- Check database stats
SELECT COUNT(*) FROM orders;
```

### Backup & Restore

```bash
# Backup
docker-compose exec database pg_dump -U postgres nutra_nexus > backup.sql

# Restore
docker-compose exec -T database psql -U postgres nutra_nexus < backup.sql

# Reset database
docker-compose down -v  # Removes volumes and data
```

## 🔍 Debugging

### Container Status

```bash
# Check status
docker-compose ps

# View resource usage
docker stats

# Container details
docker-compose logs -f
```

### Service-Specific Logs

```bash
# All logs
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend

# Database only
docker-compose logs -f database
```

### Shell Access

```bash
# Backend container
docker-compose exec backend sh

# Frontend container
docker-compose exec frontend sh

# Database container
docker-compose exec database psql -U postgres -d nutra_nexus
```

### Common Issues

#### Port Conflicts
```bash
# Edit .env file
FRONTEND_PORT=3001
BACKEND_PORT=8001
DB_PORT=5433
```

#### Memory Issues
```bash
# Check usage
docker system df

# Clean up
docker-compose down -v
docker system prune -f
```

#### Build Issues
```bash
# Force rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🔧 Customization

### Environment Variables

Add new variables to `.env`:
```env
# Custom variables
CUSTOM_API_KEY=your_key_here
CUSTOM_FEATURE_FLAG=true
```

Reference in docker-compose.yml:
```yaml
environment:
  CUSTOM_API_KEY: ${CUSTOM_API_KEY}
  CUSTOM_FEATURE_FLAG: ${CUSTOM_FEATURE_FLAG}
```

### Adding Services

Add to `docker-compose.yml`:
```yaml
services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
```

### Resource Limits

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

## 📈 Performance Tips

### Faster Builds

```bash
# Use BuildKit
DOCKER_BUILDKIT=1 docker-compose build

# Parallel builds
docker-compose build --parallel
```

### Layer Caching

The Dockerfiles are optimized for layer caching:
1. Copy package files first
2. Install dependencies
3. Copy source code last

### Volume Performance

On macOS/Windows, consider using Docker volumes instead of bind mounts for better performance:

```yaml
volumes:
  - node_modules_backend:/app/node_modules
  - node_modules_frontend:/app/node_modules
```

## 🔒 Security

### Best Practices Implemented

1. **Environment Variables**: Secrets in .env file
2. **Internal Networking**: Services communicate via internal Docker network
3. **Minimal Images**: Alpine-based images
4. **No Root Users**: Containers run as non-root (in production builds)

### Security Scanning

```bash
# Scan for vulnerabilities
docker scout cves nutra-nexus-backend
docker scout cves nutra-nexus-frontend
```

## 🧹 Maintenance

### Regular Cleanup

```bash
# Clean everything
docker-compose down -v
docker system prune -a
docker volume prune  # BE CAREFUL - removes data
```

### Updates

```bash
# Update base images
docker-compose pull
docker-compose build --pull
docker-compose up -d
```

### Monitoring

```bash
# Resource usage
docker stats

# Container health
docker-compose ps

# Logs with timestamps
docker-compose logs -f -t
```

## 📦 Deployment

### Local Production Test

```bash
# Test production build locally
NODE_ENV=production docker-compose up -d --build

# Check optimization
docker images | grep nutra-nexus
```

### CI/CD Integration

```bash
# Build for deployment
docker-compose build --no-cache

# Tag for registry
docker tag nutra-nexus-backend:latest your-registry/nutra-nexus-backend:latest

# Push to registry
docker push your-registry/nutra-nexus-backend:latest
```

## 📚 Essential Commands Reference

```bash
# Basic Operations
docker-compose up -d                    # Start services
docker-compose up -d --build           # Start with build
docker-compose down                     # Stop services
docker-compose restart                 # Restart services

# Logs and Monitoring
docker-compose logs -f                 # View all logs
docker-compose logs -f backend         # View backend logs
docker-compose ps                      # Check status

# Maintenance
docker-compose down -v                 # Clean stop (removes volumes)
docker-compose build --no-cache        # Force rebuild
docker system prune -f                 # Clean up Docker

# Production
NODE_ENV=production docker-compose up -d --build  # Production mode
```

---

For more information, see the main [README.md](README.md). 