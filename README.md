# SlackClone V3 🚀

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

> A fully-featured Slack-style real-time collaboration platform built with modern web technologies and monorepo architecture for scalable team communication

---

## 🌟 Why SlackClone V3?

| Feature | Description |
|---------|-------------|
| 🏢 **Enterprise Ready** | Multi-workspace support with role-based access control |
| ⚡ **Real-Time Everything** | WebSocket-powered messaging, typing indicators, and live updates |
| 🎥 **Rich Media** | Audio/video huddles, file sharing, and rich message formatting |
| 🔧 **Developer Friendly** | TypeScript, modern tooling, and clean architecture |

---

## ✨ Key Features

### 🏢 Workspace Management
- **Multi-Workspace Support** - Organize teams across different workspaces
- **Invite-Driven Access** - Secure workspace invitations with role-based permissions
- **Workspace Switching** - Seamless navigation between multiple workspaces

### 💬 Communication
- **Channel-Based Messaging** - Organized conversations in public/private channels
- **Threaded Discussions** - Keep conversations organized with reply threads
- **Rich Message Editor** - Markdown support, mentions, emojis, and formatting
- **Real-Time Messaging** - Instant message delivery with WebSocket infrastructure

### 🎥 Audio & Video
- **HD Video Huddles** - Crystal clear video calls powered by Stream Video SDK
- **Screen Sharing** - Share your screen during huddles
- **Audio-Only Calls** - Quick voice conversations
- **Meeting Controls** - Mute, camera toggle, and participant management

### 🔐 Security & Authentication
- **Clerk Integration** - Secure authentication with multi-tenant support
- **Role-Based Access** - Granular permissions for workspace members
- **Secure Invitations** - Email-based workspace invitations

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14 + TypeScript | React framework with App Router |
| **Styling** | TailwindCSS + Headless UI | Responsive, modern UI components |
| **Real-Time** | Stream Chat API + Video SDK | WebSocket infrastructure & media |
| **Database** | Prisma ORM + Neon PostgreSQL | Type-safe database operations |
| **Authentication** | Clerk.dev | Multi-tenant user management |
| **Architecture** | Monorepo | Unified codebase structure |
| **Deployment** | Vercel + Neon + Stream | Scalable cloud infrastructure |

---

## 🏗️ System Architecture

```mermaid
graph TB
    A[Next.js Frontend] --> B[API Routes]
    B --> C[Prisma ORM]
    C --> D[Neon PostgreSQL]
    A --> E[Clerk Auth]
    A --> F[Stream Chat SDK]
    A --> G[Stream Video SDK]
    F --> H[WebSocket Infrastructure]
    G --> H
    
    style A fill:#0070f3,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#6c47ff,stroke:#333,stroke-width:2px,color:#fff
    style F fill:#005fff,stroke:#333,stroke-width:2px,color:#fff
```
## 📁Project Structure 

<pre>
slack-clone-v3/
├── 📁 prisma/              # Database schema & migrations
│   ├── schema.prisma       # Prisma schema definition
│   └── seed.ts            # Database seeding scripts
├── 📁 public/              # Static assets
│   ├── icons/             # App icons and favicons
│   └── images/            # Images and media files
├── 📁 scripts/             # Utility scripts
│   ├── setup.ts           # Environment setup
│   └── deploy.ts          # Deployment scripts
├── 📁 src/
│   ├── 📁 app/             # Next.js App Router pages
│   │   ├── (auth)/        # Authentication pages
│   │   ├── workspace/     # Workspace-specific pages
│   │   ├── api/           # API route handlers
│   │   └── globals.css    # Global styles
│   ├── 📁 components/      # Reusable React components
│   │   ├── ui/            # Base UI components
│   │   ├── workspace/     # Workspace components
│   │   ├── channel/       # Channel components
│   │   └── huddle/        # Video/audio components
│   ├── 📁 lib/             # Utility libraries
│   │   ├── stream.ts      # Stream SDK configuration
│   │   ├── clerk.ts       # Clerk auth utilities
│   │   ├── prisma.ts      # Prisma client
│   │   └── utils.ts       # General utilities
│   ├── 📁 hooks/           # Custom React hooks
│   │   ├── use-stream.ts  # Stream integration hooks
│   │   └── use-workspace.ts # Workspace management
│   └── 📁 types/           # TypeScript type definitions
│       ├── workspace.ts   # Workspace types
│       ├── channel.ts     # Channel types
│       └── user.ts        # User types
├── 📄 .env.example         # Environment variables template
├── 📄 package.json         # Dependencies and scripts
├── 📄 tailwind.config.js   # Tailwind CSS configuration
├── 📄 next.config.js       # Next.js configuration
└── 📄 tsconfig.json        # TypeScript configuration
</pre>

## 🚀 Quick Start

## Prerequisites
<ul>
<li>
  Node.js 18+ and npm
</li>
  <li>
  PostgreSQL database (Neon recommended)
</li>
  <li>
  Clerk account for authentication
</li>
  <li>
  Stream account for chat and video
</li>
</ul>

```bash
# 1. Clone & Install
git clone https://github.com/Chinmay-innovates/slack-clone-v3.git
cd slack-clone-v3
npm install

# 2. Environment Setup
cp .env.example .env

# 3. Configure your .env file with required keys

# 4. Database Setup
npx prisma db push
npx prisma generate
npm run seed

# 5. Start Development Server
npm run dev

```
```bash
## 🔐 Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret

## 💬 Stream Chat & Video
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
STREAM_VIDEO_APP_ID=your_stream_video_app_id

## 🗄️ Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@your-neon-instance.neon.tech/dbname

## 🌐 Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
<div align="center">
  <p>Built with ❤️ by <a href="https://github.com/Chinmay-innovates">Chinmay</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
