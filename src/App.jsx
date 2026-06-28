import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ── SUPABASE ───────────────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ── DESIGN TOKENS ──────────────────────────────────────────────
const C = {
  primary: "#0f0f1a", accent: "#e8a020", accentLight: "#fef3dc",
  purple: "#5c35d4", purpleLight: "#ede9fe", green: "#059669",
  greenLight: "#d1fae5", red: "#dc2626", redLight: "#fee2e2",
  surface: "#ffffff", bg: "#f5f6fa", border: "#e8eaf0",
  muted: "#94a3b8", text: "#0f172a", textSoft: "#475569",
};

// ── COURSE CATALOGUE ───────────────────────────────────────────
const COURSES = [
  { id: "ai-tools", icon: "🤖", title: "AI Tools Mastery", color: "#5c35d4", bg: "#ede9fe", cat: "Tech & AI", desc: "ChatGPT, Gemini, Claude — master AI tools for real daily tasks and work." },
  { id: "build-websites-ai", icon: "🌐", title: "Build Websites with AI", color: "#7c3aed", bg: "#f5f3ff", cat: "Tech & AI", desc: "Build real websites using AI tools like Lovable, Bolt, and prompting — no coding needed." },
  { id: "build-apps-ai", icon: "📱", title: "Build Apps with AI", color: "#6d28d9", bg: "#ede9fe", cat: "Tech & AI", desc: "Turn your app ideas into reality using AI builders — no programming background required." },
  { id: "prompt-engineering", icon: "✨", title: "Prompt Engineering", color: "#4f46e5", bg: "#e0e7ff", cat: "Tech & AI", desc: "Learn to write powerful prompts that get the best results from any AI model." },
  { id: "no-code-automation", icon: "⚡", title: "No-Code Automation", color: "#0891b2", bg: "#cffafe", cat: "Tech & AI", desc: "Automate repetitive tasks using Zapier, Make, and AI — no coding at all." },
  { id: "ai-for-developers", icon: "💻", title: "AI for Developers", color: "#1d4ed8", bg: "#dbeafe", cat: "Tech & AI", desc: "Use GitHub Copilot, Claude, and Cursor to code faster and smarter." },
  { id: "data-analysis-ai", icon: "📊", title: "Data Analysis with AI", color: "#0369a1", bg: "#e0f2fe", cat: "Tech & AI", desc: "Analyse data, build charts, and find insights using AI — no Excel expertise needed." },
  { id: "start-business", icon: "🚀", title: "Start a Business", color: "#e8a020", bg: "#fef3dc", cat: "Business", desc: "From idea to launch — how to validate, plan, and start your business the right way." },
  { id: "grow-business", icon: "📈", title: "Grow & Scale a Business", color: "#d97706", bg: "#fef9c3", cat: "Business", desc: "Take your existing business to the next level with systems, marketing, and team building." },
  { id: "ecommerce", icon: "🛒", title: "E-commerce & Importation", color: "#16a34a", bg: "#dcfce7", cat: "Business", desc: "Source products, sell online, and handle logistics — build a profitable trading business." },
  { id: "dropshipping", icon: "📦", title: "Dropshipping Business", color: "#15803d", bg: "#d1fae5", cat: "Business", desc: "Sell products online without holding stock — a complete beginner's guide." },
  { id: "freelancing", icon: "🧑‍💻", title: "Freelancing & Client Work", color: "#0f766e", bg: "#ccfbf1", cat: "Business", desc: "Land clients, price your services, and build a sustainable freelance income." },
  { id: "business-plan", icon: "📋", title: "Write a Business Plan", color: "#b45309", bg: "#fef3c7", cat: "Business", desc: "Write a professional business plan that attracts investors and keeps you focused." },
  { id: "business-finance", icon: "💹", title: "Business Finance Basics", color: "#78350f", bg: "#fef9c3", cat: "Business", desc: "Understand cash flow, profit margins, pricing, and how to manage business money." },
  { id: "make-money-online", icon: "💰", title: "Make Money Online", color: "#059669", bg: "#d1fae5", cat: "Money & Income", desc: "Real, proven ways to earn money online — from side income to full-time revenue." },
  { id: "investing", icon: "📉", title: "Investing Basics", color: "#047857", bg: "#d1fae5", cat: "Money & Income", desc: "Stocks, ETFs, and smart investing habits — how to grow your money over time." },
  { id: "personal-finance", icon: "🏦", title: "Personal Finance & Budgeting", color: "#065f46", bg: "#ecfdf5", cat: "Money & Income", desc: "Take control of your money — budgeting, saving, debt, and building wealth." },
  { id: "crypto", icon: "₿", title: "Crypto Fundamentals", color: "#f59e0b", bg: "#fef3c7", cat: "Money & Income", desc: "Understand blockchain, Bitcoin, and how to navigate crypto safely." },
  { id: "affiliate-marketing", icon: "🔗", title: "Affiliate Marketing", color: "#10b981", bg: "#d1fae5", cat: "Money & Income", desc: "Earn commissions promoting other people's products — a scalable income stream." },
  { id: "digital-products", icon: "💿", title: "Sell Digital Products", color: "#6366f1", bg: "#e0e7ff", cat: "Money & Income", desc: "Create and sell ebooks, templates, courses, and tools — income while you sleep." },
  { id: "side-hustle", icon: "🌙", title: "Side Hustle Playbook", color: "#8b5cf6", bg: "#ede9fe", cat: "Money & Income", desc: "Find, start, and grow a side hustle that fits your skills and schedule." },
  { id: "digital-marketing", icon: "📣", title: "Digital Marketing", color: "#ea580c", bg: "#ffedd5", cat: "Marketing", desc: "SEO, ads, funnels, and strategy — market any business or brand online." },
  { id: "social-media-growth", icon: "📲", title: "Social Media Growth", color: "#db2777", bg: "#fce7f3", cat: "Marketing", desc: "Grow a real audience on Instagram, TikTok, X, and LinkedIn from scratch." },
  { id: "content-creation", icon: "🎬", title: "Content Creation", color: "#c026d3", bg: "#fae8ff", cat: "Marketing", desc: "Create content people actually watch, share, and buy from — across any platform." },
  { id: "youtube", icon: "▶️", title: "YouTube & Video", color: "#dc2626", bg: "#fee2e2", cat: "Marketing", desc: "Start a YouTube channel, grow subscribers, and monetise your videos." },
  { id: "copywriting", icon: "✍️", title: "Copywriting", color: "#7c3aed", bg: "#f5f3ff", cat: "Marketing", desc: "Write words that sell — landing pages, ads, emails, and product descriptions." },
  { id: "email-marketing", icon: "📧", title: "Email Marketing", color: "#1d4ed8", bg: "#dbeafe", cat: "Marketing", desc: "Build an email list, write campaigns, and turn subscribers into buyers." },
  { id: "brand-building", icon: "🏷", title: "Brand Building", color: "#0891b2", bg: "#cffafe", cat: "Marketing", desc: "Create a brand identity, tell your story, and build trust with your audience." },
  { id: "academic-writing", icon: "📝", title: "Academic Writing & Research", color: "#1e40af", bg: "#dbeafe", cat: "Academic & Career", desc: "Essays, dissertations, journal articles — write with clarity and academic confidence." },
  { id: "journal-publishing", icon: "📰", title: "Journal Publishing", color: "#1d4ed8", bg: "#eff6ff", cat: "Academic & Career", desc: "How to write, submit, and get your research published in academic journals." },
  { id: "thesis-dissertation", icon: "🎓", title: "Thesis & Dissertation", color: "#3730a3", bg: "#e0e7ff", cat: "Academic & Career", desc: "Plan, write, and defend your thesis or dissertation with confidence." },
  { id: "cv-job-hunting", icon: "💼", title: "CV & Job Hunting", color: "#0f172a", bg: "#f1f5f9", cat: "Academic & Career", desc: "Write a standout CV, ace interviews, and land the job you actually want." },
  { id: "public-speaking", icon: "🎤", title: "Public Speaking", color: "#7c3aed", bg: "#ede9fe", cat: "Academic & Career", desc: "Speak with confidence in meetings, presentations, and on stage." },
  { id: "leadership", icon: "👑", title: "Leadership Skills", color: "#b45309", bg: "#fef3c7", cat: "Academic & Career", desc: "Lead teams, make decisions, and build influence in any organisation." },
  { id: "project-management", icon: "📌", title: "Project Management", color: "#0369a1", bg: "#e0f2fe", cat: "Academic & Career", desc: "Plan, execute, and deliver projects on time — with or without a formal PM role." },
  { id: "journalism-ai", icon: "🗞", title: "AI for Journalism & Media", color: "#1e3a5f", bg: "#dbeafe", cat: "Academic & Career", desc: "AI research, fact-checking, storytelling, and modern media production." },
  { id: "find-direction", icon: "🧭", title: "Find Your Direction", color: "#db2777", bg: "#fce7f3", cat: "Life & Growth", desc: "Clarity exercises and purpose mapping to help you figure out what you truly want." },
  { id: "confidence-mindset", icon: "💪", title: "Confidence & Mindset", color: "#7c3aed", bg: "#f5f3ff", cat: "Life & Growth", desc: "Build the mental foundation to take action, overcome fear, and back yourself." },
  { id: "relationships", icon: "❤️", title: "Relationships & Communication", color: "#e11d48", bg: "#ffe4e6", cat: "Life & Growth", desc: "Build better relationships at work, home, and in life through communication skills." },
  { id: "productivity", icon: "⏱", title: "Productivity & Time Mastery", color: "#0891b2", bg: "#cffafe", cat: "Life & Growth", desc: "Own your time, beat procrastination, and consistently get the right things done." },
  { id: "health-habits", icon: "🏃", title: "Health & Wellness Habits", color: "#16a34a", bg: "#dcfce7", cat: "Life & Growth", desc: "Build sustainable habits around sleep, movement, and energy that actually stick." },
  { id: "parenting-digital", icon: "👨‍👩‍👧", title: "Parenting in the Digital Age", color: "#0f766e", bg: "#ccfbf1", cat: "Life & Growth", desc: "Guide your children through technology, social media, and the modern world." },
  { id: "graphic-design-ai", icon: "🎨", title: "Graphic Design with AI", color: "#c026d3", bg: "#fae8ff", cat: "Creative", desc: "Create stunning visuals, logos, and designs using Canva, Midjourney, and AI tools." },
  { id: "video-editing", icon: "🎞", title: "Video Editing", color: "#dc2626", bg: "#fee2e2", cat: "Creative", desc: "Edit professional videos for social media, business, or personal projects." },
  { id: "photography", icon: "📸", title: "Photography Basics", color: "#78350f", bg: "#fef3c7", cat: "Creative", desc: "Take better photos with any camera or phone — composition, lighting, and editing." },
  { id: "music-production", icon: "🎵", title: "Music Production", color: "#7c3aed", bg: "#ede9fe", cat: "Creative", desc: "Make beats, record, and produce music using AI tools and software." },
  { id: "storytelling-writing", icon: "📖", title: "Storytelling & Creative Writing", color: "#0f766e", bg: "#ccfbf1", cat: "Creative", desc: "Write stories, scripts, and content that captivates and connects with people." },
  { id: "fashion-business", icon: "👗", title: "Fashion & Style Business", color: "#db2777", bg: "#fce7f3", cat: "Creative", desc: "Turn your passion for fashion into a business — design, source, sell, and brand." },
];

const CATEGORIES = ["All", "Tech & AI", "Business", "Money & Income", "Marketing", "Academic & Career", "Life & Growth", "Creative"];

const ONBOARDING_STAGES = [
  {
    id: "who", q: "First, who are you?", sub: "This shapes your entire learning experience", type: "single",
    options: [
      { value: "student", label: "Student or recent graduate", icon: "🎓", desc: "In school or just finished" },
      { value: "professional", label: "Working professional", icon: "💼", desc: "Employed and looking to grow or pivot" },
      { value: "entrepreneur", label: "Business owner or entrepreneur", icon: "🚀", desc: "Running or building something of my own" },
      { value: "lost", label: "Still figuring things out", icon: "🧭", desc: "Not sure where I'm headed yet" },
    ],
  },
  {
    id: "goal", q: "What's your biggest goal right now?", sub: "Pick your most urgent priority", type: "single",
    options: [
      { value: "money", label: "Make more money", icon: "💰", desc: "Increase my income or find new revenue" },
      { value: "business", label: "Start or grow a business", icon: "📈", desc: "Launch or scale something of my own" },
      { value: "skills", label: "Build valuable skills", icon: "🛠", desc: "Learn things that matter in today's world" },
      { value: "academic", label: "Complete an academic project", icon: "📝", desc: "Thesis, research, dissertation, or coursework" },
      { value: "direction", label: "Find my direction in life", icon: "🌟", desc: "Figure out what I actually want" },
      { value: "career", label: "Get a better job", icon: "🏆", desc: "Land a role I'm proud of or move up" },
      { value: "tech", label: "Learn tech and AI", icon: "🤖", desc: "Build websites, apps, or master AI tools" },
      { value: "creative", label: "Develop my creative skills", icon: "🎨", desc: "Design, video, writing, music, fashion" },
    ],
  },
  {
    id: "challenge", q: "What's holding you back the most?", sub: "Be honest — this shapes your personal plan", type: "single",
    options: [
      { value: "knowledge", label: "I don't know enough yet", icon: "📚", desc: "I need the right knowledge and skills" },
      { value: "direction", label: "I don't know where to start", icon: "🗺", desc: "Too many options, not enough clarity" },
      { value: "time", label: "I don't have enough time", icon: "⏰", desc: "Life is busy — I need something I can fit in" },
      { value: "confidence", label: "I doubt myself", icon: "💪", desc: "Fear and self-doubt slow me down" },
      { value: "money", label: "I have limited resources", icon: "💸", desc: "Budget is tight — I need high-value learning" },
    ],
  },
  {
    id: "time", q: "How much time can you give daily?", sub: "We'll build your schedule around this", type: "single",
    options: [
      { value: "5", label: "5 minutes", icon: "⚡", desc: "Quick daily bites" },
      { value: "15", label: "10–15 minutes", icon: "🎯", desc: "The sweet spot" },
      { value: "30", label: "20–30 minutes", icon: "🔥", desc: "Serious learner" },
      { value: "60", label: "1 hour or more", icon: "🚀", desc: "All in" },
    ],
  },
];

// ── HELPERS ────────────────────────────────────────────────────
function ProgressBar({ value, color = C.accent, height = 6 }) {
  return (
    <div style={{ background: C.border, borderRadius: 99, height, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(value, 100)}%`, background: color, height: "100%", borderRadius: 99, transition: "width 0.6s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", background: C.primary, color: "#fff", padding: "13px 26px", borderRadius: 14, fontWeight: 700, fontSize: 14, zIndex: 999, boxShadow: "0 8px 32px rgba(0,0,0,0.3)", whiteSpace: "nowrap" }}>
      {msg}
    </div>
  );
}

function Spinner({ color = C.accent, size = 48 }) {
  return (
    <>
      <div style={{ width: size, height: size, border: `4px solid ${color}22`, borderTop: `4px solid ${color}`, borderRadius: "50%", animation: "spin 0.9s linear infinite", margin: "0 auto" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  );
}

// ── AUTH SCREEN ────────────────────────────────────────────────
function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit() {
    if (!email || !password || (mode === "signup" && !name)) return;
    setLoading(true); setError(null);
    try {
      if (mode === "signup") {
        const { data, error: e } = await supabase.auth.signUp({
          email, password,
          options: { data: { name } }
        });
        if (e) throw e;
        if (data.user) onAuth(data.user, name, email);
      } else {
        const { data, error: e } = await supabase.auth.signInWithPassword({ email, password });
        if (e) throw e;
        if (data.user) onAuth(data.user, data.user.user_metadata?.name || email.split("@")[0], email);
      }
    } catch (e) {
      setError(e.message || "Something went wrong. Try again.");
    } finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.primary} 0%, #1e0a4e 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: C.surface, borderRadius: 24, padding: "36px 28px", maxWidth: 420, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontWeight: 900, fontSize: 28, color: C.accent, letterSpacing: -0.5, marginBottom: 6 }}>coursia</div>
          <div style={{ fontWeight: 700, fontSize: 18, color: C.text }}>{mode === "signup" ? "Create your account" : "Welcome back"}</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{mode === "signup" ? "Start your personalised learning journey" : "Continue where you left off"}</div>
        </div>

        {mode === "signup" && (
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"
            style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", color: C.text, marginBottom: 10 }} />
        )}
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" type="email"
          style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", color: C.text, marginBottom: 10 }} />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password"
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", color: C.text, marginBottom: 14 }} />

        {error && <div style={{ background: C.redLight, color: C.red, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{error}</div>}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: "100%", background: C.accent, color: C.primary, border: "none", borderRadius: 12, padding: "15px 0", fontWeight: 900, fontSize: 16, cursor: loading ? "default" : "pointer", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          {loading ? <Spinner color={C.primary} size={22} /> : mode === "signup" ? "Create Account →" : "Sign In →"}
        </button>

        <div style={{ textAlign: "center", fontSize: 14, color: C.muted }}>
          {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => { setMode(mode === "signup" ? "login" : "signup"); setError(null); }} style={{ color: C.purple, fontWeight: 700, cursor: "pointer" }}>
            {mode === "signup" ? "Sign in" : "Sign up"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── AUDIO PLAYER ───────────────────────────────────────────────
function AudioPlayer({ text, color }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const uttRef = useRef(null);
  const wordsRef = useRef(text.split(" ").length);
  const spokenRef = useRef(0);
  useEffect(() => () => { window.speechSynthesis.cancel(); }, []);

  function stop() { window.speechSynthesis.cancel(); setPlaying(false); setProgress(0); spokenRef.current = 0; }
  function togglePlay() {
    if (playing) { window.speechSynthesis.pause(); setPlaying(false); return; }
    if (progress === 0 || progress >= 99) {
      spokenRef.current = 0; setProgress(0);
      const utt = new SpeechSynthesisUtterance(text);
      utt.rate = speed;
      utt.onboundary = (e) => { if (e.name === "word") { spokenRef.current++; setProgress(Math.min((spokenRef.current / wordsRef.current) * 100, 99)); } };
      utt.onend = () => { setProgress(100); setPlaying(false); };
      uttRef.current = utt;
      window.speechSynthesis.speak(utt);
    } else { window.speechSynthesis.resume(); }
    setPlaying(true);
  }

  return (
    <div style={{ background: C.primary, borderRadius: 16, padding: "16px 18px", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <button onClick={togglePlay} style={{ width: 44, height: 44, borderRadius: "50%", background: color, border: "none", color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {playing ? "⏸" : "▶"}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontWeight: 700, letterSpacing: 0.8 }}>🎧 AUDIO LECTURE</div>
          <ProgressBar value={progress} color={color} height={5} />
        </div>
        <button onClick={stop} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 18, cursor: "pointer" }}>⏹</button>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[0.75, 1, 1.5, 2].map(s => (
          <button key={s} onClick={() => setSpeed(s)} style={{ background: speed === s ? color : "rgba(255,255,255,0.08)", border: "none", color: speed === s ? "#fff" : "rgba(255,255,255,0.4)", borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{s}x</button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Tap ▶ to listen</span>
      </div>
    </div>
  );
}

// ── PAYWALL ─────────────────────────────────────────────────────
function Paywall({ course, user, onPay, onClose }) {
  const [step, setStep] = useState("info");
  const [error, setError] = useState(null);
  const txRef = "CRS-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();
  const courseRef = useRef(course);

  function loadPaystack() {
    setError(null);
    if (window.PaystackPop) { openPaystack(); return; }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = openPaystack;
    script.onerror = () => setError("Could not load payment. Check your connection.");
    document.body.appendChild(script);
  }

  function openPaystack() {
    const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!key) { setError("Payment not configured. Contact support."); return; }
    const handler = window.PaystackPop.setup({
      key,
      email: user.email,
      amount: 100000,
      currency: "NGN",
      ref: txRef,
      metadata: { course_id: course.id, course_title: course.title, user_id: user.id },
      onSuccess: async (transaction) => {
        await recordPayment(transaction.reference);
      },
      onCancel: () => setStep("info"),
    });
    handler.openIframe();
  }

  async function recordPayment(ref) {
    setStep("processing");
    try {
      // Record payment in Supabase
      const { data: payment, error: pe } = await supabase.from("payments").insert({
        user_id: user.id, course_id: course.id,
        amount: 100000, currency: "NGN",
        paystack_ref: ref, status: "success"
      }).select().single();
      if (pe) throw pe;

      // Grant course access
      await supabase.from("course_access").upsert({
        user_id: user.id, course_id: course.id, payment_id: payment.id
      });

      setStep("success");
      // Auto-redirect to course after 1.5 seconds
      setTimeout(() => onPay(courseRef.current), 1500);
    } catch (e) {
      setError("Payment recorded but access grant failed. Contact support with ref: " + ref);
      setStep("info");
    }
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 200 }}>
      <div style={{ background: C.surface, borderRadius: "24px 24px 0 0", padding: "32px 24px 44px", width: "100%", maxWidth: 480, boxShadow: "0 -8px 48px rgba(0,0,0,0.25)" }}>
        {step === "info" && <>
          <div style={{ width: 40, height: 4, background: C.border, borderRadius: 4, margin: "0 auto 28px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: course.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{course.icon}</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: C.text }}>{course.title}</div>
              <div style={{ fontSize: 13, color: C.muted }}>7-day challenge · Certificate included</div>
            </div>
          </div>
          <div style={{ background: C.bg, borderRadius: 14, padding: "16px 18px", marginBottom: 22 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ color: C.textSoft, fontSize: 15 }}>Course fee</span>
              <span style={{ fontWeight: 900, fontSize: 26, color: C.accent }}>₦1,000</span>
            </div>
            <div style={{ fontSize: 12, color: C.muted }}>One-time · Instant access · No subscription</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
            {["7 days of AI-generated lessons tailored to you", "Audio lecture for every lesson", "Daily quiz + streak tracking", "Shareable certificate on completion"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: C.textSoft }}>
                <span style={{ color: C.green, fontWeight: 800 }}>✓</span>{f}
              </div>
            ))}
          </div>
          {error && <div style={{ background: C.redLight, color: C.red, borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{error}</div>}
          <button onClick={loadPaystack} style={{ width: "100%", background: C.accent, color: C.primary, border: "none", borderRadius: 14, padding: "17px 0", fontWeight: 900, fontSize: 17, cursor: "pointer", marginBottom: 12 }}>
            Pay ₦1,000 · Unlock Course
          </button>
          <button onClick={onClose} style={{ width: "100%", background: "none", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", fontWeight: 600 }}>Maybe later</button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 16 }}>
            <span style={{ fontSize: 11, color: C.muted }}>Secured by</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#00c3f7" }}>Paystack</span>
            <span style={{ fontSize: 11, color: C.muted }}>· 256-bit SSL</span>
          </div>
        </>}
        {step === "processing" && (
          <div style={{ textAlign: "center", padding: "50px 0" }}>
            <Spinner color={C.accent} />
            <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginTop: 20 }}>Confirming your payment...</div>
          </div>
        )}
        {step === "success" && (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
            <div style={{ fontWeight: 900, fontSize: 22, color: C.text, marginBottom: 6 }}>Payment Successful!</div>
            <div style={{ color: C.textSoft, fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
              You now have full access to<br /><strong>{course.title}</strong>
            </div>
            <button onClick={() => onPay(courseRef.current)} style={{ width: "100%", background: course.color, color: "#fff", border: "none", borderRadius: 14, padding: "17px 0", fontWeight: 900, fontSize: 17, cursor: "pointer" }}>
              Start Day 1 →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── LESSON VIEW ────────────────────────────────────────────────
function LessonView({ course, day, user, userName, onComplete, onBack }) {
  const [phase, setPhase] = useState("loading");
  const [lesson, setLesson] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => { fetchLesson(); }, [day]);

  async function fetchLesson() {
    setPhase("loading"); setLesson(null); setSelected(null); setAnswered(false); setError(null);
    const key = import.meta.env.VITE_ANTHROPIC_API_KEY;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: `You are Coursia, a warm, practical AI learning coach. Write short daily lessons (150–180 words) that feel personal, actionable, and beginner-friendly.
Respond ONLY in this exact JSON with no preamble or backticks:
{"title":"engaging lesson title","intro":"one warm sentence addressing the learner by name","body":"core lesson — 2 clear paragraphs, plain text, no markdown","tip":"one actionable pro tip they can use today","quiz":{"question":"one clear question","options":["A","B","C","D"],"correct":0,"explanation":"brief explanation"}}`,
          messages: [{ role: "user", content: `Write Day ${day} of 7 for "${course.title}". Learner: ${userName}. Build naturally on earlier days.` }]
        })
      });
      const data = await res.json();
      const raw = data.content.map(b => b.text || "").join("");
      setLesson(JSON.parse(raw.replace(/```json|```/g, "").trim()));
      setPhase("lesson");
    } catch (e) { setError("Could not load lesson. Please try again."); setPhase("error"); }
  }

  async function handleComplete() {
    // Save progress to Supabase
    await supabase.from("progress").upsert({
      user_id: user.id, course_id: course.id, day_completed: day,
      last_updated: new Date().toISOString()
    });
    // Update total lessons on profile
    await supabase.from("profiles").update({ total_lessons: supabase.rpc("increment") }).eq("id", user.id);
    // If day 7, issue certificate
    if (day >= 7) {
      await supabase.from("certificates").upsert({
        user_id: user.id, course_id: course.id, course_title: course.title
      });
    }
    onComplete();
  }

  const audioText = lesson ? `${lesson.title}. ${lesson.body} Pro tip: ${lesson.tip}` : "";

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px 60px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 0 20px" }}>
        <button onClick={onBack} style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 10, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, color: C.textSoft }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: C.text }}>{course.title}</div>
          <div style={{ fontSize: 12, color: C.muted }}>Day {day} of 7</div>
        </div>
        <div style={{ background: course.bg, color: course.color, fontWeight: 800, fontSize: 12, padding: "5px 14px", borderRadius: 20 }}>Day {day}/7</div>
      </div>
      <ProgressBar value={(day / 7) * 100} color={course.color} />
      <div style={{ height: 22 }} />

      {phase === "loading" && <div style={{ textAlign: "center", padding: "90px 0" }}><Spinner color={course.color} /><div style={{ color: C.muted, fontSize: 15, marginTop: 20 }}>Building your Day {day} lesson...</div></div>}

      {phase === "error" && (
        <div style={{ background: C.redLight, borderRadius: 16, padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
          <div style={{ color: C.red, fontWeight: 700, marginBottom: 16 }}>{error}</div>
          <button onClick={fetchLesson} style={{ background: C.red, color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontWeight: 700, cursor: "pointer" }}>Retry</button>
        </div>
      )}

      {phase === "lesson" && lesson && (
        <>
          <div style={{ background: C.surface, borderRadius: 20, overflow: "hidden", border: `1.5px solid ${C.border}`, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", marginBottom: 16 }}>
            <div style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}bb)`, padding: "22px 24px" }}>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: 800, letterSpacing: 1.5, marginBottom: 8 }}>DAY {day} · {course.cat?.toUpperCase()}</div>
              <div style={{ color: "#fff", fontWeight: 900, fontSize: 21, lineHeight: 1.3 }}>{lesson.title}</div>
            </div>
            <div style={{ padding: 24 }}>
              <p style={{ color: course.color, fontWeight: 700, fontSize: 14, margin: "0 0 18px", fontStyle: "italic", lineHeight: 1.6 }}>{lesson.intro}</p>
              <p style={{ color: C.textSoft, lineHeight: 1.8, fontSize: 15, margin: "0 0 22px", whiteSpace: "pre-line" }}>{lesson.body}</p>
              <div style={{ background: C.accentLight, borderLeft: `4px solid ${C.accent}`, borderRadius: "0 12px 12px 0", padding: "13px 16px" }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, marginBottom: 5, letterSpacing: 0.8 }}>💡 TODAY'S TIP</div>
                <div style={{ fontSize: 14, color: C.textSoft, lineHeight: 1.65 }}>{lesson.tip}</div>
              </div>
            </div>
          </div>

          <AudioPlayer text={audioText} color={course.color} />

          <div style={{ background: C.surface, borderRadius: 20, border: `1.5px solid ${C.border}`, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: course.color, letterSpacing: 1.5, marginBottom: 14 }}>QUICK CHECK</div>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.text, marginBottom: 20, lineHeight: 1.4 }}>{lesson.quiz.question}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {lesson.quiz.options.map((opt, i) => {
                let bg = C.bg, border = `1.5px solid ${C.border}`, col = C.textSoft;
                if (answered) {
                  if (i === lesson.quiz.correct) { bg = C.greenLight; border = `2px solid ${C.green}`; col = C.green; }
                  else if (i === selected) { bg = C.redLight; border = `2px solid ${C.red}`; col = C.red; }
                } else if (selected === i) { bg = course.bg; border = `2px solid ${course.color}`; col = course.color; }
                return (
                  <div key={i} onClick={() => { if (!answered) { setSelected(i); setAnswered(true); } }}
                    style={{ background: bg, border, borderRadius: 12, padding: "13px 16px", cursor: answered ? "default" : "pointer", color: col, fontWeight: 600, fontSize: 14, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", border: "2px solid currentColor", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{["A","B","C","D"][i]}</span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {answered && i === lesson.quiz.correct && <span>✅</span>}
                    {answered && i === selected && i !== lesson.quiz.correct && <span>❌</span>}
                  </div>
                );
              })}
            </div>
            {answered && (
              <div style={{ marginTop: 16, background: selected === lesson.quiz.correct ? C.greenLight : "#fefce8", borderRadius: 12, padding: "14px 16px", border: `1.5px solid ${selected === lesson.quiz.correct ? C.green : "#fde047"}` }}>
                <div style={{ fontWeight: 700, color: selected === lesson.quiz.correct ? C.green : "#92400e", fontSize: 14, marginBottom: 4 }}>
                  {selected === lesson.quiz.correct ? "🎉 Correct!" : "📖 Not quite — see the right answer above."}
                </div>
                <div style={{ fontSize: 13, color: C.textSoft }}>{lesson.quiz.explanation}</div>
              </div>
            )}
          </div>
          {answered && (
            <button onClick={handleComplete} style={{ width: "100%", background: course.color, color: "#fff", border: "none", borderRadius: 14, padding: "18px 0", fontWeight: 900, fontSize: 17, cursor: "pointer", marginTop: 16 }}>
              {day < 7 ? `Complete Day ${day} →` : "Finish Course & Get Certificate 🎓"}
            </button>
          )}
        </>
      )}
    </div>
  );
}

// ── CERTIFICATE ────────────────────────────────────────────────
function Certificate({ course, userName, onClose }) {
  const date = new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 20 }}>
      <div style={{ background: C.surface, borderRadius: 24, padding: "44px 32px", maxWidth: 420, width: "100%", textAlign: "center", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", background: C.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 38, margin: "0 auto 22px" }}>🏆</div>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 2, marginBottom: 14 }}>CERTIFICATE OF COMPLETION</div>
        <div style={{ width: 60, height: 3, background: C.accent, borderRadius: 2, margin: "0 auto 20px" }} />
        <div style={{ fontWeight: 900, fontSize: 26, color: C.text, marginBottom: 6 }}>{userName}</div>
        <div style={{ color: C.muted, fontSize: 14, marginBottom: 6 }}>has successfully completed</div>
        <div style={{ fontWeight: 900, fontSize: 20, color: course.color, margin: "8px 0 6px" }}>{course.title}</div>
        <div style={{ color: C.muted, fontSize: 13, marginBottom: 26 }}>7-Day Challenge · Issued {date}</div>
        <div style={{ background: course.bg, borderRadius: 12, padding: "12px 0", fontWeight: 700, color: course.color, fontSize: 13, marginBottom: 30 }}>
          {course.icon} Coursia · AI-Powered Learning
        </div>
        <button onClick={onClose} style={{ width: "100%", background: C.accent, color: C.primary, border: "none", borderRadius: 12, padding: "15px 0", fontWeight: 900, fontSize: 16, cursor: "pointer" }}>
          Continue Learning
        </button>
      </div>
    </div>
  );
}

// ── PERSONALISATION REPORT ─────────────────────────────────────
function PersonalisationReport({ answers, userName, onDone }) {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  useEffect(() => { fetchReport(); }, []);

  async function fetchReport() {
    const key = import.meta.env.VITE_ANTHROPIC_API_KEY;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: `You are Coursia's personalisation engine. Generate a warm, specific, motivating personal learning report.
Respond ONLY in this exact JSON with no preamble or backticks:
{"headline":"short punchy headline (max 10 words)","profile":"2 sentences about who they are","insight":"1 sentence on what's holding them back","path":"1 sentence on their ideal learning path","courses":["id1","id2","id3"],"motivation":"warm personal note 2-3 sentences"}
Available IDs: ai-tools,build-websites-ai,build-apps-ai,prompt-engineering,no-code-automation,ai-for-developers,data-analysis-ai,start-business,grow-business,ecommerce,dropshipping,freelancing,business-plan,business-finance,make-money-online,investing,personal-finance,crypto,affiliate-marketing,digital-products,side-hustle,digital-marketing,social-media-growth,content-creation,youtube,copywriting,email-marketing,brand-building,academic-writing,journal-publishing,thesis-dissertation,cv-job-hunting,public-speaking,leadership,project-management,journalism-ai,find-direction,confidence-mindset,relationships,productivity,health-habits,parenting-digital,graphic-design-ai,video-editing,photography,music-production,storytelling-writing,fashion-business`,
          messages: [{ role: "user", content: `Name:${userName}\nWho:${answers.who}\nGoal:${answers.goal}\nChallenge:${answers.challenge}\nTime:${answers.time}min` }]
        })
      });
      const data = await res.json();
      const raw = data.content.map(b => b.text || "").join("");
      setReport(JSON.parse(raw.replace(/```json|```/g, "").trim()));
    } catch (e) {
      setReport({ headline: "You're ready to level up", profile: "You have clear ambitions and the right mindset.", insight: "Starting with one focused track builds momentum.", path: "Your best courses are selected below.", courses: ["ai-tools", "start-business", "find-direction"], motivation: `${userName}, your journey starts today. One lesson at a time.` });
    } finally { setLoading(false); }
  }

  const recommended = report ? COURSES.filter(c => report.courses.includes(c.id)).slice(0, 3) : [];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #1e0a4e 100%)`, padding: "48px 24px 72px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: 2, marginBottom: 16 }}>YOUR PERSONAL LEARNING PLAN</div>
        {loading ? (<><Spinner color={C.accent} /><div style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 20 }}>Analysing your answers, {userName}...</div></>) : (
          <><div style={{ fontWeight: 900, fontSize: 28, color: "#fff", lineHeight: 1.25, marginBottom: 10 }}>{report.headline}</div><div style={{ color: C.accent, fontSize: 14, fontWeight: 700 }}>Built personally for {userName}</div></>
        )}
      </div>
      {!loading && report && (
        <div style={{ maxWidth: 560, margin: "-32px auto 0", padding: "0 16px 60px" }}>
          <div style={{ background: C.surface, borderRadius: 20, padding: 24, marginBottom: 14, border: `1.5px solid ${C.border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 1.5, marginBottom: 14 }}>YOUR PROFILE</div>
            <p style={{ color: C.textSoft, lineHeight: 1.75, fontSize: 15, margin: "0 0 14px" }}>{report.profile}</p>
            <div style={{ background: C.accentLight, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: C.textSoft, lineHeight: 1.6 }}>
              <strong style={{ color: C.accent }}>Key insight: </strong>{report.insight}
            </div>
          </div>
          <div style={{ background: C.primary, borderRadius: 20, padding: 24, marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, marginBottom: 12 }}>A NOTE FOR YOU</div>
            <p style={{ color: "#fff", fontSize: 15, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>{report.motivation}</p>
          </div>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.muted, letterSpacing: 1.5, marginBottom: 14, paddingLeft: 4 }}>YOUR TOP 3 RECOMMENDED COURSES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {recommended.map((c, i) => (
              <div key={c.id} style={{ background: C.surface, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${i === 0 ? c.color + "55" : C.border}`, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>7 days · ₦1,000</div>
                </div>
                {i === 0 && <span style={{ background: C.accentLight, color: C.accent, fontSize: 10, fontWeight: 800, padding: "4px 10px", borderRadius: 20, flexShrink: 0 }}>START HERE</span>}
              </div>
            ))}
          </div>
          <button onClick={() => onDone(report.courses)} style={{ width: "100%", background: C.accent, color: C.primary, border: "none", borderRadius: 14, padding: "18px 0", fontWeight: 900, fontSize: 18, cursor: "pointer" }}>
            Go to My Dashboard →
          </button>
        </div>
      )}
    </div>
  );
}

// ── COURSE CARD ────────────────────────────────────────────────
function CourseCard({ course, daysDone, unlocked, onStart, recommended }) {
  const pct = daysDone ? Math.round((daysDone / 7) * 100) : 0;
  const completed = daysDone >= 7;
  return (
    <div onClick={onStart} style={{ background: C.surface, borderRadius: 18, padding: 20, cursor: "pointer", border: `1.5px solid ${recommended ? course.color + "44" : C.border}`, transition: "all 0.2s", boxShadow: recommended ? `0 4px 20px ${course.color}18` : "0 1px 6px rgba(0,0,0,0.04)", position: "relative" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 28px ${course.color}28`; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = recommended ? `0 4px 20px ${course.color}18` : "0 1px 6px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "none"; }}>
      {completed && <div style={{ position: "absolute", top: 14, right: 14, background: C.greenLight, color: C.green, fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 20 }}>✓ Done</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ width: 50, height: 50, borderRadius: 14, background: course.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{course.icon}</div>
        <span style={{ background: course.bg, color: course.color, fontSize: 10, fontWeight: 800, padding: "3px 9px", borderRadius: 20, letterSpacing: 0.5 }}>{course.cat}</span>
      </div>
      <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 6 }}>{course.title}</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.55 }}>{course.desc}</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: 11, color: C.muted }}>📅 7 days</span>
        <span style={{ fontSize: 11, color: C.muted }}>🎧 Audio</span>
        <span style={{ fontSize: 11, color: C.muted }}>🎓 Certificate</span>
      </div>
      {daysDone > 0 && !completed ? (
        <><ProgressBar value={pct} color={course.color} /><div style={{ fontSize: 12, color: course.color, marginTop: 6, fontWeight: 700 }}>Day {daysDone}/7 · {pct}% done</div></>
      ) : completed ? (
        <div style={{ background: C.greenLight, color: C.green, borderRadius: 10, padding: "10px 0", textAlign: "center", fontWeight: 800, fontSize: 13 }}>View Certificate 🏆</div>
      ) : (
        <div style={{ background: course.color, color: "#fff", borderRadius: 10, padding: "11px 0", textAlign: "center", fontWeight: 800, fontSize: 14 }}>
          {unlocked ? "Continue →" : "Unlock · ₦1,000"}
        </div>
      )}
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────
export default function Coursia() {
  const [screen, setScreen] = useState("loading");
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [onboardStage, setOnboardStage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [activeCourse, setActiveCourse] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [progress, setProgress] = useState({});
  const [unlockedCourses, setUnlockedCourses] = useState({});
  const [streak, setStreak] = useState(1);
  const [showPaywall, setShowPaywall] = useState(null);
  const [certCourse, setCertCourse] = useState(null);
  const [toast, setToast] = useState(null);
  const [recommendedIds, setRecommendedIds] = useState([]);
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  // Check session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserData(session.user);
      } else {
        setScreen("auth");
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) { setScreen("auth"); setUser(null); }
    });
  }, []);

  async function loadUserData(u) {
    setUser(u);
    // Load profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", u.id).single();
    if (profile) {
      setUserName(profile.name || u.email.split("@")[0]);
      setStreak(profile.streak || 1);
    }
    // Load progress
    const { data: prog } = await supabase.from("progress").select("*").eq("user_id", u.id);
    if (prog) {
      const p = {};
      prog.forEach(r => { p[r.course_id] = r.day_completed; });
      setProgress(p);
    }
    // Load unlocked courses
    const { data: access } = await supabase.from("course_access").select("course_id").eq("user_id", u.id);
    if (access) {
      const ul = {};
      access.forEach(r => { ul[r.course_id] = true; });
      setUnlockedCourses(ul);
    }
    // Only show onboarding if not yet completed
    // Check onboarded flag OR if profile has a proper name saved (not just email prefix)
    const hasCompletedOnboarding = profile?.onboarded === true;
    if (!hasCompletedOnboarding) {
      setScreen("onboarding");
    } else {
      setScreen("home");
    }
  }

  async function handleAuth(u, name, email) {
    setUser(u);
    setUserName(name);
    setScreen("onboarding");
  }

  function handleOnboardOption(val) {
    const stage = ONBOARDING_STAGES[onboardStage];
    const next = { ...answers, [stage.id]: val };
    setAnswers(next);
    if (onboardStage < ONBOARDING_STAGES.length - 1) setOnboardStage(onboardStage + 1);
    else setScreen("report");
  }

  async function handleReportDone(ids) {
    setRecommendedIds(ids);
    // Mark onboarding complete — user goes straight to dashboard on next login
    if (user) {
      await supabase.from("profiles").update({ 
        onboarded: true,
        name: userName 
      }).eq("id", user.id);
    }
    setScreen("home");
  }

  async function handleCourseClick(course) {
    if ((progress[course.id] || 0) >= 7) { setCertCourse(course); return; }
    if (unlockedCourses[course.id]) { startCourse(course); return; }
    setShowPaywall(course);
  }

  async function handlePaySuccess(course) {
    setUnlockedCourses(u => ({ ...u, [course.id]: true }));
    setShowPaywall(null);
    setActiveCourse(course);
    setActiveDay(Math.min((progress[course.id] || 0) + 1, 7));
    setScreen("lesson");
  }

  function startCourse(course) {
    setActiveCourse(course);
    setActiveDay(Math.min((progress[course.id] || 0) + 1, 7));
    setScreen("lesson");
  }

  async function completeLesson() {
    const id = activeCourse.id;
    const done = (progress[id] || 0) + 1;
    setProgress(p => ({ ...p, [id]: done }));
    setStreak(s => s + 1);
    // Update streak in DB
    await supabase.from("profiles").update({ streak: streak + 1 }).eq("id", user.id);
    if (done >= 7) {
      setCertCourse(activeCourse);
      setScreen("home");
      setToast("🎓 Course complete! Certificate earned.");
    } else {
      setActiveDay(done + 1);
      setToast(`Day ${done} done! 🔥`);
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null); setScreen("auth");
  }

  const totalLessons = Object.values(progress).reduce((a, b) => a + b, 0);
  const inProgress = COURSES.filter(c => progress[c.id] > 0 && progress[c.id] < 7);
  const displayedCourses = COURSES.filter(c => {
    const matchCat = cat === "All" || c.cat === cat;
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // ── LOADING ──
  if (screen === "loading") return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.primary} 0%, #1e0a4e 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
      <div style={{ fontWeight: 900, fontSize: 32, color: C.accent, letterSpacing: -0.5 }}>coursia</div>
      <Spinner color={C.accent} />
    </div>
  );

  // ── AUTH ──
  if (screen === "auth") return <AuthScreen onAuth={handleAuth} />;

  // ── ONBOARDING ──
  if (screen === "onboarding") {
    const s = ONBOARDING_STAGES[onboardStage];
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.primary} 0%, #1e0a4e 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: C.surface, borderRadius: 24, padding: "32px 24px", maxWidth: 440, width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.muted }}>{onboardStage + 1} of {ONBOARDING_STAGES.length}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.purple }}>{Math.round((onboardStage / (ONBOARDING_STAGES.length - 1)) * 100)}%</span>
          </div>
          <ProgressBar value={(onboardStage / (ONBOARDING_STAGES.length - 1)) * 100} color={C.purple} height={5} />
          <div style={{ height: 24 }} />
          <div style={{ fontWeight: 900, fontSize: 22, color: C.text, marginBottom: 6 }}>{s.q}</div>
          <div style={{ color: C.muted, fontSize: 14, marginBottom: 22 }}>{s.sub}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {s.options.map(opt => (
              <button key={opt.value} onClick={() => handleOnboardOption(opt.value)}
                style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: "14px 16px", fontWeight: 700, fontSize: 14, color: C.text, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 12, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.border = `1.5px solid ${C.purple}`; e.currentTarget.style.background = C.purpleLight; }}
                onMouseLeave={e => { e.currentTarget.style.border = `1.5px solid ${C.border}`; e.currentTarget.style.background = C.bg; }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{opt.icon}</span>
                <div>
                  <div style={{ fontWeight: 800, color: C.text }}>{opt.label}</div>
                  <div style={{ fontWeight: 400, fontSize: 12, color: C.muted, marginTop: 2 }}>{opt.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── REPORT ──
  if (screen === "report") return <PersonalisationReport answers={answers} userName={userName} onDone={handleReportDone} />;

  // ── LESSON ──
  if (screen === "lesson" && activeCourse) return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "13px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 20, color: C.accent, letterSpacing: -0.5 }}>coursia</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff7ed", border: `1.5px solid #fed7aa`, borderRadius: 20, padding: "4px 12px" }}>
          <span>🔥</span><span style={{ fontWeight: 700, color: "#ea580c", fontSize: 13 }}>{streak}</span>
        </div>
      </div>
      <LessonView course={activeCourse} day={activeDay} user={user} userName={userName} onComplete={completeLesson} onBack={() => setScreen("home")} />
      {certCourse && <Certificate course={certCourse} userName={userName} onClose={() => setCertCourse(null)} />}
    </div>
  );

  // ── HOME ──
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
      {certCourse && <Certificate course={certCourse} userName={userName} onClose={() => setCertCourse(null)} />}
      {showPaywall && <Paywall course={showPaywall} user={user} onPay={handlePaySuccess} onClose={() => setShowPaywall(null)} />}

      {/* Nav */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ fontWeight: 900, fontSize: 22, color: C.accent, letterSpacing: -0.5 }}>coursia</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff7ed", border: `1.5px solid #fed7aa`, borderRadius: 20, padding: "4px 12px" }}>
            <span>🔥</span><span style={{ fontWeight: 700, color: "#ea580c", fontSize: 13 }}>{streak} day</span>
          </div>
          <div onClick={handleSignOut} title="Sign out" style={{ width: 36, height: 36, borderRadius: "50%", background: C.purple, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px 80px" }}>
        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #1e0a4e 100%)`, borderRadius: 22, padding: "28px 24px", marginBottom: 28, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 140, height: 140, borderRadius: "50%", background: `${C.accent}18` }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.4)", letterSpacing: 1.5, marginBottom: 8 }}>WELCOME BACK</div>
            <div style={{ fontWeight: 900, fontSize: 24, color: "#fff", marginBottom: 8 }}>Hey {userName} 👋</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginBottom: 24, lineHeight: 1.65 }}>
              {totalLessons === 0 ? "Your personalised plan is ready. Pick a course and begin." : `${totalLessons} lesson${totalLessons !== 1 ? "s" : ""} completed. Keep going — consistency is everything.`}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ l: "Lessons", v: totalLessons }, { l: "Streak", v: `${streak}d` }, { l: "Unlocked", v: Object.keys(unlockedCourses).length }, { l: "Completed", v: Object.values(progress).filter(d => d >= 7).length }].map(s => (
                <div key={s.l} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 14px", textAlign: "center", flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: 18, color: "#fff" }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continue */}
        {inProgress.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.text, marginBottom: 14 }}>Continue Learning</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {inProgress.map(c => (
                <div key={c.id} onClick={() => handleCourseClick(c)} style={{ background: C.surface, borderRadius: 16, padding: "16px 18px", border: `1.5px solid ${C.border}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: C.text, marginBottom: 6 }}>{c.title}</div>
                    <ProgressBar value={((progress[c.id] || 0) / 7) * 100} color={c.color} height={5} />
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Day {progress[c.id]} of 7 complete</div>
                  </div>
                  <div style={{ background: c.color, color: "#fff", borderRadius: 10, padding: "9px 14px", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>Day {(progress[c.id] || 0) + 1} →</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended */}
        {recommendedIds.length > 0 && inProgress.length === 0 && Object.keys(unlockedCourses).length === 0 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontWeight: 800, fontSize: 17, color: C.text, marginBottom: 4 }}>Recommended for You</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>Based on your personalised plan</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
              {COURSES.filter(c => recommendedIds.includes(c.id)).slice(0, 3).map(c => (
                <CourseCard key={c.id} course={c} daysDone={progress[c.id] || 0} unlocked={unlockedCourses[c.id]} onStart={() => handleCourseClick(c)} recommended />
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search 47 courses..."
          style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "12px 16px", fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", color: C.text, background: C.surface, marginBottom: 14 }} />

        {/* Category filter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto", paddingBottom: 4 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ background: cat === c ? C.primary : C.surface, color: cat === c ? "#fff" : C.textSoft, border: `1.5px solid ${cat === c ? C.primary : C.border}`, borderRadius: 20, padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>{c}</button>
          ))}
        </div>

        <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>
          {displayedCourses.length} course{displayedCourses.length !== 1 ? "s" : ""} {cat !== "All" ? `in ${cat}` : "available"} · ₦1,000 each
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
          {displayedCourses.map(c => (
            <CourseCard key={c.id} course={c} daysDone={progress[c.id] || 0} unlocked={unlockedCourses[c.id]} onStart={() => handleCourseClick(c)} />
          ))}
        </div>

        {displayedCourses.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: C.muted }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>No courses found</div>
            <div style={{ fontSize: 14 }}>Try a different search or category</div>
          </div>
        )}

        <div style={{ textAlign: "center", color: C.muted, fontSize: 12, marginTop: 48 }}>
          Coursia · AI-Powered Learning · Prices in Nigerian Naira
        </div>
      </div>
    </div>
  );
}
