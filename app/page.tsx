
"use client";

declare global {
  interface Window {
    Outseta?: any;
  }
}

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Cpu,
  Camera,
  BarChart3,
  CheckCircle,
  XCircle,
  Lock,
  TrendingUp,
  TrendingDown,
  FileSpreadsheet,
  GraduationCap,
  CreditCard,
  Calculator,
  ClipboardCheck,
  Receipt,
  Brain,
  MessageSquare,
  BarChart4,
  ShieldCheck,
  Crown,
  Rocket,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Page() {
  return (
    <main className="bg-gradient-to-b from-black via-[#0b0603] to-[#120a06] text-goldSoft overflow-hidden font-sans">
      <Navbar />
      <Hero />
      <Comparison />
      <WhatsInside />
      <VaultMarket />
      <AiTools />
      <SpreadsheetVault />
      <ResellAcademy />
      <AffiliateSystem /> 
      <PricingPlans />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ---------------- NAVBAR ---------------- */
function Navbar() {
  const links = ["Features", "Pricing", "Contact"];
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.95]);
  const height = useTransform(scrollY, [0, 100], [96, 72]);

  // ✅ Add a login handler that opens Outseta modal
  const handleLogin = () => {
    if (typeof window !== "undefined" && window.Outseta) {
      window.Outseta.showLogin();
    } else {
      alert("Login system loading… please try again in a moment.");
    }
  };

  return (
    <motion.header
      style={{ backgroundColor: `rgba(0,0,0,${bgOpacity})`, height }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 backdrop-blur-2xl border-b border-gold/20 shadow-[0_0_35px_rgba(209,181,115,0.15)]"
    >
      <nav className="max-w-[95rem] mx-auto flex items-center justify-between px-14 h-full">
        {/* Large Centered Logo */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="flex items-center"
        >
          <Image
            src="/images/logo.png"
            alt="Vault Logo"
            width={92}
            height={92}
            className="drop-shadow-[0_0_40px_rgba(209,181,115,0.9)]"
          />
        </motion.div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-14 text-[1.2rem] font-medium tracking-wide">
          {links.map((link) => (
            <li key={link} className="relative group">
              <a
                href={`#${link.toLowerCase()}`}
                className="text-gold/80 hover:text-gold transition-all duration-300"
              >
                {link}
              </a>
              <span className="absolute left-1/2 -bottom-2 w-0 h-[2px] bg-gradient-to-r from-[#b8944a] to-[#f6e6b2] group-hover:w-full group-hover:left-0 transition-all duration-500 ease-out rounded-full" />
            </li>
          ))}

          {/* 🟩 Login Button integrated with Outseta */}
          <li>
            <button
              onClick={handleLogin}
              className="text-gold/80 hover:text-gold font-semibold transition-all duration-300"
            >
              Login
            </button>
          </li>
        </ul>

        {/* Unlock Button */}
        <a
          href="#unlock"
          className="ml-8 rounded-2xl border border-gold bg-gradient-to-b from-[#d1b57340] to-[#d1b57320] px-8 py-3 text-lg text-gold font-semibold tracking-wide shadow-[inset_0_0_8px_rgba(209,181,115,0.25),0_0_25px_rgba(209,181,115,0.3)] hover:shadow-[inset_0_0_15px_rgba(209,181,115,0.4),0_0_55px_rgba(209,181,115,0.55)] transition-all duration-500"
        >
          Unlock
        </a>
      </nav>
    </motion.header>
  );
}

/* ---------------- HERO ---------------- */
type GlowButtonProps = {
  href: string;
  text: string;
  subtle?: boolean;
};

function GlowButton({ href, text, subtle = false }: GlowButtonProps) {
  return (
    <a
      href={href}
      className={`px-10 py-4 rounded-2xl border ${
        subtle
          ? "border-gold/40 text-gold hover:bg-gold/10"
          : "bg-gold/15 border-gold text-gold hover:bg-gold/25"
      } hover:shadow-[0_0_50px_rgba(209,181,115,0.4)] transition-all duration-500`}
    >
      {text}
    </a>
  );
}

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center h-[90vh] min-h-[600px] text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0b0603] via-black to-black" />

      <motion.div
        animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#d1b57325] via-transparent to-transparent blur-[200px]"
      />

      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-[#d1b573] rounded-full opacity-20"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ y: ["0%", "-30%"], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Hero Text */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-[Cinzel] text-7xl md:text-8xl font-bold bg-gradient-to-b from-[#f6e6b2] via-[#d1b573] to-[#b8944a] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(209,181,115,0.35)] tracking-wide"
      >
        The Future of Reselling.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="mt-8 text-gold/80 text-xl max-w-2xl mx-auto font-sans"
      >
        One platform that powers your listings, analytics, and growth — all in one
        Vault.
      </motion.p>

      <div className="mt-10 flex gap-5">
        <GlowButton href="#unlock" text="Unlock The Vault" />
        <GlowButton href="#demo" text="See The Vault In Action" subtle />
      </div>

      {/* Trusted Logos */}
      <div className="mt-14 flex flex-col items-center gap-3 text-gold/70 text-sm uppercase">
        <span>Trusted by sellers on</span>
        <div className="flex gap-10 items-center">
          <Image src="/images/ebay.png" alt="eBay" width={80} height={40} />
          <Image src="/images/depop.png" alt="Depop" width={70} height={40} />
          <Image src="/images/whatnot.png" alt="Whatnot" width={80} height={40} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPARISON ---------------- */
function Comparison() {
  const features = [
    { name: "AI Listing Optimization", vault: true, others: false },
    { name: "Photo Enhancement Tools", vault: true, others: false },
    { name: "Live Market Analytics", vault: true, others: false },
    { name: "Spreadsheet Templates (50+)", vault: true, others: false },
    { name: "Data Upload & Auto Analysis", vault: true, others: false },
    { name: "Community Updates", vault: true, others: true },
  ];

  return (
    <motion.section
      id="pricing"
      className="py-28 max-w-6xl mx-auto px-6 text-center"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl font-[Cinzel] text-goldSoft mb-6">
        Why Sellers Choose The Vault
      </h2>
      <p className="text-gold/80 mb-16 text-lg max-w-2xl mx-auto">
        The Vault automates everything — while others just give you tools.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((row, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="border border-gold/20 rounded-2xl bg-black/40 backdrop-blur-lg p-6 shadow-[0_0_50px_rgba(209,181,115,0.1)] text-left flex justify-between items-center"
          >
            <span className="text-lg">{row.name}</span>
            <div className="flex gap-6">
              {row.vault ? (
                <CheckCircle className="text-gold w-7 h-7" />
              ) : (
                <XCircle className="text-red-500 w-7 h-7" />
              )}
              {row.others ? (
                <CheckCircle className="text-gold/60 w-7 h-7" />
              ) : (
                <XCircle className="text-red-500/70 w-7 h-7" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ---------------- WHAT’S INSIDE ---------------- */
function WhatsInside() {
  const items = [
    {
      icon: <Cpu className="w-14 h-14 text-gold mb-5" />,
      title: "AI Tools",
      desc: "Automate listings, analyze data, and boost sales with powerful AI that works for you.",
      href: "#affiliate",
    },
    {
      icon: <FileSpreadsheet className="w-14 h-14 text-gold mb-5" />,
      title: "Spreadsheet Vault",
      desc: "Access 50+ resale business templates — from profit trackers to sourcing spreadsheets.",
      href: "#spreadsheets",
    },
    {
      icon: <GraduationCap className="w-14 h-14 text-gold mb-5" />,
      title: "Resell Academy",
      desc: "Master buyer psychology, negotiation, and real seller case studies in The Vault Academy.",
      href: "#academy",
    },
    {
      icon: <CreditCard className="w-14 h-14 text-gold mb-5" />,
      title: "Pricing & Access",
      desc: "Choose your tier — Starter, Pro, or Elite. Each unlocks deeper access to The Vault ecosystem.",
      href: "#plans",
    },
  ];

  return (
    <motion.section
      id="inside"
      className="py-28 bg-gradient-to-b from-black via-[#0b0603] to-black text-center px-6 border-y border-gold/20"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-5xl font-[Cinzel] text-goldSoft mb-8">
        What’s Inside The Vault
      </h2>
      <p className="text-gold/80 text-lg max-w-2xl mx-auto mb-16">
        Explore every layer of the Vault — built to automate, educate, and elevate
        your reselling business.
      </p>

      <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {items.map((i, index) => (
          <motion.a
            key={index}
            href={i.href}
            whileHover={{ scale: 1.05, y: -6 }}
            className="group border border-gold/20 rounded-2xl bg-black/40 p-10 backdrop-blur-md shadow-[0_0_35px_rgba(209,181,115,0.1)] hover:shadow-[0_0_60px_rgba(209,181,115,0.25)] transition-all duration-500 block"
          >
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                {i.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold text-gold mt-2 group-hover:text-[#f6e6b2] transition-all duration-300">
                {i.title}
              </h3>
              <p className="text-gold/70 text-base mt-3 leading-relaxed max-w-xs">
                {i.desc}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.section>
  );
}

/* ---------------- VAULT MARKET ---------------- */
function VaultMarket() {
  const data = [
    { label: "Nike Vintage", change: "+3.2%" },
    { label: "Y2K Denim", change: "+1.8%" },
    { label: "Carhartt Jackets", change: "-0.9%" },
    { label: "Harley Tees", change: "+4.5%" },
    { label: "Retro Adidas", change: "+2.3%" },
    { label: "True Religion", change: "+5.0%" },
    { label: "Vintage Levi’s", change: "-1.2%" },
    { label: "Streetwear Mix", change: "+3.9%" },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl font-[Cinzel] text-goldSoft mb-6">
          Live Resale Index
        </h2>
        <p className="text-gold/80 mb-10 max-w-2xl mx-auto">
          Track trending resale categories like it’s Wall Street.
        </p>
        <div className="relative overflow-hidden border border-gold/20 rounded-2xl bg-black/40 backdrop-blur-md py-6 shadow-[0_0_50px_rgba(209,181,115,0.1)]">
          <motion.div
            className="flex gap-12 whitespace-nowrap px-10"
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
          >
            {[...data, ...data].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 text-xl font-medium text-gold/90 hover:text-gold transition-all duration-300"
              >
                <span>{item.label}</span>
                <span
                  className={`${
                    item.change.startsWith("+")
                      ? "text-[#f6e6b2]"
                      : "text-red-400"
                  } flex items-center gap-1`}
                >
                  {item.change}
                  {item.change.startsWith("+") ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </span>
              </div>
            ))}
          </motion.div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-black opacity-60" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- AI TOOLS ---------------- */
function AiTools() {
  const vaultHeading =
    "font-[Cinzel] text-5xl md:text-6xl font-bold bg-gradient-to-b from-[#f6e6b2] via-[#d1b573] to-[#b8944a] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(209,181,115,0.35)] tracking-wide";

  const tools = [
    {
      icon: <Cpu className="w-12 h-12 text-gold mb-5" />,
      title: "AI Listing Coach",
      text: "Get optimized titles, descriptions, and prices instantly.",
    },
    {
      icon: <Camera className="w-12 h-12 text-gold mb-5" />,
      title: "AI Photo Enhancer",
      text: "Turn dull listing photos into professional, eye-catching shots.",
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-gold mb-5" />,
      title: "Vault Vision",
      text: "Upload spreadsheets and get instant data-driven analysis.",
    },
  ];

  return (
    <motion.section
      id="affiliate"
      className="py-28 max-w-6xl mx-auto px-6 text-center bg-gradient-to-b from-[#0b0603] to-black"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
    >
      <h2 className={`${vaultHeading} mb-6`}>
        AI Tools That Do the Work for You
      </h2>

      <p className="text-gold/80 mb-16 max-w-2xl mx-auto text-lg font-sans">
        Automate listings, analyze trends, and scale your business effortlessly.
      </p>

      <div className="grid md:grid-cols-3 gap-10">
        {tools.map((t) => (
          <motion.div
            key={t.title}
            whileHover={{ scale: 1.05, y: -5 }}
            className="border border-gold/20 rounded-2xl p-10 bg-black/30 hover:bg-black/50 backdrop-blur-sm shadow-[0_0_40px_rgba(209,181,115,0.1)] transition-all duration-500 flex flex-col items-center text-center"
          >
            <div className="flex justify-center">{t.icon}</div>
            <h3 className="text-2xl font-semibold text-gold mt-3">
              {t.title}
            </h3>
            <p className="text-gold/70 mt-2 text-base leading-relaxed font-sans">
              {t.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ---------------- SPREADSHEET VAULT ---------------- */
function SpreadsheetVault() {
  const vaultHeading =
    "font-[Cinzel] text-5xl md:text-6xl font-bold bg-gradient-to-b from-[#f6e6b2] via-[#d1b573] to-[#b8944a] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(209,181,115,0.35)] tracking-wide";

  const sheets = [
    {
      icon: <FileSpreadsheet className="w-12 h-12 text-gold mb-5" />,
      title: "Expense Tracker",
      desc: "Track profit, COGS, and platform fees automatically.",
    },
    {
      icon: <ClipboardCheck className="w-12 h-12 text-gold mb-5" />,
      title: "Inventory Log",
      desc: "Keep every SKU organized with automated value formulas.",
    },
    {
      icon: <Calculator className="w-12 h-12 text-gold mb-5" />,
      title: "Pricing Calculator",
      desc: "Price smarter with built-in ROI, margin, and listing optimizer logic.",
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-gold mb-5" />,
      title: "Affiliate Tracker",
      desc: "Track affiliate commissions and payouts in real time.",
    },
    {
      icon: <Receipt className="w-12 h-12 text-gold mb-5" />,
      title: "Tax Write-Off Log",
      desc: "Never miss a deductible business expense again.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-gold mb-5" />,
      title: "Weekly Trend Tracker",
      desc: "Visualize category performance across marketplaces instantly.",
    },
  ];

  return (
    <motion.section
      id="spreadsheets"
      className="py-28 bg-gradient-to-b from-[#0b0603] to-black text-center px-6"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
    >
      <h2 className={`${vaultHeading} mb-6`}>The Spreadsheet Vault</h2>

      <p className="text-gold/80 text-lg font-sans max-w-2xl mx-auto mb-16">
        50+ pre-built templates crafted for resellers — editable, automated, and
        AI-ready for your business.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sheets.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-8 rounded-2xl border border-gold/20 bg-black/40 backdrop-blur-md shadow-[0_0_35px_rgba(209,181,115,0.1)] hover:shadow-[0_0_60px_rgba(209,181,115,0.25)] transition-all duration-500"
          >
            <div className="flex justify-center">{s.icon}</div>
            <h3 className="text-2xl font-semibold text-gold mt-2">
              {s.title}
            </h3>
            <p className="text-gold/70 mt-3 font-sans">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ---------------- RESELL ACADEMY ---------------- */
function ResellAcademy() {
  const vaultHeading =
    "font-[Cinzel] text-5xl md:text-6xl font-bold bg-gradient-to-b from-[#f6e6b2] via-[#d1b573] to-[#b8944a] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(209,181,115,0.35)] tracking-wide";

  const lessons = [
    {
      icon: <Brain className="w-12 h-12 text-gold mb-5" />,
      title: "Buyer Psychology & Pricing Hacks",
      desc: "Learn what triggers buyers to pay more — and how to structure irresistible listings that convert.",
    },
    {
      icon: <MessageSquare className="w-12 h-12 text-gold mb-5" />,
      title: "Negotiation & DM Scripts",
      desc: "Close more sales with proven response frameworks and psychological sales messaging.",
    },
    {
      icon: <BarChart4 className="w-12 h-12 text-gold mb-5" />,
      title: "Vault Case Studies",
      desc: "Analyze real seller data, see what works, and model strategies that generate thousands in profit.",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-gold mb-5" />,
      title: "Fake Check & Scam Prevention",
      desc: "Learn how to spot counterfeit payments, protect your shop, and stay safe online.",
    },
  ];

  return (
    <motion.section
      id="academy"
      className="py-28 bg-gradient-to-b from-black to-[#0b0603] text-center px-6"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
    >
      <h2 className={`${vaultHeading} mb-6`}>The Resell Academy</h2>

      <p className="text-gold/80 text-lg font-sans max-w-2xl mx-auto mb-16">
        A masterclass library built for vintage and streetwear sellers — designed to
        teach you the psychology, systems, and secrets behind consistent resale growth.
      </p>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {lessons.map((l, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-10 rounded-2xl border border-gold/20 bg-black/40 backdrop-blur-md shadow-[0_0_35px_rgba(209,181,115,0.15)] hover:shadow-[0_0_70px_rgba(209,181,115,0.3)] transition-all duration-500 text-left"
          >
            {l.icon}
            <h3 className="text-2xl font-semibold text-gold mt-2">
              {l.title}
            </h3>
            <p className="text-gold/70 mt-3 font-sans">{l.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
/* ---------------- AFFILIATE FRANCHISE SYSTEM ---------------- */
function AffiliateSystem() {
  const vaultHeading =
    "font-[Cinzel] text-5xl md:text-6xl font-bold bg-gradient-to-b from-[#f6e6b2] via-[#d1b573] to-[#b8944a] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(209,181,115,0.35)] tracking-wide";

  const tiers = [
    { subs: 10, earnings: "$100/mo" },
    { subs: 100, earnings: "$1,000/mo" },
    { subs: 500, earnings: "$5,000/mo" },
    { subs: 1_000, earnings: "$10,000/mo" },
  ];

  return (
    <motion.section
      id="affiliate-system"
      className="py-28 bg-gradient-to-b from-black via-[#0b0603] to-black text-center px-6 border-t border-b border-gold/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
    >
      <h2 className={`${vaultHeading} mb-6`}>Your Own Vault Franchise</h2>

      <p className="text-gold/80 text-lg max-w-3xl mx-auto mb-14 leading-relaxed font-sans">
        Launch your own <span className="text-gold font-semibold">Vault franchise</span> and earn{" "}
        <span className="text-[#f6e6b2] font-semibold">40% lifetime commission</span> on every
        subscriber you refer — recurring each month through{" "}
        <span className="font-semibold text-gold">Rewardful + Stripe</span>.
      </p>

      {/* Visual Earnings Examples */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-8 mb-14">
        {tiers.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            className="border border-gold/20 bg-black/40 rounded-2xl p-8 backdrop-blur-md shadow-[0_0_35px_rgba(209,181,115,0.15)] hover:shadow-[0_0_60px_rgba(209,181,115,0.3)] transition-all duration-500"
          >
            <h3 className="text-3xl font-bold text-gold mb-2">{t.subs}</h3>
            <p className="text-gold/70 text-sm uppercase mb-3 tracking-wider">
              Referrals
            </p>
            <p className="text-2xl text-[#f6e6b2] font-semibold">{t.earnings}</p>
            <p className="text-gold/60 text-xs mt-1">Example monthly income*</p>
          </motion.div>
        ))}
      </div>

      {/* CTA + Legal line */}
      <motion.a
        href="/affiliate"  // ✅ updated link
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 0 55px rgba(209,181,115,0.4), inset 0 0 10px rgba(209,181,115,0.25)",
        }}
        whileTap={{ scale: 0.97 }}
        className="inline-block px-14 py-5 rounded-2xl border border-gold bg-gold/20 text-gold text-xl font-semibold tracking-wide shadow-[0_0_30px_rgba(209,181,115,0.25)] hover:bg-gold/30 hover:text-[#f6e6b2] transition-all duration-500"
      >
        Start Your Franchise
      </motion.a>

      {/* Disclaimer + Terms */}
      <p className="text-gold/60 mt-8 text-sm font-sans max-w-2xl mx-auto">
        *Earnings vary by effort and referral volume. Results are not guaranteed.  
        See full{" "}
        <a href="/affiliate" className="underline text-gold hover:text-[#f6e6b2]">
          Affiliate Terms & Services
        </a>{" "}
        for details.  
        Affiliate tracking and payouts powered by Rewardful + Stripe.
      </p>
    </motion.section>
  );
}


/* ---------------- PRICING ---------------- */
function PricingPlans() {
  const vaultHeading =
    "font-[Cinzel] text-4xl md:text-5xl font-bold bg-gradient-to-b from-[#f6e6b2] via-[#d1b573] to-[#b8944a] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(209,181,115,0.25)] tracking-wide";

  const plans = [
    {
      name: "Starter Vault",
      icon: <Lock className="w-8 h-8 text-gold mb-3" />,
      price: "$10/mo",
      desc: [
        "Spreadsheet Vault",
        "12 Hour Vault Index",
        "Access To GPTs via OpenAI",
        "Weekly Trends",
        "Community Access",
        "All Spreadsheets + Modules",
      ],
      highlight: false,
    },
    {
      name: "Pro Vault",
      icon: <Crown className="w-8 h-8 text-gold mb-3" />,
      price: "$25/mo",
      desc: [
        "Everything in Starter",
        "All AI Tools",
        "12-Hour Market Index",
        "Priority Support",
      ],
      highlight: true,
      ribbon: "Most Popular",
    },
    {
      name: "Elite Vault",
      icon: <Rocket className="w-8 h-8 text-gold mb-3" />,
      price: "$99/mo",
      desc: [
        "1-on-1 Mentorship",
        "Beta Access",
        "Direct Data Feeds",
        "Monthly Calls",
      ],
      highlight: false,
      ribbon: "Exclusive",
    },
  ];

  return (
    <motion.section
      id="plans"
      className="relative py-24 bg-gradient-to-b from-black to-[#0b0603]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className={`${vaultHeading} text-center mb-6`}>
        Choose Your Vault Access
      </h2>
      <p className="text-gold/80 text-center mb-14 text-base font-sans max-w-xl mx-auto">
        Every reseller’s path to mastery starts here — select your access level and
        unlock your next stage of growth.
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6 relative z-10">
        {plans.map((p) => (
          <motion.div
            key={p.name}
            whileHover={{ scale: 1.04, y: -4 }}
            transition={{ type: "spring", stiffness: 120 }}
            className={`relative border rounded-2xl p-8 text-center backdrop-blur-md transition-all duration-400 
              ${
                p.highlight
                  ? "border-gold bg-gradient-to-b from-[#d1b57315] to-[#d1b57308] shadow-[0_0_45px_rgba(209,181,115,0.25)]"
                  : "border-gold/20 bg-black/40 shadow-[0_0_25px_rgba(209,181,115,0.15)]"
              }`}
          >
            <div className="absolute top-4 right-4 bg-gold/20 text-gold text-[10px] font-semibold px-3 py-0.5 rounded-full uppercase tracking-wide">
              {p.ribbon}
            </div>

            <div className="flex justify-center mb-2">{p.icon}</div>

            <h3
              className={`text-xl font-semibold ${
                p.highlight ? "text-gold" : "text-gold/80"
              }`}
            >
              {p.name}
            </h3>

            <p className="text-3xl text-goldSoft mt-3 font-bold">{p.price}</p>

            <ul className="mt-5 text-gold/70 space-y-2 font-sans text-sm">
              {p.desc.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{
                boxShadow:
                  "0 0 25px rgba(209,181,115,0.4), inset 0 0 8px rgba(209,181,115,0.2)",
              }}
              className={`mt-8 px-7 py-2.5 rounded-lg border text-sm font-semibold tracking-wide transition-all duration-400 ${
                p.highlight
                  ? "bg-gold text-black border-gold hover:bg-[#f6e6b2]"
                  : "border-gold/40 text-gold hover:bg-gold/15"
              }`}
            >
              {p.highlight ? "Unlock Pro Access" : "Join Now"}
            </motion.button>

            <p className="text-[11px] text-gold/60 mt-3 font-sans">
              Cancel anytime · Secure via Lemon Squeezy
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  const vaultHeading =
    "font-[Cinzel] text-5xl md:text-6xl font-bold bg-gradient-to-b from-[#f6e6b2] via-[#d1b573] to-[#b8944a] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(209,181,115,0.35)] tracking-wide";

  return (
    <motion.section
      id="unlock"
      className="relative py-36 text-center bg-gradient-to-b from-black via-[#0b0603] to-black overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        animate={{
          opacity: [0.4, 0.6, 0.4],
          scale: [1, 1.05, 1],
        }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-[#d1b57330] via-transparent to-transparent blur-[180px]"
      />

      <h2 className={`${vaultHeading} mb-6`}>
        Ready to Unlock The Vault?
      </h2>

      <p className="text-gold/80 text-lg font-sans max-w-2xl mx-auto mb-14 leading-relaxed">
        Join thousands of resellers using The Vault to automate, scale, and grow
        their resale business — all in one place.
      </p>

      <motion.a
        href="#plans"
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 0 80px rgba(209,181,115,0.4), inset 0 0 15px rgba(209,181,115,0.25)",
        }}
        whileTap={{ scale: 0.97 }}
        className="inline-block px-16 py-6 rounded-2xl border border-gold bg-gold/20 text-gold text-2xl font-semibold tracking-wide shadow-[0_0_40px_rgba(209,181,115,0.25)] hover:bg-gold/30 hover:text-[#f6e6b2] transition-all duration-500"
      >
        Unlock The Vault
      </motion.a>

      <p className="text-gold/60 mt-10 text-sm font-sans">
        Cancel Anytime · Secure via Lemon Squeezy
      </p>
    </motion.section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-black py-12 text-center text-gold/70 text-sm">
      <div className="w-1/2 mx-auto h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-6" />
      <p className="mb-2">
        © 2025{" "}
        <span className="text-gold hover:text-[#f6e6b2] transition-all duration-300 cursor-pointer">
          The Vault
        </span>{" "}
        — Built with Supabase · Lemon Squeezy · OpenAI
      </p>
      <p className="space-x-4">
        <a href="#" className="hover:text-gold transition-all">
          Pricing
        </a>
        <a href="#" className="hover:text-gold transition-all">
          Affiliate
        </a>
        <a href="#" className="hover:text-gold transition-all">
          Contact
        </a>
        <a href="#" className="hover:text-gold transition-all">
          Terms
        </a>
        <a href="#" className="hover:text-gold transition-all">
          Login
        </a>
      </p>
    </footer>
  );
}
