/**
 * Conteúdo oficial da clínica. Textos, nomes e fotos vêm daqui.
 * Itens com `ativo: false` ficam ocultos.
 */

export const SITE_URL = "https://oespacoincluir.com.br";

export const clinic = {
  name: "Espaço Incluir",
  initials: "EI",
  cityLine: "Aimorés · Minas Gerais",
  whatsapp: {
    e164: "553399308345",
    display: "(33) 9930-8345",
    telephone: "+55-33-9930-8345",
    message: "Olá! Gostaria de agendar uma avaliação no Espaço Incluir.",
  },
  address: {
    street: "Avenida Doutor Renato Barbuto, 109",
    neighborhood: "Residencial Nilton Freire Sampaio",
    city: "Aimorés",
    state: "MG",
    mapsQuery:
      "Espaço Incluir, Avenida Doutor Renato Barbuto, 109, Residencial Nilton Freire Sampaio, Aimorés - MG",
  },
  hours: {
    days: "Segunda a sexta",
    time: "13h às 18h",
    opens: "13:00",
    closes: "18:00",
  },
  insurance: ["Unimed", "Cassi", "Particulares"],
} as const;

export const especialidades = [
  {
    nome: "Psicopedagogia",
    texto:
      "Avaliação e acompanhamento das dificuldades de aprendizagem, com plano terapêutico individual.",
    ativo: true,
  },
  {
    nome: "Psicologia",
    texto:
      "Cuidado emocional para crianças, adolescentes e famílias, em um espaço de escuta segura.",
    ativo: true,
  },
  {
    nome: "Fonoaudiologia",
    texto:
      "Linguagem, fala, comunicação e funções orais, com atenção ao ritmo de cada desenvolvimento.",
    ativo: true,
  },
  {
    nome: "Psicanálise",
    texto: "Escuta clínica para compreender sintomas, vínculos e a história de quem chega.",
    ativo: true,
  },
  {
    nome: "Terapia ABA",
    texto:
      "Intervenção em análise do comportamento aplicada, com metas claras e respeito à criança.",
    ativo: true,
  },
  {
    nome: "TCC",
    texto:
      "Terapia cognitivo-comportamental para regular emoções, pensamentos e condutas no cotidiano.",
    ativo: true,
  },
] as const;

export const equipe = [
  {
    titulo: "Dra.",
    nome: "Érica Vial",
    rotulo: "DIREÇÃO CLÍNICA",
    funcao: "Psicopedagoga e psicanalista · Mestrado",
    texto:
      "Referência da casa. Atendimento em psicopedagogia e psicanálise, com formação em mestrado e escuta atenta ao desenvolvimento de cada pessoa.",
    foto: "/images/team/erica-vial.jpg",
    ativo: true,
  },
  {
    titulo: "",
    nome: "Maria das Graças",
    rotulo: "",
    funcao: "Psicóloga",
    texto:
      "Cuidado psicológico para crianças, adolescentes e famílias — um espaço de escuta segura, com respeito ao tempo de cada um.",
    foto: "/images/team/maria-das-gracas.jpg",
    ativo: true,
  },
  {
    titulo: "",
    nome: "Rebeca Romilly",
    rotulo: "",
    funcao: "Fonoaudióloga",
    texto:
      "Linguagem, fala e comunicação. Acompanhamento fonoaudiológico no ritmo de cada desenvolvimento.",
    foto: "/images/team/rebeca-romilly.jpg",
    ativo: true,
  },
] as const;

export const audiences = [
  {
    id: "tea",
    title: "Autismo · TEA",
    text: "Acompanhamento especializado, no tempo e na linguagem de cada pessoa.",
  },
  {
    id: "tdah",
    title: "TDAH",
    text: "Suporte clínico para atenção, organização e regulação no dia a dia.",
  },
  {
    id: "aprendizagem",
    title: "Aprendizagem",
    text: "Cuidado para transtornos e dificuldades que atravessam a vida escolar.",
  },
  {
    id: "neuro",
    title: "Neurodesenvolvimento",
    text: "Olhar integrado sobre o desenvolvimento infantil e adolescente.",
  },
] as const;

export const faqs = [
  {
    q: "Quais especialidades vocês atendem?",
    a: "Psicopedagogia, psicologia, fonoaudiologia, psicanálise, terapia ABA e TCC.",
  },
  {
    q: "Atendem convênio?",
    a: "Sim: Unimed, Cassi e atendimento particular.",
  },
  {
    q: "Qual o horário de atendimento?",
    a: "Segunda a sexta, das 13h às 18h.",
  },
  {
    q: "Onde fica a clínica?",
    a: "Avenida Doutor Renato Barbuto, 109, Residencial Nilton Freire Sampaio, Aimorés, MG.",
  },
  {
    q: "Como agendar?",
    a: "Pelo WhatsApp ou pelo formulário desta página.",
  },
  {
    q: "Há atendimento em Libras e Braille?",
    a: "Sim, com comunicação inclusiva em Libras e Braille.",
  },
] as const;

export type EquipeItem = (typeof equipe)[number];
export type EspecialidadeItem = (typeof especialidades)[number];

export function activeTeam() {
  return equipe.filter((person) => person.ativo);
}

export function activeSpecialties() {
  return especialidades.filter((item) => item.ativo);
}

export function displayName(person: { titulo: string; nome: string }) {
  return [person.titulo, person.nome].filter(Boolean).join(" ");
}

export function mapsHref() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    clinic.address.mapsQuery,
  )}`;
}

export function mapsEmbedSrc() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(clinic.address.mapsQuery)}&z=17&output=embed`;
}

export function whatsappHref(message: string = clinic.whatsapp.message) {
  const text = encodeURIComponent(message);
  const phone = clinic.whatsapp.e164.trim();
  if (!phone) return `https://wa.me/?text=${text}`;
  return `https://wa.me/${phone}?text=${text}`;
}

export function specialtyWhatsappHref(nome: string) {
  return whatsappHref(`Olá! Tenho interesse em ${nome} no Espaço Incluir.`);
}

export function scheduleMessage(fields: {
  nome: string;
  idade: string;
  especialidade: string;
  convenio: string;
  periodo: string;
}) {
  const lines = ["Olá! Gostaria de agendar no Espaço Incluir."];
  if (fields.nome.trim()) lines.push(`Responsável: ${fields.nome.trim()}`);
  if (fields.idade.trim()) lines.push(`Idade: ${fields.idade.trim()}`);
  if (fields.especialidade.trim()) lines.push(`Especialidade: ${fields.especialidade.trim()}`);
  if (fields.convenio.trim()) lines.push(`Atendimento: ${fields.convenio.trim()}`);
  if (fields.periodo.trim()) lines.push(`Melhor período: ${fields.periodo.trim()}`);
  return lines.join("\n");
}
