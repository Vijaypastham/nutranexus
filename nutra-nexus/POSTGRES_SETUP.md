# PostgreSQL Setup Guide for Nutra Nexus

## 🎉 Migration Complete!

Your Nutra Nexus application has been successfully migrated from SQLite to PostgreSQL! 

## 🚀 Quick Start Options

### Option 1: Using Docker Compose (Recommended)
```bash
# Start everything including PostgreSQL
docker-compose up

# Or run in detached mode
docker-compose up -d
```

### Option 2: Local Development Setup

#### Prerequisites
- PostgreSQL 15+ installed locally
- Node.js 18+ and pnpm

#### 1. Start PostgreSQL
```bash
# Using Homebrew on macOS
brew services start postgresql

# Using Docker for PostgreSQL only
docker run --name nutra-postgres \
  -e POSTGRES_DB=nutra_nexus \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15-alpine
```

#### 2. Create Database
```bash
# Connect to PostgreSQL
psql -h localhost -U postgres

# Create database (if not exists)
CREATE DATABASE nutra_nexus;
\q
```

#### 3. Start Services
```bash
# Start both frontend and backend
pnpm dev

# Or start individually
pnpm dev:backend  # Backend on :8000
pnpm dev:frontend # Frontend on :3000
```

## 📊 Database Configuration

Your environment files are already configured:

**Backend (.env):**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nutra_nexus
DB_USER=postgres
DB_PASSWORD=password
```

**Docker Environment:**
- Database: `postgres` (container name)
- Port: `5432`
- Database: `nutra_nexus`
- User/Password: `postgres/password`

## 🔧 What Changed

### Database Features
✅ **PostgreSQL Features Added:**
- Connection pooling (max 20 connections)
- JSONB for order items (better performance than JSON)
- Auto-incrementing SERIAL primary keys
- Automatic `updated_at` triggers
- Proper decimal handling for monetary values
- Native UUID support ready

### SQL Changes
- Parameter placeholders: `?` → `$1, $2, $3`
- Data types: `INTEGER` → `SERIAL`, `TEXT` → `VARCHAR`, `REAL` → `DECIMAL`
- JSON handling: `TEXT` → `JSONB`
- Auto-timestamps with database triggers

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Database**: localhost:5432 (nutra_nexus)
- **Health Check**: http://localhost:8000/health

## 🔐 Production Notes

For production deployment:

1. **Change default credentials** in environment files
2. **Enable SSL** for database connections
3. **Configure proper backup strategy**
4. **Set up connection limits** based on your infrastructure
5. **Update Stripe keys** with real values

## 🎯 Database Schema

The orders table now uses PostgreSQL-optimized schema:

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(255) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(255) NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'INR',
  status VARCHAR(50) DEFAULT 'pending',
  stripe_payment_intent_id VARCHAR(255),
  stripe_session_id VARCHAR(255),
  receipt_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## ✅ Ready to Go!

Your application is now running on PostgreSQL with improved performance, scalability, and production-readiness! 🎊 