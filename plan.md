## Revised Plan: Electronic Components Dropshipping Platform - Phase 2

**Goal:** Implement User Authentication, Order Management, and Refined Checkout Flow.

**1. Authentication Module:**
- Create `src/lib/auth.ts` to manage mock authentication state (JWT-like behavior).
- Create `src/pages/auth/SignIn.tsx` and `src/pages/auth/SignUp.tsx` with shadcn forms.
- Update `src/components/layout/Navbar.tsx` to handle authenticated state and links.

**2. Order Management Module:**
- Update `src/lib/mock-data.ts` to include sample order data.
- Create `src/pages/account/OrderHistory.tsx` to list previous orders.
- Create `src/pages/account/OrderDetail.tsx` for viewing specific order details.

**3. Checkout Flow:**
- Create `src/pages/checkout/Checkout.tsx` as a multi-step component (Shipping Address, Payment Method, Review & Place Order).
- Integrate mock Stripe/PayPal UI elements.
- Implement order placement logic (saving to mock history and clearing cart).

**4. Supplier Abstraction Layer:**
- Create `src/lib/suppliers/index.ts` to define the `SupplierAdapter` interface and a mock `DigiKeyAdapter`.
- Outline the structure for automated order routing.

**5. Routing & Integration:**
- Update `src/App.tsx` to include new routes: `/login`, `/register`, `/checkout`, `/orders`, `/order/:id`.
- Ensure responsive design and accessibility across all new pages.

**Technical Stack Updates:**
- Use `sonner` for notifications.
- Use `framer-motion` for smooth transitions between checkout steps.
- Use `lucide-react` for iconography.