import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, BookOpen, ArrowLeft, Clock, Instagram, Facebook, Minus } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { articles, type Article } from "@/data/devtone-articles";
import { apiFetch } from "@/lib/api";
import { SklyraLogo } from "./SklyraLogo";

type Msg = { role: "user" | "assistant"; content: string; timestamp: string };

const quickReplies = ["Qual o preço?", "Quais serviços?", "Quanto tempo leva?", "Quero um orçamento"];
const now = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

const playNotificationSound = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [editToken, setEditToken] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(true);
  const [activeTab, setActiveTab] = useState<"messages" | "articles">("messages");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [captchaToken] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open && started && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, started]);

  const saveConversation = useCallback(async (msgs: Msg[]) => {
    try {
      const response = await apiFetch<{ id: string; editToken?: string }>("/api/chats/save.php", {
        method: "POST",
        body: JSON.stringify({
          conversationId: conversationId ?? null,
          editToken: editToken ?? undefined,
          userName,
          userEmail: userEmail || null,
          messages: msgs.map((m) => ({ role: m.role, content: m.content, timestamp: m.timestamp })),
          turnstileToken: conversationId ? undefined : captchaToken || undefined,
        }),
      });
      if (!conversationId && response.id) setConversationId(response.id);
      if (!editToken && response.editToken) setEditToken(response.editToken);
    } catch {}
  }, [captchaToken, conversationId, editToken, userEmail, userName]);

  const handleStartChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;
    setStarted(true);
    setMessages([{ role: "assistant", content: `Olá, ${userName}! Como posso te ajudar?`, timestamp: now() }]);
  };

  const streamChat = useCallback(async (allMessages: Msg[]) => {
    setIsLoading(true);
    try {
      const response = await apiFetch<{ reply: string }>("/api/chats/reply.php", {
        method: "POST",
        body: JSON.stringify({
          messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
          userName,
        }),
      });

      setMessages((prev) => [...prev, { role: "assistant", content: response.reply, timestamp: now() }]);
      playNotificationSound();
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Desculpe, não consegui conectar. Tente novamente.", timestamp: now() }]);
    } finally {
      setIsLoading(false);
    }
  }, [userName]);

  useEffect(() => {
    if (started && messages.length > 1) {
      void saveConversation(messages);
    }
  }, [messages, saveConversation, started]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    if (isLoading) return;

    if (!text) setInput("");

    const userMsg: Msg = { role: "user", content: msg, timestamp: now() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    await streamChat(updated);
  };

  const glassBg = "rgba(12, 10, 20, 0.92)";
  const glassBorder = "rgba(255,255,255,0.06)";
  const cardBg = "rgba(20, 16, 32, 0.85)";
  const inputBg = "rgba(255,255,255,0.04)";
  const accentGradient = "linear-gradient(135deg, #2dd4a8, #73ffb8)";

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="fixed bottom-[90px] right-4 sm:bottom-6 sm:right-6 z-50 flex-col items-end gap-3 hidden sm:flex">
            {showInvite && (
              <div className="rounded-2xl w-[calc(100vw-32px)] sm:w-[340px] relative overflow-hidden hidden sm:block border" style={{ background: glassBg, borderColor: glassBorder }}>
                <div className="absolute top-3 right-3 flex items-center gap-1 z-10">
                  <button onClick={() => setShowInvite(false)} className="w-6 h-6 flex items-center justify-center rounded-full text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setShowInvite(false)} className="w-6 h-6 flex items-center justify-center rounded-full text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-start justify-between px-5 pt-5 pb-3">
                  <div className="flex-1">
                    <p className="text-[15px] font-bold text-white/90 leading-tight">Alguma pergunta? Fale conosco.</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[13px] text-white/40">Estamos online</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-5 pb-5 pt-2">
                  <button onClick={() => setOpen(true)} className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-white text-[14px] font-semibold flex-1 justify-center transition-all" style={{ background: accentGradient }}>
                    <MessageCircle className="w-4 h-4" />
                    Iniciar conversa
                  </button>
                </div>
              </div>
            )}
            <button onClick={() => setOpen(true)} className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105" style={{ background: accentGradient }} aria-label="Abrir chat">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed z-50 hidden sm:flex flex-col overflow-hidden sm:bottom-6 sm:right-6 sm:w-[400px] sm:max-w-[calc(100vw-48px)] sm:h-[680px] sm:max-h-[calc(100vh-80px)] sm:rounded-2xl border" style={{ background: glassBg, borderColor: glassBorder }}>
            <div className="flex items-center justify-between px-4 pt-3">
              <div className="flex items-center gap-1.5">
                <button onClick={() => { setActiveTab("messages"); setSelectedArticle(null); }} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${activeTab === "messages" ? "bg-white/10 text-white" : "text-white/40"}`}>Messages</button>
                <button onClick={() => { setActiveTab("articles"); setSelectedArticle(null); }} className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all flex items-center gap-1 ${activeTab === "articles" ? "bg-white/10 text-white" : "text-white/40"}`}>
                  <BookOpen className="w-3 h-3" />
                  Artigos
                </button>
              </div>
              <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/5 transition-colors" aria-label="Minimizar chat">
                <Minus className="w-4 h-4 text-white/50" />
              </button>
            </div>

            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden border" style={{ borderColor: glassBorder, background: "rgba(16,185,129,0.1)" }}>
                <SklyraLogo className="h-full w-full p-1" />
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-white/90 leading-tight">Sklyra AI Local</p>
                <p className="text-[12px] text-white/40">Online agora</p>
              </div>
            </div>

            {activeTab === "articles" ? (
              <div className="flex-1 overflow-y-auto" style={{ minHeight: 0, background: "rgba(8,6,16,0.5)" }}>
                {selectedArticle ? (
                  <div className="px-5 py-4">
                    <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-1.5 text-[13px] font-medium mb-4 transition-colors text-white/40 hover:text-white/70">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Voltar
                    </button>
                    <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">{selectedArticle.category}</span>
                    <h3 className="text-[16px] font-bold leading-tight mb-1 text-white/90">{selectedArticle.title}</h3>
                    <div className="flex items-center gap-1.5 text-[11px] mb-4 text-white/30">
                      <Clock className="w-3 h-3" />
                      {selectedArticle.readTime} de leitura
                    </div>
                    <div className="prose prose-sm prose-invert max-w-none text-[13px] leading-relaxed text-white/60">
                      <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="px-4 py-4 space-y-2">
                    <p className="text-[13px] font-semibold px-1 mb-2 text-white/60">Artigos estratégicos</p>
                    {articles.map((article) => (
                      <button key={article.id} onClick={() => setSelectedArticle(article)} className="w-full text-left p-3 rounded-xl border transition-all text-white/80" style={{ background: cardBg, borderColor: glassBorder }}>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">{article.category}</span>
                        <h4 className="text-[13px] font-semibold leading-tight mb-0.5">{article.title}</h4>
                        <p className="text-[11px] leading-snug line-clamp-2 text-white/30">{article.summary}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : !started ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8" style={{ background: "rgba(8,6,16,0.5)" }}>
                <h3 className="text-lg font-bold mb-1 text-white/90">Dúvidas? Fale conosco.</h3>
                <p className="text-sm mb-6 text-center text-white/40">Preencha abaixo para iniciar a conversa.</p>
                <form onSubmit={handleStartChat} className="w-full space-y-3">
                  <input type="text" placeholder="Seu nome *" value={userName} onChange={(e) => setUserName(e.target.value)} required className="w-full px-4 py-3 rounded-xl text-sm border text-white/90 placeholder:text-white/25" style={{ background: inputBg, borderColor: glassBorder }} />
                  <input type="email" placeholder="Seu e-mail (opcional)" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm border text-white/90 placeholder:text-white/25" style={{ background: inputBg, borderColor: glassBorder }} />
                  <button type="submit" className="w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: accentGradient }}>
                    Iniciar conversa
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5" style={{ minHeight: 0, background: "rgba(8,6,16,0.5)" }}>
                  {messages.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2.5 mb-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                      {m.role === "assistant" && (
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border flex items-center justify-center" style={{ borderColor: glassBorder, background: cardBg }}>
                          <SklyraLogo alt="" className="h-full w-full p-0.5" />
                        </div>
                      )}
                      <div className="flex flex-col gap-1">
                        <div className={`max-w-[260px] px-4 py-3 text-[14px] leading-relaxed ${m.role === "user" ? "text-white rounded-2xl rounded-br-md" : "rounded-2xl rounded-bl-md border text-white/80"}`} style={m.role === "user" ? { background: accentGradient } : { background: cardBg, borderColor: glassBorder }}>
                          {m.role === "assistant" ? (
                            <div className="prose prose-sm prose-invert max-w-none [&>p]:m-0 [&>p+p]:mt-2 text-white/70">
                              <ReactMarkdown components={{
                                a: ({ href, children }) => {
                                  const isInstagram = href?.includes("instagram.com");
                                  const isFacebook = href?.includes("facebook.com");
                                  if (isInstagram || isFacebook) {
                                    return (
                                      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 my-1 rounded-xl border text-white/90 no-underline" style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
                                        {isInstagram && <Instagram className="w-4 h-4 text-pink-400 flex-shrink-0" />}
                                        {isFacebook && <Facebook className="w-4 h-4 text-blue-400 flex-shrink-0" />}
                                        <span className="text-[13px]">{children}</span>
                                      </a>
                                    );
                                  }
                                  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">{children}</a>;
                                }
                              }}>{m.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <span>{m.content}</span>
                          )}
                        </div>
                        <span className={`text-[10px] text-white/25 ${m.role === "user" ? "text-right" : ""}`}>{m.timestamp}</span>
                      </div>
                    </motion.div>
                  ))}

                  {messages.length === 1 && !isLoading && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {quickReplies.map((qr) => (
                        <button key={qr} onClick={() => void send(qr)} className="px-3 py-1.5 rounded-lg text-[12px] font-medium border text-emerald-400/80" style={{ borderColor: glassBorder, background: "rgba(16,185,129,0.05)" }}>
                          {qr}
                        </button>
                      ))}
                    </div>
                  )}

                  {isLoading && (
                    <div className="flex gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border flex items-center justify-center" style={{ borderColor: glassBorder, background: cardBg }}>
                        <SklyraLogo alt="" className="h-full w-full p-0.5" />
                      </div>
                      <div className="px-4 py-3 rounded-2xl rounded-bl-md border" style={{ background: cardBg, borderColor: glassBorder }}>
                        <span className="text-white/40 text-sm">Digitando...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-shrink-0 border-t" style={{ borderColor: glassBorder, background: "rgba(12,10,20,0.6)" }}>
                  <div className="px-4 pt-3 pb-2">
                    <textarea
                      ref={inputRef as any}
                      placeholder="Escreva sua mensagem..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void send();
                        }
                      }}
                      disabled={isLoading}
                      rows={1}
                      className="w-full text-[14px] placeholder:text-white/20 focus:outline-none resize-none disabled:opacity-50 bg-transparent text-white/80"
                    />
                  </div>
                  <div className="flex items-center justify-end px-3 pb-3">
                    <button onClick={() => void send()} disabled={isLoading || !input.trim()} className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-20" style={{ background: accentGradient }} aria-label="Enviar">
                      <Send className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
