import { useEffect, useState } from "react";

const KEY = "ei-a11y";

type Prefs = {
  scale: number;
  contrast: boolean;
  links: boolean;
  motion: boolean;
};

const DEFAULTS: Prefs = { scale: 100, contrast: false, links: false, motion: false };

function readPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function applyPrefs(prefs: Prefs) {
  const root = document.documentElement;
  root.style.fontSize = `${prefs.scale}%`;
  root.dataset.contrast = prefs.contrast ? "high" : "";
  root.dataset.links = prefs.links ? "underline" : "";
  root.dataset.motion = prefs.motion ? "off" : "";
}

export function A11yPanel() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const stored = readPrefs();
    setPrefs(stored);
    applyPrefs(stored);
    const toggle = () => setOpen((value) => !value);
    window.addEventListener("ei-a11y-open", toggle);
    return () => window.removeEventListener("ei-a11y-open", toggle);
  }, []);

  function update(next: Prefs) {
    setPrefs(next);
    applyPrefs(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  function speak() {
    const main = document.getElementById("conteudo") ?? document.body;
    const text = main.innerText.replace(/\s+/g, " ").trim();
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className="fixed bottom-24 left-3 z-50 lg:bottom-5">
      <button
        type="button"
        className="hidden size-11 place-items-center rounded-full border border-line bg-surface text-sm font-semibold text-ink shadow-card lg:grid"
        aria-expanded={open}
        aria-controls="painel-acessibilidade"
        onClick={() => setOpen((value) => !value)}
      >
        Aa
        <span className="sr-only">Acessibilidade</span>
      </button>
      {open ? (
        <div
          id="painel-acessibilidade"
          className="absolute bottom-14 left-0 w-64 rounded-[20px] border border-line bg-surface p-4 text-ink shadow-lift"
        >
          <p className="text-sm font-semibold">Acessibilidade</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="min-h-11 flex-1 rounded-md border border-line text-sm font-medium"
              onClick={() => update({ ...prefs, scale: Math.max(100, prefs.scale - 10) })}
            >
              A−
            </button>
            <button
              type="button"
              className="min-h-11 flex-1 rounded-md border border-line text-sm font-medium"
              onClick={() => update({ ...prefs, scale: Math.min(150, prefs.scale + 10) })}
            >
              A+
            </button>
          </div>
          <p className="mt-1 text-sm text-ink-soft">Fonte {prefs.scale}%</p>
          <Toggle
            label="Alto contraste"
            checked={prefs.contrast}
            onChange={(contrast) => update({ ...prefs, contrast })}
          />
          <Toggle
            label="Sublinhar links"
            checked={prefs.links}
            onChange={(links) => update({ ...prefs, links })}
          />
          <Toggle
            label="Pausar animações"
            checked={prefs.motion}
            onChange={(motion) => update({ ...prefs, motion })}
          />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button type="button" className="min-h-11 rounded-md bg-accent text-sm text-accent-fg" onClick={speak}>
              Ouvir
            </button>
            <button
              type="button"
              className="min-h-11 rounded-md border border-line text-sm"
              onClick={() => {
                if (!window.speechSynthesis) return;
                if (window.speechSynthesis.paused) window.speechSynthesis.resume();
                else window.speechSynthesis.pause();
              }}
            >
              {speaking ? "Pausar" : "Pausar"}
            </button>
            <button
              type="button"
              className="min-h-11 rounded-md border border-line text-sm"
              onClick={() => {
                window.speechSynthesis?.cancel();
                setSpeaking(false);
              }}
            >
              Parar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="mt-3 flex min-h-11 items-center justify-between gap-3 text-sm">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-5 accent-accent"
      />
    </label>
  );
}
