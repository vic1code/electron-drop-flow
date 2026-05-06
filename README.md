# ElectroFlow - Electronic Components Dropshipping Platform

A modern, scalable web platform for B2C and small B2B buyers in the electronics industry.

## Features

- **Product Catalog**: Advanced filtering by category, brand, and specifications.
- **Dropshipping Logic**: Order routing abstraction and real-time stock syncing (mocked).
- **Cart & Checkout**: Persistent cart with multi-currency support and secure checkout flow.
- **Responsive Design**: Optimized for mobile and desktop sourcing.
- **Admin Dashboard**: (In development) Sales analytics and inventory monitoring.
- **SEO Optimized**: Built with performance in mind using Vite and React.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion
- **UI Components**: Radix UI (via Shadcn), Lucide Icons
- **State Management**: React Hooks (Custom useCart)
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js (v18+)
- Bun or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Start the development server:
   ```bash
   bun run dev
   ```

## Project Structure

- `src/components`: UI components (Layout, Home, Products)
- `src/hooks`: Custom React hooks (useCart)
- `src/lib`: Mock data and utility functions
- `src/types`: TypeScript interfaces
- `src/App.tsx`: Main application logic and routing

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

- `VITE_STRIPE_PUBLIC_KEY`: For payment processing
- `VITE_SUPPLIER_API_KEY`: For real-time stock syncing