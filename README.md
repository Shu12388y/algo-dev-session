# Online Code Contest Platform

An enterprise-grade online code contest platform that allows users to solve algorithmic problems, participate in programming contests, and receive instant feedback on code submissions. The platform supports multiple programming languages and provides AI-powered assistance.

## 🎯 Overview

This is a full-stack application built with a monorepo architecture using Turborepo. It comprises multiple applications and packages that work together to provide a seamless coding contest experience.

### Key Features

- **Multi-Language Support**: Execute code in C, C++, Java, Python, JavaScript/Node.js
- **Real-time Code Execution**: Instant code compilation and execution with test cases
- **AI-Powered Assistance**: Integration with Google GenAI for code hints and explanations
- **User Authentication**: JWT-based secure authentication system
- **Role-Based Access Control**: Separate admin and user interfaces
- **GraphQL API**: Modern API with GraphQL for efficient data fetching
- **Queue-Based Processing**: Asynchronous job processing for code execution
- **Scalable Architecture**: Kubernetes-ready deployment with containerization

## 📁 Project Structure

### Monorepo Layout

```
algo-dev-session/
├── apps/                      # Application packages
│   ├── server/               # Express backend server
│   ├── web/                  # User-facing web application
│   ├── admin/                # Admin dashboard
│   └── codeJudge/            # Code execution judge service
├── packages/                 # Shared packages
│   ├── queues/              # Job queue and worker system
│   ├── ui/                  # Shared UI components
│   ├── eslint-config/       # Shared ESLint configuration
│   └── typescript-config/   # Shared TypeScript configuration
├── docker/                  # Docker configurations
├── k8s/                     # Kubernetes deployment files
└── turbo.json              # Turborepo configuration
```

## 🏗️ Architecture Overview

### Apps

#### **Server** (`apps/server`)
The main backend API server built with Express.js and TypeScript.

**Key Features:**
- GraphQL API for queries and mutations
- Authentication & Authorization (JWT)
- User management
- Admin operations
- Question management
- Submission tracking
- AI integration for code assistance
- Webhook handling for job results

**Technology Stack:**
- Express.js
- GraphQL
- MongoDB (via connection string)
- JWT for authentication
- Google GenAI SDK
- bcryptjs for password hashing

#### **Web** (`apps/web`)
User-facing web application for solving problems and participating in contests.

**Key Features:**
- Monaco Code Editor with syntax highlighting
- Real-time code submission
- 3D visualization (using Three.js)
- Voice AI assistance (Vapi AI)
- Redux state management
- GraphQL client queries
- Responsive UI with Tailwind CSS

**Technology Stack:**
- React 19
- Vite
- Redux Toolkit
- TanStack Query
- Monaco Editor
- Three.js
- Tailwind CSS

#### **Admin** (`apps/admin`)
Admin dashboard for managing problems, users, and contests.

**Technology Stack:**
- React 19
- Vite
- Tailwind CSS

#### **CodeJudge** (`apps/codeJudge`)
Specialized microservice for code execution and compilation.

**Key Features:**
- Multi-language compilation and execution
- GCC (for C), G++ (for C++)
- Java compiler and runtime
- Node.js for JavaScript
- Python interpreter
- Queue-based job processing
- Webhook notifications for results

**Supported Languages:**
- C (GCC)
- C++ (G++)
- Java
- JavaScript/Node.js
- Python

**Technology Stack:**
- Express.js
- Node.js
- Redis (for queuing)
- Job queue system

### Shared Packages

#### **Queues** (`packages/queues`)
Redis-based job queue system for asynchronous processing.

**Features:**
- Job enqueueing and processing
- Worker management
- Redis integration
- Retry logic

#### **UI** (`packages/ui`)
Reusable React components library.

**Components:**
- Button
- Card
- Code display component

#### **TypeScript Config** (`packages/typescript-config`)
Shared TypeScript configurations for different project types.

#### **ESLint Config** (`packages/eslint-config`)
Shared linting rules and configurations.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: >= 18
- **pnpm**: 9.0.0 (required package manager)
- **MongoDB**: For database storage
- **Redis**: For job queue processing
- **Docker**: For containerized deployment (optional)
- **Kubernetes**: For production deployment (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd algo-dev-session
```

2. Install dependencies using pnpm:
```bash
pnpm install
```

3. Set up environment variables:
   - Create `.env` files in `apps/server` and `apps/codeJudge`
   - Configure MongoDB URI, Redis connection, JWT secret, API keys, etc.

### Development

Start development servers for all applications:
```bash
pnpm dev
```

This will start:
- Backend server on configured port
- Web application (typically http://localhost:5173)
- Admin dashboard
- CodeJudge service

### Build

Build all applications:
```bash
pnpm build
```

### Type Checking

Check TypeScript types across the monorepo:
```bash
pnpm check-types
```

### Linting

Lint all files:
```bash
pnpm lint
```

### Code Formatting

Format code with Prettier:
```bash
pnpm format
```

## 🗄️ Database

The application uses MongoDB as the primary database. Key entities include:

- **Users**: User profiles, credentials, and statistics
- **Questions**: Programming problems with test cases
- **Submissions**: User code submissions and results
- **Contests**: Contest metadata and scheduling
- **Admin**: Administrative configurations

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for authentication:

- Tokens issued on login
- Tokens expire after configured duration
- Refresh token mechanism for extended sessions
- Role-based access control (User, Admin)

## 💼 Job Queue System

For asynchronous code execution:

1. User submits code
2. Submission job is enqueued to Redis
3. CodeJudge worker picks up the job
4. Code is compiled and executed
5. Results are sent back via webhook
6. User receives submission result

## 📡 API

### GraphQL Endpoints

Primary GraphQL endpoint: `/graphql`

**Available Services:**
- Authentication (login, signup, refresh token)
- User queries and mutations
- Question queries
- Submission handling
- AI assistance

### REST Endpoints

Additional REST routes for:
- Submission handling
- Webhook receivers

## 🐳 Deployment

### Docker

Build Docker image for CodeJudge:
```bash
docker build -f docker/cpp.dockerfile -t codejudge:latest .
```

### Kubernetes

Deploy using Kubernetes manifests:
```bash
kubectl apply -f k8s/deployment.yaml
```

Ensure the deployment includes:
- Server service
- CodeJudge service
- MongoDB connection
- Redis cache

## 📚 Development Workflow

### Monorepo Commands

Using Turborepo for efficient builds:

```bash
# Run build in all applicable packages
turbo run build

# Run dev in all packages with watch mode
turbo run dev

# Run linting across monorepo
turbo run lint

# Run type checking
turbo run check-types
```

### Adding New Features

1. Start development server: `pnpm dev`
2. Make changes in respective app
3. Test functionality
4. Run linting and type checks
5. Format code: `pnpm format`
6. Commit changes

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all tests pass
4. Submit a pull request

## 📝 Configuration

### Environment Variables

#### Server (`apps/server/.env`)
```
PORT=3000
MONGODB_URI=mongodb://...
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
WEBHOOK_RETRY_COUNT=3
```

#### CodeJudge (`apps/codeJudge/.env`)
```
PORT=3001
REDIS_URL=redis://localhost:6379
WEBHOOK_URL=http://server:3000/webhook
```

## 🔧 Technology Stack Summary

- **Frontend**: React, Vite, Redux, Tailwind CSS
- **Backend**: Express.js, GraphQL, MongoDB
- **Code Execution**: Docker containers with GCC, G++, Java, Node.js, Python
- **Queuing**: Redis with custom queue system
- **AI**: Google GenAI API
- **Voice**: Vapi AI
- **Deployment**: Docker, Kubernetes
- **Monorepo**: Turborepo
- **Package Manager**: pnpm

## 📊 Performance Considerations

- Asynchronous job processing prevents blocking UI
- Code execution in isolated containers for security
- Efficient database indexing on frequently queried fields
- Redis caching for high-traffic endpoints
- CDN-ready static asset delivery

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- MongoDB connection over URI
- Environment variable protection
- Role-based access control
- Input validation and sanitization

## 📞 Support & Troubleshooting

### Common Issues

1. **Database Connection Failed**: Check MongoDB URI and network connectivity
2. **Redis Connection Error**: Ensure Redis server is running
3. **Port Already in Use**: Change port in environment variables
4. **Build Fails**: Run `pnpm install` to ensure all dependencies are installed

## 📄 License

ISC

## 👨‍💻 Development Team

This project was developed as a comprehensive full-stack application demonstrating modern web development practices.

---

For more detailed architectural information, see [HLD_DESIGN.md](HLD_DESIGN.md)