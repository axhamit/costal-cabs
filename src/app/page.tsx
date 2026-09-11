"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Users,
  X,
  Star,
  Shield,
  Clock,
  Wallet,
  ChevronUp,
} from "lucide-react";
import Fleet3DShowcase from "./component/FleetCarousel3D/FleetCarousel3D";

const phoneNumber = "917676184510";

export default function Home() {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travellers, setTravellers] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Shutter state for mobile quick booking
  const [isShutterOpen, setIsShutterOpen] = useState(false);
  const [isShutterManuallyClosed, setIsShutterManuallyClosed] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const today = new Date().toISOString().split("T")[0];

  /* ==========================================
     SCROLL LOGIC FOR SHUTTER
    - Scroll down  → expand (shutter up)
    - Scroll up    → collapse (shutter down)
     - Idle 1.5s    → auto-collapse
  ========================================== */
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Only run on mobile
      if (window.innerWidth >= 768) return;
      if (isShutterManuallyClosed) return;

        // Ignore tiny scrolls (jitter)
        if (Math.abs(currentY - lastScrollY.current) < 8) return;

      if (currentY > lastScrollY.current) {
        // Scrolling down → open shutter
        setIsShutterOpen(true);
      } else if (currentY < lastScrollY.current) {
        // Scrolling up → close shutter
        setIsShutterOpen(false);
      }

      lastScrollY.current = currentY;

      // Auto-close after idle
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsShutterOpen(false);
      }, 2500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = null;
    };
  }, [isShutterManuallyClosed]);

  const getQuote = () => {
    const message = `Hello Coastal Cabs by Gokarna Friends,

I would like to enquire about a cab.

Pickup: Gokarna
Destination: ${destination || "Not specified"}
Travel Date: ${travelDate || "Not specified"}
Travellers: ${travellers || "Not specified"}

Please share the available vehicle options and quotation. Thank you.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const whatsappBooking = (vehicle = "") => {
    const vehicleText = vehicle ? ` (${vehicle})` : "";
    const message = `Hello Coastal Cabs by Gokarna Friends, I would like to book a cab${vehicleText} from Gokarna. Please help me with the available options and pricing.`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-white text-[#073B4C] scroll-smooth">
      
      {/* ==========================================
          HEADER WITH QUICK BOOKING BAR BELOW LOGO
      ========================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-sm">
        
        {/* Row 1: Logo & Navigation */}
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/coastal-cabs-logo.png"
              alt="Coastal Cabs by Gokarna Friends"
              className="h-12 w-auto object-contain"
            />
            <span className="hidden text-lg font-black text-[#073B4C] sm:block">
              Gokarna Friends
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold md:flex">
            <a href="/services" className="transition hover:text-[#0E7490]">Services</a>
            <a href="#destinations" className="transition hover:text-[#0E7490]">Destinations</a>
            <a href="#fleet" className="transition hover:text-[#0E7490]">Fleet</a>
            <a href="#contact" className="transition hover:text-[#0E7490]">Contact</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+917676184510" className="flex items-center gap-2 text-sm font-bold text-[#073B4C] transition hover:text-[#0E7490]">
              <Phone size={18} />
              +91 7676184510
            </a>
            <button
              onClick={() => whatsappBooking()}
              className="flex items-center gap-2 rounded-full bg-[#073B4C] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0E7490]"
            >
              <MessageCircle size={18} />
              Book Now
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 md:hidden"
            aria-label="Open menu"
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Row 2: Quick Booking Bar — DESKTOP ONLY */}
        <div className="hidden md:block border-t border-black/5 bg-[#F0F9FF]">
          <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#073B4C]">Destination</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                  <MapPin size={18} className="text-[#0E7490]" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Murudeshwar, Yana, Goa"
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#073B4C]">Travel Date</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                  <CalendarDays size={18} className="text-[#0E7490]" />
                  <input
                    type="date"
                    min={today}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-transparent text-sm font-semibold outline-none"
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#073B4C]">Travellers</label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                  <Users size={18} className="text-[#0E7490]" />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={travellers}
                    onChange={(e) => setTravellers(e.target.value)}
                    placeholder="No. of people"
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                onClick={getQuote}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0E7490] px-6 py-2.5 font-extrabold text-white shadow-md transition hover:bg-[#073B4C] md:w-auto md:px-8"
              >
                <MessageCircle size={20} />
                Get Quote
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="border-t border-black/5 bg-white px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-5 text-sm font-bold">
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a>
              <a href="#fleet" onClick={() => setMenuOpen(false)}>Fleet</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              <button
                onClick={() => whatsappBooking()}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#073B4C] px-5 py-3 text-white"
              >
                <MessageCircle size={18} />
                Book on WhatsApp
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero_bg.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[62%_center] sm:object-[60%_center] lg:object-center"
          />
          <div className="absolute inset-0 bg-white/35 sm:bg-white/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto flex min-h-[460px] max-w-7xl items-start px-5 pb-12 pt-12 sm:min-h-[540px] sm:pb-16 sm:pt-16 lg:min-h-[600px] lg:px-8 lg:pb-20 lg:pt-20">
          <div className="w-full max-w-3xl">
            <div className="mb-4 inline-flex max-w-full rounded-full bg-white/90 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0E7490] shadow-md backdrop-blur-sm sm:px-4 sm:text-xs sm:tracking-[0.2em]">
              Top 1% Cab Service • Gokarna & Coastal Karnataka
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-[#073B4C] sm:text-5xl md:text-6xl lg:text-7xl">
              Explore Gokarna.
              <br />
              <span className="text-[#0E7490]">Discover the Coast.</span>
            </h1>

            <p className="mt-5 max-w-2xl rounded-xl bg-white/45 p-2 text-sm leading-6 text-[#234B58] backdrop-blur-[2px] sm:mt-7 sm:bg-transparent sm:p-0 sm:text-lg sm:leading-7">
              Premium, reliable cab services for sightseeing, temple tours, railway transfers, and unforgettable journeys across the beautiful Karnataka coast.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <button
                onClick={() => whatsappBooking()}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#073B4C] px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0E7490] sm:w-auto sm:px-7 sm:py-4"
              >
                <MessageCircle size={20} />
                Get a Quote on WhatsApp
              </button>

              <a
                href="tel:+917676184510"
                className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#073B4C] bg-white/90 px-6 py-3.5 font-bold text-[#073B4C] transition hover:bg-[#073B4C] hover:text-white sm:w-auto sm:px-7 sm:py-4"
              >
                <Phone size={19} />
                Call +91 7676184510
              </a>
            </div>

            <div className="mt-6 flex flex-col gap-2 text-sm font-semibold text-[#174C5B] sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
              <span className="flex items-center gap-2">
                <Check size={18} className="shrink-0 text-[#0E7490]" />
                Easy WhatsApp Booking
              </span>
              <span className="flex items-center gap-2">
                <Check size={18} className="shrink-0 text-[#0E7490]" />
                Comfortable, Clean Vehicles
              </span>
              <span className="flex items-center gap-2">
                <Check size={18} className="shrink-0 text-[#0E7490]" />
                Local Travel Expertise
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          TRUST INDICATORS
      ========================================== */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Shield size={32} />, title: "Safe & Reliable", desc: "Fully insured vehicles with verified, experienced drivers." },
              { icon: <Clock size={32} />, title: "24/7 Service", desc: "Available round the clock for your convenience and emergencies." },
              { icon: <Wallet size={32} />, title: "Best Prices", desc: "Competitive, transparent rates with absolutely no hidden charges." },
              { icon: <Star size={32} />, title: "Top Rated", desc: "5-star service guaranteed, trusted by hundreds of tourists." },
            ].map((item, idx) => (
              <div key={idx} className="text-center p-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F9FF] text-[#0E7490]">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-[#073B4C]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SERVICES
      ========================================== */}
      <section id="services" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0E7490]">
              Our Services
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
              Curated Trips for the Best Coastal Experience
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              From local Gokarna sightseeing to temple tours, railway transfers
              and coastal Karnataka journeys, choose a service that fits your trip.
            </p>
            <a
              href="/services"
              className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#0E7490] transition hover:text-[#073B4C]"
            >
              View all services
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 1. Gokarna Local Sightseeing */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 text-4xl">🌴</div>
              <h3 className="text-xl font-black text-[#073B4C]">Gokarna Local Sightseeing</h3>
              <ul className="mt-4 space-y-2">
                {["Mahabaleshwar Temple","Ganesh Temple","Bhadrakali Temple","Main, Om, Kudle & Belekan Beach"].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <Check size={16} className="mt-1 shrink-0 text-[#0E7490]" />
                    {point}
                  </li>
                ))}
              </ul>
              <button onClick={() => whatsappBooking("Gokarna Local Sightseeing")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#073B4C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0E7490]">
                <MessageCircle size={18} /> Enquire on WhatsApp
              </button>
            </div>

            {/* 2. Gokarna to Yana */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 text-4xl">🏞️</div>
              <h3 className="text-xl font-black text-[#073B4C]">Gokarna to Yana Trip Package</h3>
              <ul className="mt-4 space-y-2">
                {["Yana Caves (Rock Formations)","Vibhuti Waterfalls","Scenic Western Ghats Drive","Full Day Package"].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <Check size={16} className="mt-1 shrink-0 text-[#0E7490]" />
                    {point}
                  </li>
                ))}
              </ul>
              <button onClick={() => whatsappBooking("Gokarna to Yana Trip Package")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#073B4C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0E7490]">
                <MessageCircle size={18} /> Enquire on WhatsApp
              </button>
            </div>

            {/* 3. Gokarna to Murudeshwar */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 text-4xl">🕉️</div>
              <h3 className="text-xl font-black text-[#073B4C]">Gokarna to Murudeshwar Package</h3>
              <ul className="mt-4 space-y-2">
                {["Murudeshwar Temple & Statue","Sharavathi Backwaters (Honnavar)","Mangrove Boardwalk","Eco Beach & Mirjan Fort"].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <Check size={16} className="mt-1 shrink-0 text-[#0E7490]" />
                    {point}
                  </li>
                ))}
              </ul>
              <button onClick={() => whatsappBooking("Gokarna to Murudeshwar Package")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#073B4C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0E7490]">
                <MessageCircle size={18} /> Enquire on WhatsApp
              </button>
            </div>

            {/* 4. Temple Tour */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 text-4xl">🛕</div>
              <h3 className="text-xl font-black text-[#073B4C]">Complete Temple Tour Package</h3>
              <ul className="mt-4 space-y-2">
                {["Gunavanteshwar & Dhareshwar Temple","Idagunji Temple","Murudeshwar Temple","Kollur Mookambika & Udupi Krishna Temple"].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <Check size={16} className="mt-1 shrink-0 text-[#0E7490]" />
                    {point}
                  </li>
                ))}
              </ul>
              <button onClick={() => whatsappBooking("Complete Temple Tour Package")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#073B4C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0E7490]">
                <MessageCircle size={18} /> Enquire on WhatsApp
              </button>
            </div>

            {/* 5. Railway Station */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 text-4xl">🚆</div>
              <h3 className="text-xl font-black text-[#073B4C]">Railway Station Pickup & Drop</h3>
              <ul className="mt-4 space-y-2">
                {["Goa Madgaon Railway Station","Hubli Railway Station","Udupi Railway Station","Pickup & Drop Service"].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <Check size={16} className="mt-1 shrink-0 text-[#0E7490]" />
                    {point}
                  </li>
                ))}
              </ul>
              <button onClick={() => whatsappBooking("Railway Station Pickup and Drop")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#073B4C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0E7490]">
                <MessageCircle size={18} /> Enquire on WhatsApp
              </button>
            </div>

            {/* 6. Custom Coastal Tours */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 text-4xl">🗺️</div>
              <h3 className="text-xl font-black text-[#073B4C]">Custom Coastal Tours</h3>
              <ul className="mt-4 space-y-2">
                {["Goa to Gokarna Coastal Drive","Karwar, Ankola & Kumta Exploration","Honnavar & Sirsi Adventures","Multi-day Packages Available"].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
                    <Check size={16} className="mt-1 shrink-0 text-[#0E7490]" />
                    {point}
                  </li>
                ))}
              </ul>
              <button onClick={() => whatsappBooking("Custom Coastal Tour")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#073B4C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0E7490]">
                <MessageCircle size={18} /> Enquire on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FLEET
      ========================================== */}
      <section id="fleet" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0E7490]">Our Fleet</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
              Choose the Right Vehicle for Your Journey
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                name: "Swift Dzire", 
                seats: "4 Seats", 
                desc: "Perfect for couples, solo travelers, and small families. Economical and comfortable.",
                img: "/swift-dzire.jpg",
                waMsg: "I want to book Swift Dzire (4 seater)"
              },
              { 
                name: "Maruti Suzuki Ertiga", 
                seats: "6 Seats", 
                desc: "Ideal for families and small groups. Spacious, comfortable, and perfect for longer journeys.",
                img: "/ertiga.jpg",
                waMsg: "I want to book Maruti Suzuki Ertiga (6 seater)"
              },
              { 
                name: "Tempo Traveller (TT)", 
                seats: "13 Seats", 
                desc: "Best for large groups, pilgrimages, and family tours. Spacious and comfortable for group travel.",
                img: "/tempo-traveller.jpg",
                waMsg: "I want to book Tempo Traveller (13 seater)"
              },
            ].map((vehicle) => (
              <div key={vehicle.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-slate-100 to-white p-4">
                  <img
                    src={vehicle.img}
                    alt={`${vehicle.name} cab - Coastal Cabs`}
                    className="h-full w-full object-contain drop-shadow-md"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black text-[#073B4C]">{vehicle.name}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-[#0E7490]">
                    <Users size={16} /> {vehicle.seats}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{vehicle.desc}</p>
                  <button
                    onClick={() => whatsappBooking(vehicle.waMsg)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#0E7490] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#073B4C]"
                  >
                    <MessageCircle size={18} />
                    Book This Vehicle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FINAL CTA
      ========================================== */}
      <section className="relative overflow-hidden bg-[#073B4C] py-20 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#073B4C] to-[#0E7490]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 text-center lg:flex-row lg:px-8 lg:text-left">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9DE5F2]">Ready to travel?</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Your coastal journey starts here.</h2>
            <p className="mt-3 max-w-xl text-sm text-white/75">
              Share your destination and travel details with us on WhatsApp. We&apos;ll help you plan your perfect cab journey instantly.
            </p>
          </div>
          <button
            onClick={() => whatsappBooking()}
            className="flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 font-extrabold text-[#073B4C] transition hover:bg-[#9DE5F2]"
          >
            <MessageCircle size={20} />
            Start a WhatsApp Booking
            <ArrowRight size={19} />
          </button>
        </div>
      </section>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer id="contact" className="bg-[#041F2A] py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-4 lg:px-8">
          <div className="md:col-span-1">
            <img
              src="/coastal-cabs-logo.png"
              alt="Coastal Cabs"
              className="h-14 w-auto rounded bg-white object-contain p-1"
            />
            <p className="mt-4 text-sm leading-6 text-white/70">
              Premium, top 1% cab services across Gokarna and the beautiful Coastal Karnataka region.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-black text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#services" className="transition hover:text-[#9DE5F2]">Our Services</a></li>
              <li><a href="#destinations" className="transition hover:text-[#9DE5F2]">Destinations</a></li>
              <li><a href="#fleet" className="transition hover:text-[#9DE5F2]">Our Fleet</a></li>
              <li><a href="#contact" className="transition hover:text-[#9DE5F2]">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-black text-white">Contact Info</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <a href="tel:+917676184510" className="flex items-center gap-3 transition hover:text-[#9DE5F2]">
                  <Phone size={17} /> +91 7676184510
                </a>
              </li>
              <li>
                <a href="mailto:gurumurtimgouda@gmail.com" className="flex items-center gap-3 transition hover:text-[#9DE5F2]">
                  <span>✉</span> gurumurtimgouda@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={17} /> 24/7 Available
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-black text-white">Service Areas</h4>
            <p className="text-sm leading-6 text-white/60">
              Gokarna, Goa, Murudeshwar, Yana, Karwar, Ankola, Kumta, Honnawara, Sirsi, Udupi, Hubli & Madgaon.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-5 pt-8 text-center text-sm text-white/50 lg:px-8">
          © {new Date().getFullYear()} Coastal Cabs by Gokarna Friends. All rights reserved.
        </div>
      </footer>

      {/* ==========================================
          FLOATING WHATSAPP BUTTON
      ========================================== */}
      <a 
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hi Gokarna Friends Coastal Cabs! I want to book a cab.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-110 hover:shadow-[#25D366]/50 md:bottom-8 md:right-8 md:h-16 md:w-16"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="md:hidden" fill="white" />
        <MessageCircle size={32} className="hidden md:block" fill="white" />
      </a>

      {/* ==========================================
          MOBILE SHUTTER QUICK BOOKING BAR
          Slides up when scrolling down, down when scrolling up
      ========================================== */}
        <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
        {/* Shutter container */}
        <div
          className={`transform transition-transform duration-300 ease-out ${
            isShutterOpen ? "translate-y-0" : "translate-y-[calc(100%-48px)]"
          }`}
        >
          {/* Toggle handle / tab */}
          <button
            onClick={() => {
              if (isShutterOpen) {
                setIsShutterOpen(false);
                setIsShutterManuallyClosed(true);
                return;
              }

              setIsShutterOpen(true);
              setIsShutterManuallyClosed(false);
            }}
            className="mx-auto flex w-full max-w-md items-center justify-center gap-1.5 rounded-t-2xl border-b border-black/5 bg-[#F0F9FF] py-2.5 text-[#073B4C] shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
            aria-label={isShutterOpen ? "Collapse booking bar" : "Expand booking bar"}
          >
            <ChevronUp
              size={16}
              className={`transition-transform duration-300 ${
                isShutterOpen ? "rotate-0" : "rotate-180"
              }`}
            />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              {isShutterOpen ? "Hide Booking" : "Quick Booking"}
            </span>
            <ChevronUp
              size={16}
              className={`transition-transform duration-300 ${
                isShutterOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </button>

          {/* Expanded content */}
          <div className="border-t border-black/5 bg-[#F0F9FF] px-4 pb-4 pt-3 shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
            <div className="mx-auto flex max-w-md flex-col gap-2.5">
              <div>
                <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#073B4C]">
                  Destination
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                  <MapPin size={18} className="text-[#0E7490] shrink-0" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Murudeshwar, Yana, Goa"
                    className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#073B4C]">
                    Travel Date
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                    <CalendarDays size={16} className="text-[#0E7490] shrink-0" />
                    <input
                      type="date"
                      min={today}
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-[10px] font-extrabold uppercase tracking-wider text-[#073B4C]">
                    Travellers
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                    <Users size={16} className="text-[#0E7490] shrink-0" />
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={travellers}
                      onChange={(e) => setTravellers(e.target.value)}
                      placeholder="No."
                      className="w-full bg-transparent text-sm font-semibold outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={getQuote}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0E7490] px-6 py-3 font-extrabold text-white shadow-md transition hover:bg-[#073B4C]"
              >
                <MessageCircle size={18} />
                Get Quote on WhatsApp
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          SPACER FOR SHUTTER (so page content isn't hidden)
      ========================================== */}
      <div className="h-12 md:hidden" />

    </main>
  );
}