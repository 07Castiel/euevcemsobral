import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Mail, Camera, Star, Calendar, Plane, Home, Infinity as InfinityIcon } from "lucide-react";
import heroImg from "@/assets/couple-hero.jpg";
import coracaoAsset from "@/assets/coracao.jpg.asset.json";
const coracaoImg = coracaoAsset.url;

export const Route = createFileRoute("/")({
  component: Index,
});

// ============ CONTEÚDO EDITÁVEL ============
const COUPLE = { he: "Leonardo Gabriel", she: "Maria Greiciane" };
const START_DATE = new Date("2024-10-21T00:00:00");

const TIMELINE: Array<{ date: string; title: string; text: string; img: string; video?: string }> = [
  { date: "21 / 10 / 2024", title: "O dia em que nos conhecemos", text: "Onde tudo começou. Um simples encontro que mudaria o rumo da minha história." , img: heroImg },
  { date: "24 / 10 / 2024", title: "Nosso primeiro beijo", text: "O momento em que percebi que algo extraordinário estava nascendo entre nós.", img: heroImg },
  { date: "24 / 12 / 2024", title: "O início do nosso amor", text: "Na véspera de Natal, ganhei o melhor presente: você, oficialmente comigo.", img: heroImg, video: "" },
  { date: "12 / 06 / 2026", title: "O pedido oficial", text: "Hoje, diante de tudo que vivemos, eu te peço para sermos oficialmente um.", img: heroImg },
];

const POEMS = [
  { title: "Para você", body: "Se o tempo me perguntasse\nonde eu quero estar,\neu diria: nos seus olhos,\nno seu colo, no seu mar.\n\nSe a vida me oferecesse\ntodos os mundos pra escolher,\neu escolheria todos eles\nse fossem feitos de você." },
  { title: "Sobre nós", body: "Não foi amor à primeira vista,\nfoi amor a cada vista nova.\nA cada conversa, a cada risada,\nminha certeza ficou maior.\n\nVocê é o poema que eu nunca soube escrever\ne agora vive em mim, em cada verso do meu peito." },
  { title: "Promessa", body: "Prometo ser abrigo nos dias difíceis,\nfesta nos dias bonitos,\ne calmaria em todos os outros.\nVocê é a minha pessoa.\nE eu, com sorte, sou a sua." },
];

const MEANINGS = [
  "Você trouxe mais cor para minha vida.",
  "Você transformou momentos simples em lembranças inesquecíveis.",
  "Você se tornou uma das pessoas mais importantes da minha história.",
  "Você me faz acreditar em um futuro melhor.",
  "Você é o meu lugar seguro em qualquer lugar do mundo.",
  "Você me ensinou o que é amar de verdade.",
];

const DREAMS = [
  { icon: Plane, title: "Viajar juntos", text: "Conhecer o mundo de mãos dadas." },
  { icon: Sparkles, title: "Crescer juntos", text: "Evoluir lado a lado, todos os dias." },
  { icon: Home, title: "Construir um lar", text: "Um cantinho nosso, cheio de memórias." },
  { icon: Star, title: "Realizar sonhos", text: "Cada objetivo conquistado a dois." },
  { icon: Camera, title: "Criar memórias", text: "Encher um álbum infinito da nossa história." },
  { icon: InfinityIcon, title: "Amar para sempre", text: "E descobrir que sempre é pouco." },
];

const WALL = [
  { date: "21/10/24", text: "O primeiro olhar" },
  { date: "24/10/24", text: "O primeiro beijo" },
  { date: "Nov 24", text: "Nossa primeira viagem" },
  { date: "Dez 24", text: "O sim que mudou tudo" },
  { date: "Jan 25", text: "Risadas sem fim" },
  { date: "Fev 25", text: "Aprendendo a ser nós" },
  { date: "Mar 25", text: "Os pequenos momentos" },
  { date: "Mai 25", text: "Os abraços demorados" },
  { date: "Jul 25", text: "Madrugadas conversando" },
  { date: "Set 25", text: "Cumplicidade que cresce" },
  { date: "Dez 25", text: "Mais um Natal nosso" },
  { date: "Jun 26", text: "Hoje, e para sempre" },
];

// Placeholders para galeria — facilmente substituíveis
const GALLERY = [
  { src: coracaoImg, caption: "Nosso coração", date: "" },
  ...Array.from({ length: 39 }, (_, i) => ({
    src: heroImg,
    caption: `Memória ${i + 2}`,
    date: "",
  })),
];

const LETTER = `Minha Maria,

Sentar e escrever para você é tentar caber em palavras aquilo que só meu peito sabe sentir. Desde o dia em que você apareceu na minha vida, tudo passou a ter uma cor diferente, um sentido novo, uma direção que finalmente faz sentido pra mim.

Você me ensinou que amar é simples quando a pessoa certa chega. É no jeito que você ri, no jeito que você me olha, no jeito que você me escuta — em cada detalhe seu eu encontro um motivo pra te amar ainda mais.

Obrigado por cada conversa, cada abraço, cada silêncio bom ao seu lado. Obrigado por ser exatamente quem você é, sem precisar mudar nada. Você é o presente que eu nem sabia que poderia receber.

Hoje, depois de tudo que vivemos, eu te peço algo que meu coração já sabe há muito tempo: vamos oficializar essa história? Vamos seguir escrevendo, capítulo por capítulo, esse livro que começou no dia em que nossos olhos se cruzaram pela primeira vez?

Eu te escolho. Hoje, amanhã e em todos os dias que virão.

Para sempre seu,
Leonardo ❤️`;

// ============ COMPONENTES ============
function FloatingHearts() {
  const hearts = useMemo(
    () => Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 12 + Math.random() * 12,
      size: 10 + Math.random() * 16,
      opacity: 0.15 + Math.random() * 0.35,
    })), []);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map(h => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: 0,
            fontSize: h.size,
            opacity: h.opacity,
            animation: `float-heart ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >❤</span>
      ))}
    </div>
  );
}

function useCountdown(from: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = now.getTime() - from.getTime();
  const totalSec = Math.floor(diff / 1000);
  const minutes = Math.floor(totalSec / 60) % 60;
  const hours = Math.floor(totalSec / 3600) % 24;
  const totalDays = Math.floor(totalSec / 86400);
  let years = now.getFullYear() - from.getFullYear();
  let months = now.getMonth() - from.getMonth();
  let days = now.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    const prev = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) { years -= 1; months += 12; }
  return { years, months, days, hours, minutes, totalDays };
}

function Opening({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 text-center z-10"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden glass mb-8 shadow-2xl"
      >
        <img src={coracaoImg} alt="Nós dois" className="w-full h-full object-cover" />
        <div className="absolute inset-0 ring-1 ring-white/20 rounded-full" />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-4xl sm:text-6xl md:text-7xl font-display max-w-3xl leading-tight text-gradient-rose"
      >
        Uma história que mudou a minha vida
      </motion.h1>
      <motion.p
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-6 font-script text-3xl sm:text-5xl text-rose"
        style={{ color: "var(--rose)" }}
      >
        Para Maria Greiciane <Heart className="inline w-7 h-7 fill-current" />
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground italic"
      >
        Uma pequena viagem pelas lembranças mais importantes da nossa história.
      </motion.p>
      <motion.button
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-12 px-10 py-4 rounded-full bg-gradient-to-r from-[var(--rose)] to-[var(--gold)] text-background font-semibold tracking-wide shadow-xl hover:shadow-2xl transition-shadow"
      >
        Começar ❤
      </motion.button>
      <motion.div
        animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 text-muted-foreground text-sm"
      >
        ↓ role para baixo
      </motion.div>
    </motion.section>
  );
}

function SectionTitle({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.8 }}
      className="text-center mb-12 sm:mb-16"
    >
      {kicker && <p className="font-script text-2xl sm:text-3xl text-[var(--rose)] mb-2">{kicker}</p>}
      <h2 className="text-3xl sm:text-5xl font-display text-gradient-rose">{title}</h2>
      <div className="mx-auto mt-4 w-24 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
    </motion.div>
  );
}

function Timeline() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle kicker="capítulo um" title="Nossa História" />
      <div className="relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--rose)] to-transparent" />
        {TIMELINE.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}
            className={`relative mb-16 sm:mb-24 flex flex-col sm:flex-row ${i % 2 ? "sm:flex-row-reverse" : ""} gap-6 sm:gap-12 items-start`}
          >
            <div className="absolute left-4 sm:left-1/2 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--rose)] ring-4 ring-background shadow-[0_0_20px_var(--rose)]" />
            <div className="pl-12 sm:pl-0 sm:w-1/2">
              <div className="glass rounded-2xl overflow-hidden">
                {e.video ? (
                  <video
                    src={e.video}
                    className="w-full h-56 object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <img src={e.img} alt={e.title} className="w-full h-56 object-cover" loading="lazy" />
                )}
              </div>
            </div>
            <div className="pl-12 sm:pl-0 sm:w-1/2">
              <p className="font-script text-2xl text-[var(--gold)]">{e.date}</p>
              <h3 className="text-2xl sm:text-3xl font-display mt-2">{e.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{e.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
      <SectionTitle kicker="lembranças" title="Galeria de Memórias" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {GALLERY.map((p, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: (i % 10) * 0.04 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => setActive(i)}
            className="group relative aspect-square overflow-hidden rounded-xl glass"
          >
            <img src={p.src} alt={p.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <span className="text-xs text-white/90 font-script text-lg">{p.caption}</span>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9 }}
              className="max-w-4xl w-full"
            >
              <img src={GALLERY[active].src} alt={GALLERY[active].caption} className="w-full max-h-[80vh] object-contain rounded-2xl" />
              <p className="mt-4 text-center font-script text-2xl text-[var(--rose)]">{GALLERY[active].caption}</p>
              {GALLERY[active].date && <p className="text-center text-sm text-muted-foreground">{GALLERY[active].date}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Poems() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle kicker="versos do meu peito" title="Poemas" />
      <div className="grid md:grid-cols-2 gap-6">
        {POEMS.map((p, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, delay: i * 0.1 }}
            className="glass rounded-3xl p-8 sm:p-10 hover:shadow-2xl transition-shadow"
          >
            <h3 className="font-script text-3xl text-[var(--rose)] mb-4">{p.title}</h3>
            <p className="whitespace-pre-line text-foreground/90 leading-relaxed italic">{p.body}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Meanings() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
      <SectionTitle kicker="o que você é pra mim" title="O Que Você Significa" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {MEANINGS.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            <Heart className="absolute -right-4 -top-4 w-20 h-20 text-[var(--rose)] opacity-10" />
            <p className="text-lg leading-relaxed">{m}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Counter() {
  const c = useCountdown(START_DATE);
  const items = [
    { label: "Anos", value: c.years },
    { label: "Meses", value: c.months },
    { label: "Dias", value: c.days },
    { label: "Horas", value: c.hours },
    { label: "Minutos", value: c.minutes },
  ];
  return (
    <section className="relative z-10 py-24 px-6 max-w-5xl mx-auto">
      <SectionTitle kicker="cada segundo importa" title="Nosso Tempo Juntos" />
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        {items.map(i => (
          <motion.div
            key={i.label}
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 text-center"
          >
            <div className="text-4xl sm:text-5xl font-display text-gradient-rose tabular-nums">{i.value}</div>
            <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-widest mt-2">{i.label}</div>
          </motion.div>
        ))}
      </div>
      <p className="text-center mt-8 text-muted-foreground font-script text-2xl">
        e contando, infinitamente... ❤
      </p>
    </section>
  );
}

function TypedLetter({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const speed = 18;
    const t = setInterval(() => {
      i += 2;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return <p className="whitespace-pre-line leading-relaxed text-foreground/95 text-base sm:text-lg">{shown}<span className="animate-pulse">|</span></p>;
}

function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <section className="relative z-10 py-24 px-6 max-w-3xl mx-auto">
      <SectionTitle kicker="das minhas mãos para o seu coração" title="A Carta" />
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="env"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.03, rotate: -1 }}
              onClick={() => setOpen(true)}
              className="relative w-full max-w-md aspect-[3/2] glass rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--rose)]/20 to-[var(--gold)]/10" />
              <Mail className="w-20 h-20 text-[var(--gold)]" />
              <div className="absolute bottom-4 text-sm text-muted-foreground">toque para abrir</div>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl p-8 sm:p-12 w-full"
            >
              <TypedLetter text={LETTER} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Dreams() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
      <SectionTitle kicker="o que ainda vamos viver" title="Nossos Sonhos" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DREAMS.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-7 group"
          >
            <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[var(--rose)]/30 to-[var(--gold)]/20 mb-4 group-hover:scale-110 transition-transform">
              <d.icon className="w-6 h-6 text-[var(--rose)]" />
            </div>
            <h3 className="text-xl font-display">{d.title}</h3>
            <p className="text-muted-foreground mt-2">{d.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Wall() {
  return (
    <section className="relative z-10 py-24 px-6 max-w-6xl mx-auto">
      <SectionTitle kicker="mural" title="Momentos" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {WALL.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, rotate: -2 + Math.random() * 4 }}
            whileInView={{ opacity: 1, rotate: -2 + Math.random() * 4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="glass rounded-xl overflow-hidden"
          >
            <img src={heroImg} alt={m.text} className="w-full h-32 object-cover" loading="lazy" />
            <div className="p-3">
              <div className="font-script text-lg text-[var(--rose)]">{m.text}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" />{m.date}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Finale() {
  const [step, setStep] = useState(0); // 0 lines, 1 button, 2 name, 3 question, 4 answer
  const lines = [
    "Depois de tantas conversas...",
    "Depois de tantos sorrisos...",
    "Depois de tantos momentos inesquecíveis...",
    "Depois de 1 ano, 7 meses e 21 dias construindo nossa história...",
    "Existe uma pergunta guardada no meu coração há muito tempo.",
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (step !== 0) return;
    if (shown >= lines.length) { setStep(1); return; }
    const t = setTimeout(() => setShown(s => s + 1), 2200);
    return () => clearTimeout(t);
  }, [shown, step]);

  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => setStep(3), 2200);
      return () => clearTimeout(t);
    }
  }, [step]);

  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const dodgeNo = () => {
    setNoPos({ x: (Math.random() - 0.5) * 300, y: (Math.random() - 0.5) * 200 });
    setYesScale(s => Math.min(s + 0.1, 2));
  };

  return (
    <section className="relative z-10 min-h-[100svh] flex items-center justify-center px-6 py-24 bg-gradient-to-b from-transparent via-black/40 to-black/80 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {step >= 3 && Array.from({ length: 30 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: "110vh", x: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6 + Math.random() * 5, delay: Math.random() * 3, repeat: Infinity }}
            className="absolute text-[var(--rose)]"
            style={{ fontSize: 14 + Math.random() * 24 }}
          >❤</motion.span>
        ))}
      </div>

      <div className="relative max-w-3xl w-full text-center">
        {step === 0 && (
          <div className="space-y-8">
            {lines.slice(0, shown).map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.4 }}
                className="text-xl sm:text-3xl font-display italic"
              >{l}</motion.p>
            ))}
          </div>
        )}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <p className="text-xl sm:text-2xl text-muted-foreground italic mb-10">Está pronta para escutar?</p>
            <button
              onClick={() => setStep(2)}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[var(--rose)] to-[var(--gold)] text-background font-semibold shadow-2xl hover:scale-105 transition-transform"
            >Continuar ❤</button>
          </motion.div>
        )}
        {step === 2 && (
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="font-script text-5xl sm:text-7xl text-gradient-rose"
          >Maria Greiciane<br />Floriano Lima</motion.h2>
        )}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}
          >
            <div className="glass rounded-3xl p-6 mb-8 max-w-xs mx-auto">
              <img src={heroImg} alt="Nós" className="w-full aspect-square object-cover rounded-2xl" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-display text-gradient-rose leading-tight">
              Você aceita namorar comigo, oficialmente?
            </h2>
            <div className="mt-10 flex items-center justify-center gap-6 flex-wrap relative h-32">
              <motion.button
                style={{ scale: yesScale }}
                whileHover={{ scale: yesScale * 1.05 }}
                onClick={() => setStep(4)}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-[var(--rose)] to-[var(--gold)] text-background font-semibold shadow-2xl"
              >Sim ❤</motion.button>
              <motion.button
                animate={noPos}
                transition={{ type: "spring", stiffness: 200 }}
                onMouseEnter={dodgeNo}
                onClick={dodgeNo}
                className="px-8 py-3 rounded-full glass text-muted-foreground"
              >Não</motion.button>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
            className="space-y-8"
          >
            <Heart className="w-20 h-20 mx-auto fill-[var(--rose)] text-[var(--rose)] animate-pulse" />
            <h2 className="font-script text-5xl sm:text-7xl text-gradient-rose">
              Para sempre, nós.
            </h2>
            <p className="text-xl sm:text-2xl italic max-w-xl mx-auto leading-relaxed">
              "Eu escolho você hoje, amanhã e em todos os dias que virão."
            </p>
            <p className="font-script text-3xl text-[var(--gold)]">
              Com amor, Leonardo ❤
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Index() {
  const [started, setStarted] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    setStarted(true);
    setTimeout(() => mainRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <div className="relative">
      <FloatingHearts />
      <Opening onStart={handleStart} />
      <AnimatePresence>
        {started && (
          <motion.div
            ref={mainRef}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          >
            <Timeline />
            <Gallery />
            <Poems />
            <Meanings />
            <Counter />
            <Letter />
            <Dreams />
            <Wall />
            <Finale />
            <footer className="relative z-10 py-12 text-center text-muted-foreground text-sm">
              <p>Feito com <Heart className="inline w-4 h-4 fill-[var(--rose)] text-[var(--rose)]" /> por {COUPLE.he} para {COUPLE.she}</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
