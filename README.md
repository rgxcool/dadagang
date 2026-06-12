# Drink Delivery App

A modern, production-ready beverage delivery web application built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

✨ **Complete Features:**
- 🏠 Modern responsive homepage with product showcase
- 📦 Product catalog with 4 beverages (Fanta, Coca-Cola, Sprite, Pepsi)
- 🛒 Detailed product pages with order form
- 📋 Comprehensive order form with validation
- 📍 GPS-based location capture using browser geolocation
- 🗺️ Automatic Google Maps URL generation
- 📧 Email notifications via Resend API
- ✅ Order success page with tracking info
- 📱 Fully responsive mobile-first design
- ♿ Accessible UI with semantic HTML and ARIA attributes
- 🎨 Modern green-themed design system

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Email Service:** Resend
- **Database:** JSON (can be upgraded to Supabase later)
- **Deployment:** Vercel-ready

## Project Structure

```
drink-delivery-app/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind configuration
│   ├── order/[id]/
│   │   └── page.tsx            # Order details page
│   ├── success/
│   │   └── page.tsx            # Order success page
│   └── api/
│       └── order/
│           └── route.ts         # Order submission API
│
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer with contact info
│   ├── ProductCard.tsx         # Individual product card
│   ├── ProductGrid.tsx         # Product grid layout
│   ├── OrderForm.tsx           # Order form component
│   ├── LoadingButton.tsx       # Button with loading state
│   └── ui/
│       └── button.tsx          # shadcn button component
│
├── lib/
│   ├── email.ts                # Email service (Resend)
│   ├── location.ts             # Geolocation utilities
│   └── utils.ts                # Utility functions
│
├── types/
│   ├── product.ts              # Product interface
│   └── order.ts                # Order data interface
│
├── data/
│   └── products.json           # Product database
│
├── public/
│   └── products/               # Product images
│       ├── fanta.png
│       ├── coke.png
│       ├── sprite.png
│       └── pepsi.png
│
├── package.json
├── tsconfig.json
├── next.config.mjs
├── .env.example
└── .env.local
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation

1. **Clone/Download the project**
   ```bash
   # Using the project files directly
   cd drink-delivery-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file (already included with placeholder):
   ```bash
   # Get your API key from https://resend.com/api-keys
   RESEND_API_KEY=re_your_api_key_here
   
   # Admin email to receive order notifications
   ADMIN_EMAIL=admin@yourdomain.com
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   - Visit `http://localhost:3000`
   - Click "Order Now" on any product
   - Fill out the order form
   - Use "📍 Use Current Location" to capture GPS coordinates
   - Submit the order

## Configuration

### Email Setup (Resend)

The app uses [Resend](https://resend.com) for email notifications:

1. **Create a Resend account** at https://resend.com
2. **Get your API key** from the Resend dashboard
3. **Add to .env.local:**
   ```
   RESEND_API_KEY=re_your_key_here
   ```

When orders are placed, an email is sent to your admin email with:
- Product details and quantity
- Customer information
- Delivery address
- GPS coordinates
- Google Maps link
- Special notes

### Adding Products

Edit `data/products.json`:
```json
{
  "products": [
    {
      "id": 5,
      "name": "Product Name",
      "price": 150,
      "deliveryCharge": 30,
      "stock": 50,
      "image": "/products/product-name.png"
    }
  ]
}
```

Then add the product image to `public/products/`.

## Features in Detail

### 1. Homepage
- Hero section with value propositions
- Product grid with cards
- Product images, prices, stock status
- Direct "Order Now" buttons

### 2. Order Page
- Product details display
- Multi-field form with validation
- Location capture (GPS geolocation)
- Automatic Google Maps URL generation
- Real-time price calculation
- Delivery time selection
- Optional special notes

### 3. Order Form Validation
- Required field validation
- Phone number format validation (10 digits)
- Quantity limits based on stock
- Quantity must be at least 1

### 4. Success Page
- Order confirmation
- Order ID display
- Next steps information
- Contact support link
- Option to order more

## API Routes

### POST /api/order
**Submit an order**

Request body:
```json
{
  "productId": 1,
  "productName": "Fanta 1L",
  "price": 120,
  "deliveryCharge": 30,
  "quantity": 2,
  "customerName": "John Doe",
  "phoneNumber": "9876543210",
  "address": "123 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "deliveryTime": "ASAP",
  "notes": "Extra ice please",
  "totalPrice": 300
}
```

Response:
```json
{
  "success": true,
  "orderId": "ORD-1234567890",
  "message": "Order placed successfully"
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Set Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add `RESEND_API_KEY`
   - Add `ADMIN_EMAIL`

4. **Visit your live site**
   - Your app is now live at `your-project.vercel.app`

### Deploy to Other Platforms

The app can be deployed to any Node.js hosting platform:
- Netlify (with serverless functions)
- AWS (Amplify, EC2)
- Azure (App Service)
- Railway, Render, etc.

**Build command:**
```bash
pnpm build
```

**Start command:**
```bash
pnpm start
```

## Performance Optimizations

- ✅ Server-side rendering for SEO
- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading of product images
- ✅ CSS-in-JS with Tailwind (no runtime overhead)
- ✅ Code splitting with dynamic imports
- ✅ Mobile-first responsive design

## Accessibility

- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Form validation feedback
- ✅ Keyboard navigation support
- ✅ Alt text on all images
- ✅ Proper heading hierarchy
- ✅ Color contrast compliance

## Security

- ✅ Input validation on all forms
- ✅ Server-side validation for API
- ✅ SQL injection prevention (no direct DB yet)
- ✅ CORS protection with Next.js
- ✅ Environment variables for secrets
- ✅ No sensitive data in client code

## Future Enhancements

### Phase 2
- [ ] User authentication (Better Auth)
- [ ] Supabase database integration
- [ ] Order history for users
- [ ] Real-time order tracking
- [ ] WhatsApp notifications
- [ ] Payment integration (Stripe)

### Phase 3
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Analytics and reports
- [ ] Multi-location support
- [ ] Delivery partner management

## Testing

### Manual Testing Checklist

```
Homepage:
- [ ] Load homepage
- [ ] Click "Order Now" on a product
- [ ] Verify navigation to order page

Order Page:
- [ ] Product details display correctly
- [ ] Form validation works (required fields)
- [ ] Location button captures GPS
- [ ] Price calculation updates on quantity change
- [ ] Can submit form

Order Submission:
- [ ] Form submits without errors
- [ ] Redirects to success page
- [ ] Order ID displays
- [ ] Email is sent to admin

Responsive:
- [ ] Test on desktop (1920px)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px)
```

## Troubleshooting

### Images not loading
- Check that images are in `public/products/` directory
- Verify file extensions in `data/products.json`

### Email not sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for failed emails
- Ensure `ADMIN_EMAIL` is a verified domain

### Geolocation not working
- App must run on HTTPS in production (Vercel does this)
- User must allow location access in browser
- Some browsers block geolocation on HTTP

### Form validation issues
- Check browser console for errors
- Verify phone number format (10 digits)
- Check that quantity doesn't exceed stock

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review environment variables in `.env.local`
3. Check browser console for JavaScript errors
4. Review Resend dashboard for email issues

## License

This project is open source and available under the MIT License.

## Credits

Built with:
- [Next.js 16](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Resend](https://resend.com/)

---

**Happy Delivering! 🚀🥤**
