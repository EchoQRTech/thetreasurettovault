"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Tag,
  FileText,
  TrendingUp,
  Send,
  Menu,
  X,
  PlusCircle,
  ImageIcon,
  XCircle,
} from "lucide-react";

/* ---------- TOOL LIST ---------- */
const tools = [
  {
    name: "Title Genius",
    icon: <Sparkles className="w-5 h-5" />,
    desc: "Generate high-converting listing titles instantly.",
  },
  {
    name: "Price Predictor",
    icon: <Tag className="w-5 h-5" />,
    desc: "Suggest optimal resale prices using data.",
  },
  {
    name: "Listing Writer",
    icon: <FileText className="w-5 h-5" />,
    desc: "Create polished item descriptions and templates.",
  },
  {
    name: "Trend Finder",
    icon: <TrendingUp className="w-5 h-5" />,
    desc: "Track trending brands and categories in real time.",
  },
];

export default function VaultAIPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTool, setActiveTool] = useState(tools[0]);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; image?: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------- HANDLE SEND ---------- */
  const handleSend = async (e: any) => {
    e.preventDefault();
    if (!input.trim() && !image) return;

    const userMessage = { role: "user", content: input, image: image || undefined };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setImage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: "user", content: input },
          ],
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "⚠️ No response from Vault AI." },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-gradient-to-br from-[#fff8f9] via-[#fff5f7] to-[#fff0f3] text-[#0a0a0a] font-sans">
      {/* ---------- SIDEBAR ---------- */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 z-40 bg-white/60 backdrop-blur-3xl border-r border-white/40 shadow-[10px_0_45px_rgba(0,0,0,0.06)] flex flex-col transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/30">
          <motion.img
            src="/images/logo.png"
            alt="Vault Logo"
            className="w-10 h-10 object-contain drop-shadow-lg cursor-pointer"
            whileHover={{
              scale: 1.08,
              rotate: 3,
              filter: "drop-shadow(0 0 12px rgba(203,175,122,0.6))",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <button
            className="md:hidden text-gray-500 hover:text-[#A00028]"
            onClick={() => setMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* New Chat */}
        <button
          onClick={() => setMessages([])}
          className="flex items-center gap-2 justify-center mx-5 mt-5 mb-6 py-2 rounded-xl bg-gradient-to-r from-[#A00028] to-[#C44D5C] hover:from-[#C44D5C] hover:to-[#CBAF7A] text-white font-medium shadow-[0_0_25px_rgba(160,0,40,0.3)] transition"
        >
          <PlusCircle className="w-4 h-4" /> New Chat
        </button>

        {/* Tools */}
        <nav className="flex flex-col gap-2 px-4 overflow-y-auto">
          {tools.map((tool) => (
            <motion.button
              key={tool.name}
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveTool(tool)}
              className={`flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all ${
                activeTool.name === tool.name
                  ? "bg-gradient-to-r from-[#A00028]/20 to-[#CBAF7A]/10 text-[#A00028] font-semibold shadow-inner"
                  : "hover:bg-[#A00028]/10 text-gray-700"
              }`}
            >
              {tool.icon}
              <div className="flex flex-col">
                <span>{tool.name}</span>
                <span className="text-[11px] text-gray-500">{tool.desc}</span>
              </div>
            </motion.button>
          ))}
        </nav>

        <div className="mt-auto px-6 py-6 text-xs text-gray-400 border-t border-white/40">
          © {new Date().getFullYear()} Vault AI by Treasuretto
        </div>
      </aside>

      {/* ---------- MOBILE NAV ---------- */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between px-5 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100 md:hidden z-50">
        <motion.img
          src="/images/logo.png"
          alt="Vault Logo"
          className="w-8 h-8"
          whileHover={{ scale: 1.05 }}
        />
        <button
          onClick={() => setMenuOpen(true)}
          className="text-gray-700 hover:text-[#A00028]"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* ---------- MAIN CHAT AREA ---------- */}
      <section className="flex flex-col flex-1 h-full overflow-hidden relative">
        {/* Empty State */}
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            >
              <h1 className="text-3xl sm:text-4xl font-semibold text-[#0a0a0a] mb-2">
                Where should we begin?
              </h1>
              <p className="text-gray-500 text-sm sm:text-base max-w-md">
                Ask anything — or upload an image to analyze with Vault AI.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pt-24 md:pt-10 pb-40 space-y-5">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-5 py-3 rounded-2xl leading-relaxed text-sm sm:text-base shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#A00028]/10 text-[#A00028] rounded-br-none"
                      : "bg-white/90 border border-[#A00028]/10 text-gray-800 rounded-bl-none backdrop-blur-md"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="uploaded"
                      className="rounded-xl mb-3 w-full max-h-64 object-cover"
                    />
                  )}
                  {msg.content}
                </div>
              </motion.div>
            ))}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="px-5 py-3 rounded-2xl bg-white/80 border border-[#A00028]/10 text-gray-600 text-sm shadow-sm backdrop-blur-md">
                  <span className="animate-pulse">Vault AI is thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ---------- INPUT ---------- */}
        <form
          onSubmit={handleSend}
          className="fixed bottom-0 left-0 right-0 md:left-64 flex items-center gap-3 bg-white/90 backdrop-blur-2xl border-t border-[#A00028]/10 px-4 md:px-10 py-4"
        >
          {image && (
            <div className="relative">
              <img
                src={image}
                alt="preview"
                className="w-12 h-12 rounded-lg object-cover border border-gray-200"
              />
              <button
                onClick={() => setImage(null)}
                type="button"
                className="absolute -top-2 -right-2 bg-[#A00028] text-white rounded-full p-[2px]"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}

          <label className="cursor-pointer text-gray-500 hover:text-[#A00028] transition">
            <ImageIcon className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask ${activeTool.name} or upload an image...`}
            className="flex-1 bg-white/70 border border-[#A00028]/20 text-gray-700 placeholder-gray-400 rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#A00028]/40 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#A00028] to-[#C44D5C] hover:from-[#C44D5C] hover:to-[#CBAF7A] text-white rounded-full p-3 shadow-[0_0_20px_rgba(160,0,40,0.4)] transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </section>
    </main>
  );
}
