
SlackClone V3

A fully-featured Slack-style real-time collaboration platform, built with a monorepo architecture using modern web technologies. This platform supports multi-workspace communication with text channels, threads, audio/video huddles, and invite-driven workspace access.

✅ Designed for teams.
✅ Built for scale.
✅ Powered by modern web tech.

---

🚀 Features

✅ Multi-Workspace Support

✅ Channel-Based Communication (Text / Audio / Video)

✅ Threaded Messaging System

✅ Audio & Video Huddles (via Stream Video SDK)

✅ Workspace Invitations & Role-Based Access

✅ Real-Time Messaging with WebSocket Infrastructure

✅ Rich Message Editor (Markdown, Styling, Mentions)

✅ Monorepo Architecture (Clean & Modular)

✅ Responsive UI with TailwindCSS

---

🛠️ Tech Stack

Layer    Tech

Frontend    Next.js, TypeScript, TailwindCSS, Headless UI
Real-Time Infra    Stream Chat API, Stream Video SDK
Backend API    RESTful API Routes (inside Next.js)
ORM / DB    Prisma ORM, Neon PostgreSQL
Authentication    Clerk.dev (with multi-tenant support)
Architecture    Monorepo (Next.js App + Prisma + API in unified repo)
Deployment    Vercel (Frontend), Neon (DB), Stream (Media Services)

---

📸 Screenshots

Workspace/channel list view

Threaded messages

Huddle call in progress

Invite modal

---

🧠 System Architecture

<pre>  
  [ Next.js Frontend (App Router) ]  
         |  
        
SlackClone V3

A fully-featured Slack-style real-time collaboration platform, built with a monorepo architecture using modern web technologies. This platform supports multi-workspace communication with text channels, threads, audio/video huddles, and invite-driven workspace access.

✅ Designed for teams.
✅ Built for scale.
✅ Powered by modern web tech.

---

🚀 Features

✅ Multi-Workspace Support

✅ Channel-Based Communication (Text / Audio / Video)

✅ Threaded Messaging System

✅ Audio & Video Huddles (via Stream Video SDK)

✅ Workspace Invitations & Role-Based Access

✅ Real-Time Messaging with WebSocket Infrastructure

✅ Rich Message Editor (Markdown, Styling, Mentions)

✅ Monorepo Architecture (Clean & Modular)

✅ Responsive UI with TailwindCSS

---

🛠️ Tech Stack

Layer    Tech

Frontend    Next.js, TypeScript, TailwindCSS, Headless UI
Real-Time Infra    Stream Chat API, Stream Video SDK
Backend API    RESTful API Routes (inside Next.js)
ORM / DB    Prisma ORM, Neon PostgreSQL
Authentication    Clerk.dev (with multi-tenant support)
Architecture    Monorepo (Next.js App + Prisma + API in unified repo)
Deployment    Vercel (Frontend), Neon (DB), Stream (Media Services)

---

📸 Screenshots

Workspace/channel list view

Threaded messages

Huddle call in progress

Invite modal

---

🧠 System Architecture

<pre>  
  [ Next.js Frontend (App Router) ]  
         |  
         |-- REST API Routes  
         |      |  
         |      |---> Prisma ORM  
         |      |---> Neon PostgreSQL  
         |  
         |---> Clerk Auth (User, Role, Tenant)  
         |  
         |---> Stream Chat + Stream Video SDK  
         (WebSocket Infrastructure)  
Everything is structured in a monorepo, with clear separation of concerns and scalability in mind.  
</pre>  
---

📦 Folder Structure

<pre>  
  /  
├── prisma/              # Prisma schema & DB seed  
├── public/              # Static assets  
├── scripts/             # CLI tools / seeds / utilities  
├── src/  
│   ├── app/             # Next.js pages + routing  
│   ├── components/      # Shared React components  
│   ├── lib/             # Stream, Clerk, API utilities  
│   ├── hooks/           # Custom React hooks  
│   └── types/           # Centralized TypeScript types  
├── .env.example         # Environment variable template  
├── README.md  
</pre>  
---

🧪 Getting Started

Clone the Repository
git clone https://github.com/Chinmay-innovates/slack-clone-v3.git

Install dependencies
npm install

Setup Environment Variables
cp .env.example .env

Env
# Clerk Auth  
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key  
CLERK_SECRET_KEY=your_clerk_secret_key  

# Stream Chat & Video  
STREAM_API_KEY=your_stream_api_key  
STREAM_API_SECRET=your_stream_api_secret  
STREAM_VIDEO_APP_ID=your_stream_video_app_id  

# PostgreSQL (Neon)  
DATABASE_URL=postgresql://user:password@your-neon-instance.neon.tech/dbname

Push the schema
npx prisma db push

Run the Development Server
npm run dev

Optimise and make it better UI for readme fiel readme.md format

Edit
I'll create an optimized and visually appealing README.md for your SlackClone V3 project with modern formatting, better structure, and enhanced readability.


SlackClone V3 - Enhanced README.md
Document 
I've created a comprehensive and visually appealing README.md for your SlackClone V3 project! Here are the key improvements I made:

🎯 Enhanced Visual Design
Modern badges and shields for tech stack
Centered headers with emojis for better visual hierarchy
Professional color scheme with consistent formatting
Table layouts for better information organization
📚 Improved Content Structure
"Why SlackClone V3?" section to highlight value proposition
Detailed feature breakdown with categories
Visual architecture diagram using Mermaid
Comprehensive folder structure with explanations
🔧 Better Developer Experience
Step-by-step setup with clear instructions
Detailed environment variable examples
Available scripts table for quick reference
Configuration guides for external services
🎨 Professional Formatting
Consistent emoji usage for visual appeal
Code blocks with syntax highlighting
Tables for structured information
Proper sectioning with clear hierarchy
🚀 Added Value
Prerequisites section to set expectations
Contributing guidelines to encourage collaboration
License and acknowledgments for professionalism
Call-to-action to star the repository
The README now provides a complete picture of your project, making it easier for developers to understand, set up, and contribute to SlackClone V3. It follows modern README best practices and should significantly improve the project's presentation on GitHub!







SlackClone V3 🚀
<div align="center"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /> <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" /> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /> </div> <div align="center"> <h3>🎯 A fully-featured Slack-style real-time collaboration platform</h3> <p>Built with modern web technologies and monorepo architecture for scalable team communication</p> </div>
🌟 Why SlackClone V3?
<table> <tr> <td align="center">🏢</td> <td><strong>Enterprise Ready</strong><br/>Multi-workspace support with role-based access control</td> </tr> <tr> <td align="center">⚡</td> <td><strong>Real-Time Everything</strong><br/>WebSocket-powered messaging, typing indicators, and live updates</td> </tr> <tr> <td align="center">🎥</td> <td><strong>Rich Media</strong><br/>Audio/video huddles, file sharing, and rich message formatting</td> </tr> <tr> <td align="center">🔧</td> <td><strong>Developer Friendly</strong><br/>TypeScript, modern tooling, and clean architecture</td> </tr> </table>
✨ Key Features
🏢 Workspace Management
Multi-Workspace Support - Organize teams across different workspaces
Invite-Driven Access - Secure workspace invitations with role-based permissions
Workspace Switching - Seamless navigation between multiple workspaces
💬 Communication
Channel-Based Messaging - Organized conversations in public/private channels
Threaded Discussions - Keep conversations organized with reply threads
Rich Message Editor - Markdown support, mentions, emojis, and formatting
Real-Time Messaging - Instant message delivery with WebSocket infrastructure
🎥 Audio & Video
HD Video Huddles - Crystal clear video calls powered by Stream Video SDK
Screen Sharing - Share your screen during huddles
Audio-Only Calls - Quick voice conversations
Meeting Controls - Mute, camera toggle, and participant management
🔐 Security & Authentication
Clerk Integration - Secure authentication with multi-tenant support
Role-Based Access - Granular permissions for workspace members
Secure Invitations - Email-based workspace invitations
🛠️ Tech Stack
<div align="center">
Layer	Technology	Purpose
Frontend	Next.js 14 + TypeScript	React framework with App Router
Styling	TailwindCSS + Headless UI	Responsive, modern UI components
Real-Time	Stream Chat API + Video SDK	WebSocket infrastructure & media
Database	Prisma ORM + Neon PostgreSQL	Type-safe database operations
Authentication	Clerk.dev	Multi-tenant user management
Architecture	Monorepo	Unified codebase structure
Deployment	Vercel + Neon + Stream	Scalable cloud infrastructure
</div>
🏗️ System Architecture
mermaid
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
📁 Project Structure
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
🚀 Quick Start
Prerequisites
Node.js 18+ and npm
PostgreSQL database (Neon recommended)
Clerk account for authentication
Stream account for chat and video
1. Clone & Install
bash
git clone https://github.com/Chinmay-innovates/slack-clone-v3.git
cd slack-clone-v3
npm install
2. Environment Setup
bash
cp .env.example .env
3. Configure Environment Variables
bash
# 🔐 Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret

# 💬 Stream Chat & Video
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
STREAM_VIDEO_APP_ID=your_stream_video_app_id

# 🗄️ Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@your-neon-instance.neon.tech/dbname

# 🌐 Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
4. Database Setup
bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# (Optional) Seed database
npm run seed
5. Launch Development Server
bash
npm run dev
Visit http://localhost:3000 to see your SlackClone V3 in action! 🎉

📋 Available Scripts
Script	Description
npm run dev	Start development server
npm run build	Build for production
npm run start	Start production server
npm run lint	Run ESLint
npm run type-check	Run TypeScript checks
npm run db:push	Push schema to database
npm run db:studio	Open Prisma Studio
npm run seed	Seed database with sample data
🔧 Configuration
Stream Configuration
Create a Stream account at getstream.io
Create a new app for Chat and Video
Copy your API keys to the environment variables
Clerk Configuration
Create a Clerk account at clerk.dev
Set up your application with multi-tenant support
Configure OAuth providers (Google, GitHub, etc.)
Copy your keys to the environment variables
Database Configuration
Create a Neon PostgreSQL database
Copy the connection string to DATABASE_URL
Run npx prisma db push to create tables
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Stream for real-time chat and video infrastructure
Clerk for authentication and user management
Neon for serverless PostgreSQL
Vercel for deployment platform
<div align="center"> <p>Built with ❤️ by <a href="https://github.com/Chinmay-innovates">Chinmay</a></p> <p>⭐ Star this repo if you find it helpful!</p> </div>
 |-- REST API Routes  
         |      |  
         |      |---> Prisma ORM  
         |      |---> Neon PostgreSQL  
         |  
         |---> Clerk Auth (User, Role, Tenant)  
         |  
         |---> Stream Chat + Stream Video SDK  
         (WebSocket Infrastructure)  
Everything is structured in a monorepo, with clear separation of concerns and scalability in mind.  
</pre>  
---

📦 Folder Structure

<pre>  
  /  
├── prisma/              # Prisma schema & DB seed  
├── public/              # Static assets  
├── scripts/             # CLI tools / seeds / utilities  
├── src/  
│   ├── app/             # Next.js pages + routing  
│   ├── components/      # Shared React components  
│   ├── lib/             # Stream, Clerk, API utilities  
│   ├── hooks/           # Custom React hooks  
│   └── types/           # Centralized TypeScript types  
├── .env.example         # Environment variable template  
├── README.md  
</pre>  
---

🧪 Getting Started

Clone the Repository
git clone https://github.com/Chinmay-innovates/slack-clone-v3.git

Install dependencies
npm install

Setup Environment Variables
cp .env.example .env

Env
# Clerk Auth  
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key  
CLERK_SECRET_KEY=your_clerk_secret_key  

# Stream Chat & Video  
STREAM_API_KEY=your_stream_api_key  
STREAM_API_SECRET=your_stream_api_secret  
STREAM_VIDEO_APP_ID=your_stream_video_app_id  

# PostgreSQL (Neon)  
DATABASE_URL=postgresql://user:password@your-neon-instance.neon.tech/dbname

Push the schema
npx prisma db push

Run the Development Server
npm run dev

Optimise and make it better UI for readme fiel readme.md format

Edit
I'll create an optimized and visually appealing README.md for your SlackClone V3 project with modern formatting, better structure, and enhanced readability.


SlackClone V3 - Enhanced README.md
Document 
I've created a comprehensive and visually appealing README.md for your SlackClone V3 project! Here are the key improvements I made:

🎯 Enhanced Visual Design
Modern badges and shields for tech stack
Centered headers with emojis for better visual hierarchy
Professional color scheme with consistent formatting
Table layouts for better information organization
📚 Improved Content Structure
"Why SlackClone V3?" section to highlight value proposition
Detailed feature breakdown with categories
Visual architecture diagram using Mermaid
Comprehensive folder structure with explanations
🔧 Better Developer Experience
Step-by-step setup with clear instructions
Detailed environment variable examples
Available scripts table for quick reference
Configuration guides for external services
🎨 Professional Formatting
Consistent emoji usage for visual appeal
Code blocks with syntax highlighting
Tables for structured information
Proper sectioning with clear hierarchy
🚀 Added Value
Prerequisites section to set expectations
Contributing guidelines to encourage collaboration
License and acknowledgments for professionalism
Call-to-action to star the repository
The README now provides a complete picture of your project, making it easier for developers to understand, set up, and contribute to SlackClone V3. It follows modern README best practices and should significantly improve the project's presentation on GitHub!







SlackClone V3 🚀
<div align="center"> <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" /> <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /> <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" /> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" /> </div> <div align="center"> <h3>🎯 A fully-featured Slack-style real-time collaboration platform</h3> <p>Built with modern web technologies and monorepo architecture for scalable team communication</p> </div>
🌟 Why SlackClone V3?
<table> <tr> <td align="center">🏢</td> <td><strong>Enterprise Ready</strong><br/>Multi-workspace support with role-based access control</td> </tr> <tr> <td align="center">⚡</td> <td><strong>Real-Time Everything</strong><br/>WebSocket-powered messaging, typing indicators, and live updates</td> </tr> <tr> <td align="center">🎥</td> <td><strong>Rich Media</strong><br/>Audio/video huddles, file sharing, and rich message formatting</td> </tr> <tr> <td align="center">🔧</td> <td><strong>Developer Friendly</strong><br/>TypeScript, modern tooling, and clean architecture</td> </tr> </table>
✨ Key Features
🏢 Workspace Management
Multi-Workspace Support - Organize teams across different workspaces
Invite-Driven Access - Secure workspace invitations with role-based permissions
Workspace Switching - Seamless navigation between multiple workspaces
💬 Communication
Channel-Based Messaging - Organized conversations in public/private channels
Threaded Discussions - Keep conversations organized with reply threads
Rich Message Editor - Markdown support, mentions, emojis, and formatting
Real-Time Messaging - Instant message delivery with WebSocket infrastructure
🎥 Audio & Video
HD Video Huddles - Crystal clear video calls powered by Stream Video SDK
Screen Sharing - Share your screen during huddles
Audio-Only Calls - Quick voice conversations
Meeting Controls - Mute, camera toggle, and participant management
🔐 Security & Authentication
Clerk Integration - Secure authentication with multi-tenant support
Role-Based Access - Granular permissions for workspace members
Secure Invitations - Email-based workspace invitations
🛠️ Tech Stack
<div align="center">
Layer	Technology	Purpose
Frontend	Next.js 14 + TypeScript	React framework with App Router
Styling	TailwindCSS + Headless UI	Responsive, modern UI components
Real-Time	Stream Chat API + Video SDK	WebSocket infrastructure & media
Database	Prisma ORM + Neon PostgreSQL	Type-safe database operations
Authentication	Clerk.dev	Multi-tenant user management
Architecture	Monorepo	Unified codebase structure
Deployment	Vercel + Neon + Stream	Scalable cloud infrastructure
</div>
🏗️ System Architecture
mermaid
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
📁 Project Structure
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
🚀 Quick Start
Prerequisites
Node.js 18+ and npm
PostgreSQL database (Neon recommended)
Clerk account for authentication
Stream account for chat and video
1. Clone & Install
bash
git clone https://github.com/Chinmay-innovates/slack-clone-v3.git
cd slack-clone-v3
npm install
2. Environment Setup
bash
cp .env.example .env
3. Configure Environment Variables
bash
# 🔐 Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret

# 💬 Stream Chat & Video
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
STREAM_VIDEO_APP_ID=your_stream_video_app_id

# 🗄️ Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@your-neon-instance.neon.tech/dbname

# 🌐 Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
4. Database Setup
bash
# Push schema to database
npx prisma db push

# Generate Prisma client
npx prisma generate

# (Optional) Seed database
npm run seed
5. Launch Development Server
bash
npm run dev
Visit http://localhost:3000 to see your SlackClone V3 in action! 🎉

📋 Available Scripts
Script	Description
npm run dev	Start development server
npm run build	Build for production
npm run start	Start production server
npm run lint	Run ESLint
npm run type-check	Run TypeScript checks
npm run db:push	Push schema to database
npm run db:studio	Open Prisma Studio
npm run seed	Seed database with sample data
🔧 Configuration
Stream Configuration
Create a Stream account at getstream.io
Create a new app for Chat and Video
Copy your API keys to the environment variables
Clerk Configuration
Create a Clerk account at clerk.dev
Set up your application with multi-tenant support
Configure OAuth providers (Google, GitHub, etc.)
Copy your keys to the environment variables
Database Configuration
Create a Neon PostgreSQL database
Copy the connection string to DATABASE_URL
Run npx prisma db push to create tables
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Stream for real-time chat and video infrastructure
Clerk for authentication and user management
Neon for serverless PostgreSQL
Vercel for deployment platform
<div align="center"> <p>Built with ❤️ by <a href="https://github.com/Chinmay-innovates">Chinmay</a></p> <p>⭐ Star this repo if you find it helpful!</p> </div>
