import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Rola até a âncora sem trocar o hash — o hash fazia a página voltar ao topo. */
export function scrollToHash(event: {
  preventDefault: () => void;
  currentTarget: HTMLAnchorElement;
}) {
  const href = event.currentTarget.getAttribute("href") ?? "";
  const hashIndex = href.indexOf("#");
  if (hashIndex < 0) return;
  const id = href.slice(hashIndex + 1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  const url = new URL(href, window.location.href);
  if (url.pathname !== window.location.pathname) return;
  event.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

/** Caminho com o prefixo do site (BASE_PATH). Ex.: withBase("/images/a.jpg"). */
export function withBase(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, "");
}
