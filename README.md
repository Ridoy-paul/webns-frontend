# Ticket Management System

This is a **Ticket Management System** built with **Next.js 14**.

## Features

- ✅ **User Authentication System**: Login, Registration.
- ✅ **Database Seeder**: Preloads Category and Ticket Status data.
- ✅ **Create Ticket System**: Supports file attachment uploads.
- ✅ **Admin Controls**: Only Admin can edit ticket information.
- ✅ **Role-Based Ticket View**:
  - Admin can see all user tickets.
  - Users can only see their own tickets.
- ✅ **Live Chat System**: Ticket-wise real-time chat using WebSockets.
- ✅ **Dashboard Reports**: Simple ticket status overview.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js 18+**
- **npm or yarn**
- **MySQL (or your preferred database)**

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Ridoy-paul/webns-frontend.git
   cd webns-frontend
   ```

2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```env
    NEXT_PUBLIC_BASE_URL="http://localhost:8000/api/v1"
    NEXT_PUBLIC_BROADCASTING_URL="http://localhost:8000"
    NEXT_PUBLIC_STORAGE_URL="http://localhost:8000/"

    SERVER_BASE_URL="http://localhost:8000/api/v1"
    SERVER_STORAGE_URL="http://localhost:8000/"

    NEXT_PUBLIC_REVERB_APP_ID=206883
    NEXT_PUBLIC_REVERB_APP_KEY=fl0ae9t71gdvyeyctrre
    NEXT_PUBLIC_REVERB_APP_SECRET=1gloi8nm4qmqmeefaf7h
    NEXT_PUBLIC_REVERB_HOST="localhost"
    NEXT_PUBLIC_REVERB_PORT=8080
    NEXT_PUBLIC_REVERB_SCHEME=http

    NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```sh
   npm run dev  # or yarn dev
   ```

The app should now be running at **http://localhost:3000** 🚀.

---

## Deployment

For production, build and start the app:
```sh
npm run build
npm start
```