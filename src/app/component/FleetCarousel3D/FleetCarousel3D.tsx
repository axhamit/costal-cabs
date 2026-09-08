"use client";

import { useState } from "react";
import { Users, MessageCircle, Rotate3D } from "lucide-react";

const fleetData = [
  {
    name: "Swift Dzire",
    seats: "4 Seats",
    desc: "Perfect for couples, solo travelers, and small families. Economical and comfortable.",
    image: "/swift-dzire.glb",
    waMsg: "I want to book Swift Dzire (4 seater)",
  },
  {
    name: "Maruti Suzuki Ertiga",
    seats: "6 Seats",
    desc: "Ideal for families and small groups. Spacious, comfortable, and perfect for longer journeys.",
    image: "/ertiga.jpg",
    waMsg: "I want to book Maruti Suzuki Ertiga (6 seater)",
  },
  {
    name: "Tempo Traveller (TT)",
    seats: "13 Seats",
    desc: "Best for large groups, pilgrimages, and family tours. Spacious and comfortable for group travel.",
    image: "/tempo-traveller.jpg",
    waMsg: "I want to book Tempo Traveller (13 seater)",
  },
];

interface Fleet3DShowcaseProps {
  phoneNumber?: string;
  onWhatsAppClick?: (message: string) => void;
}

function VehicleViewer({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50 md:h-[330px]">
      <img
        src={image}
        alt={name}
        className="h-full w-full object-contain object-center"
      />

      {/* Ground shadow */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 h-5 w-3/4 -translate-x-1/2 rounded-[50%] bg-black/10 blur-xl" />
    </div>
  );
}

export default function Fleet3DShowcase({
  phoneNumber = "917676184510",
  onWhatsAppClick,
}: Fleet3DShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleWhatsApp = (message: string) => {
    const fullMessage =
      `Hello Coastal Cabs by Gokarna Friends, ${message}`;

    if (onWhatsAppClick) {
      onWhatsAppClick(fullMessage);
    } else {
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          fullMessage
        )}`,
        "_blank"
      );
    }
  };

  return (
    <section
      id="fleet"
      className="overflow-hidden bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#0E7490]">
            Our Fleet
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-[#073B4C] sm:text-4xl">
            Choose the Right Vehicle for Your Journey
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            Browse our vehicles and choose the right fit before booking.
          </p>
        </div>

        {/* Fleet */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {fleetData.map((vehicle, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={vehicle.name}
                onClick={() => setActiveIndex(index)}
                className={`
                  group relative overflow-hidden rounded-2xl
                  border-2 bg-white transition-all duration-500
                  ${
                    isActive
                      ? "scale-[1.02] border-[#0E7490] shadow-2xl shadow-[#0E7490]/20"
                      : "border-slate-200 shadow-lg hover:-translate-y-1 hover:shadow-xl"
                  }
                `}
              >

                {/* Vehicle image */}
                <VehicleViewer image={vehicle.image} name={vehicle.name} />

                {/* Selected */}
                {isActive && (
                  <div className="absolute right-4 top-4 z-20 rounded-full bg-[#0E7490] px-3 py-1.5 text-[10px] font-extrabold text-white shadow-lg">
                    SELECTED
                  </div>
                )}

                {/* Content */}
                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-[#073B4C]">
                        {vehicle.name}
                      </h3>

                      <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-bold text-[#0E7490]">
                        <Users size={16} />
                        {vehicle.seats}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 fill-current text-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {vehicle.desc}
                  </p>

                  {/* Book */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(vehicle.waMsg);
                    }}
                    className="
                      mt-5 flex w-full items-center
                      justify-center gap-2 rounded-full
                      bg-[#0E7490] px-4 py-3
                      text-sm font-bold text-white
                      shadow-lg shadow-[#0E7490]/20
                      transition-all
                      hover:scale-[1.02]
                      hover:bg-[#073B4C]
                      active:scale-95
                    "
                  >
                    <MessageCircle size={18} />
                    Book This Vehicle
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom instruction */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-600">
            <Rotate3D size={18} className="text-[#0E7490]" />
            View our fleet and choose your vehicle
          </div>
        </div>
      </div>
    </section>
  );
}