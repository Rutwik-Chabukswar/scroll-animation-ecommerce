# 🍓 Pure Juice – Premium Scroll Animation E-Commerce

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

A world-class, cinematic e-commerce experience featuring high-performance scroll-controlled animations. This project demonstrates the intersection of premium product design and advanced web technologies, inspired by the high-end digital showcases of Apple and Nike.

---

## 🚀 Project Overview

**Pure Juice** is a luxury product showcase for a premium strawberry cold-pressed juice. The core experience is centered around a cinematic "reveal" animation—a strawberry juice bottle opening and exploding with fresh fruit and ice—all synchronized perfectly with the user's scroll.

Built with **Next.js 14** and the **HTML Canvas API**, the site delivers a seamless, high-framerate animation that feels alive. It's not just a landing page; it's a full-stack application featuring user authentication, interactive product sections, and a streamlined order system.

---

## ✨ Key Features

*   **🎬 Cinematic Scroll Animation**: 100+ high-quality frames rendered on HTML Canvas, synchronized with scroll position.
*   **📊 Smart Preloading**: Custom image preloader with a premium loading screen and real-time progress indicator.
*   **💎 Premium UI/UX**: Dark mode aesthetic with glassmorphism, glowing accents, and bespoke typography.
*   **🔐 Full Authentication**: Secure login and signup flow powered by **Supabase Auth**.
*   **🛒 Interactive Store**: Responsive product cards including a quantity-aware order system.
*   **🌌 Particle Universe**: A subtle, drifting background particle system using Canvas for added depth.
*   **✨ Magnetic Interactions**: Custom cursor system and entrance reveals using **Intersection Observer**.
*   **📱 Fully Responsive**: Optimized for high-performance viewing across mobile, tablet, and desktop.

---

## 🛠 Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Core Application Framework & Routing |
| **Language** | TypeScript | Type-safe Development |
| **Styling** | Tailwind CSS 4.0 | Utility-first CSS & Modern Design Tokens|
| **Animation** | HTML Canvas API | Frame-by-frame Scroll Interaction |
| **Database/Auth** | Supabase | User Data & Secure Authentication |
| **Smoothing** | Lenis | Smooth Page Scrolling |
| **Deployment** | Firebase / Vercel | Production Hosting |

---

## 🎞 Scroll Animation Pipeline

The "Hero" animation is the centerpiece of the experience. The pipeline used to achieve this includes:

1.  **AI Generation**: Initial bottle and explosion assets generated using **Google Whisk**.
2.  **Motion Creation**: High-fidelity video sequence generated via **Google Flow (Veo)**.
3.  **Frame Extraction**: Precise frame extraction (100+ frames) performed using **EzGIF**.
4.  **Canvas Rendering**: Custom React hook handles the frame-switching logic based on scroll percentage, painting to a 2D Canvas context for 60FPS performance.

---

## 📂 Project Structure

```bash
├── components/           # Reusable UI Components (Navbar, Cursor, etc.)
│   ├── CustomCursor.tsx  # Smooth requestAnimationFrame cursor
│   ├── HeroCanvas.tsx    # Core Scroll Animation Logic
│   ├── ScrollReveal.tsx  # Intersection Observer Wrapper
│   └── ...
├── public/               # Static Assets (Animation Frames, Images)
├── src/
│   └── app/
│       ├── (auth)/       # Login & Signup Routes
│       ├── order/        # Checkout Experience
│       ├── globals.css   # Theme Definitions & Tailwind Directives
│       ├── layout.tsx    # Root Layout & Global Providers
│       └── MainContent.tsx # Homepage Construction
├── package.json          # Dependencies & Scripts
└── tailwind.config.ts    # Styling Configuration
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/pure-juice-ecommerce.git
cd pure-juice-ecommerce
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🚀 Deployment

The project is optimized for deployment on **Firebase Hosting** or **Vercel**.

1.  **Build the project**:
    ```bash
    npm run build
    ```
2.  **Deploy using Firebase CLI**:
    ```bash
    firebase deploy
    ```

---

## 📸 Screenshots

*(Add your high-resolution screenshots here to showcase the UI)*

> **Hero Reveal Animation** - [Placeholder for Image/GIF]
> **Product Grid** - [Placeholder for Image]
> **Checkout UI** - [Placeholder for Image]

---

## 🗺 Roadmap

*   [ ] Integration of Apple Pay / Stripe payment gateway.
*   [ ] Multi-directional bottle rotation (3D Model integration).
*   [ ] Full dashboard for user order tracking.
*   [ ] Localization for international strawberry lovers.
*   [ ] Advanced WebGL shaders for product transitions.

---

## 👤 Author

**Your Name**
*   GitHub: [@your-username](https://github.com/your-username)
*   LinkedIn: [Your Profile](https://linkedin.com/in/your-profile)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ for the future of freshness.</p>
