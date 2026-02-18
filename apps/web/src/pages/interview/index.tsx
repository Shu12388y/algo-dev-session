import { useState } from "react";
import { useNavigate } from "react-router";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path
      d="M6 10l3 3 5-5"
      stroke="white"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cards = [
  {
    id: "technical",
    label: "Technical",
    title: "Technical Interview",
    description:
      "Assess your problem-solving, coding skills, and system design knowledge through curated engineering challenges.",
    duration: "45–90 min",
    difficulty: "Advanced",
    tags: ["Data Structures", "Algorithms", "System Design", "Coding"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect
          x="2"
          y="6"
          width="28"
          height="20"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10 20l-4-4 4-4M22 20l4-4-4-4M15 22l2-12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    accent: "#111111",
  },
  {
    id: "behavioral",
    label: "Behavioral",
    title: "Behavioral Interview",
    description:
      "Demonstrate your soft skills, leadership experiences, and cultural fit through structured situational questions.",
    duration: "30–60 min",
    difficulty: "Intermediate",
    tags: ["Leadership", "Communication", "Teamwork", "Problem Solving"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M4 26c0-4.418 3.582-8 8-8s8 3.582 8 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="22" cy="10" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M22 19c2.761 0 5 2.239 5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    accent: "#111111",
  },
];

export default function InterviewPage() {
  const [selected, setSelected] = useState([]);
  const [hovered, setHovered] = useState(null);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const toggle = (id) => {
    setSelected((prev) => (prev.includes(id) ? [] : [id]));
  };

  const isSelected = (id) => selected.includes(id);

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20">
        {/* Eyebrow */}
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-zinc-50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-zinc-500 tracking-wide">
            AI-Powered Interview Prep
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-bold text-zinc-950 text-center leading-tight mb-3"
          style={{ letterSpacing: "-0.03em" }}
        >
          Choose your interview type
        </h1>
        <p className="text-zinc-400 text-center text-base mb-14 max-w-sm leading-relaxed">
          Select one or both to get a personalized preparation experience
          tailored to your goals.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-3xl">
          {cards.map((card) => {
            const sel = isSelected(card.id);
            const hov = hovered === card.id;
            return (
              <button
                key={card.id}
                onClick={() => {
                  toggle(card.id);
                  setId(card.id);
                }}
                onMouseEnter={() => setHovered(card.id)}
                onMouseLeave={() => setHovered(null)}
                className="text-left relative rounded-2xl border p-7 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                style={{
                  background: sel ? "#0a0a0a" : hov ? "#fafafa" : "#ffffff",
                  borderColor: sel ? "#0a0a0a" : hov ? "#d4d4d8" : "#e4e4e7",
                  boxShadow: sel
                    ? "0 20px 60px -10px rgba(0,0,0,0.35)"
                    : hov
                      ? "0 8px 30px -5px rgba(0,0,0,0.10)"
                      : "0 1px 3px rgba(0,0,0,0.04)",
                  transform: hov && !sel ? "translateY(-2px)" : "translateY(0)",
                }}
              >
                {/* Selection check */}
                <div
                  className="absolute top-5 right-5 transition-all duration-200"
                  style={{
                    opacity: sel ? 1 : 0,
                    transform: sel ? "scale(1)" : "scale(0.6)",
                  }}
                >
                  <span style={{ color: "#ffffff" }}>
                    <CheckIcon />
                  </span>
                </div>

                {/* Icon */}
                <div
                  className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200"
                  style={{
                    background: sel ? "rgba(255,255,255,0.08)" : "#f4f4f5",
                    color: sel ? "#ffffff" : "#3f3f46",
                  }}
                >
                  {card.icon}
                </div>

                {/* Label badge */}
                <div className="mb-2">
                  <span
                    className="text-xs font-semibold tracking-widest uppercase px-2 py-0.5 rounded-md"
                    style={{
                      background: sel ? "rgba(255,255,255,0.1)" : "#f4f4f5",
                      color: sel ? "rgba(255,255,255,0.6)" : "#a1a1aa",
                    }}
                  >
                    {card.label}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-xl font-bold mb-2 leading-snug transition-colors duration-200"
                  style={{
                    color: sel ? "#ffffff" : "#09090b",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {card.title}
                </h2>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-5 transition-colors duration-200"
                  style={{ color: sel ? "rgba(255,255,255,0.55)" : "#71717a" }}
                >
                  {card.description}
                </p>

                {/* Meta row */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle
                        cx="6.5"
                        cy="6.5"
                        r="5.5"
                        stroke={sel ? "rgba(255,255,255,0.4)" : "#a1a1aa"}
                        strokeWidth="1.3"
                      />
                      <path
                        d="M6.5 3.5v3l2 1.5"
                        stroke={sel ? "rgba(255,255,255,0.4)" : "#a1a1aa"}
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span
                      className="text-xs"
                      style={{
                        color: sel ? "rgba(255,255,255,0.5)" : "#a1a1aa",
                      }}
                    >
                      {card.duration}
                    </span>
                  </div>
                  <div
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: sel ? "rgba(255,255,255,0.08)" : "#f4f4f5",
                      color: sel ? "rgba(255,255,255,0.5)" : "#71717a",
                    }}
                  >
                    {card.difficulty}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-lg font-medium transition-colors duration-200"
                      style={{
                        background: sel ? "rgba(255,255,255,0.07)" : "#f8f8f8",
                        color: sel ? "rgba(255,255,255,0.45)" : "#71717a",
                        border: `1px solid ${sel ? "rgba(255,255,255,0.08)" : "#ebebeb"}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <button
            onClick={() => navigate(`/interview/${id}`)}
            disabled={selected.length === 0}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: selected.length > 0 ? "#0a0a0a" : "#e4e4e7",
              color: selected.length > 0 ? "#ffffff" : "#a1a1aa",
              boxShadow:
                selected.length > 0
                  ? "0 8px 24px -4px rgba(0,0,0,0.3)"
                  : "none",
              transform: selected.length > 0 ? "translateY(0)" : "none",
              letterSpacing: "-0.01em",
            }}
          >
            {selected.length === 0
              ? "Select an interview type"
              : `Start ${cards.find((c) => c.id === selected[0])?.title}`}
            {selected.length > 0 && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          {selected.length > 0 && (
            <p className="text-xs text-zinc-400">
              {cards.find((c) => c.id === selected[0])?.label} interview
              selected
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
