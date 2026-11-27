import {
  Accessibility,
  ArrowUpRight,
  BookOpen,
  Brain,
  ClipboardCheck,
  Clock,
  Ear,
  HeartHandshake,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { ScheduleForm } from "@/components/schedule-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MobileActions } from "@/components/mobile-actions";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import {
  SITE_URL,
  activeSpecialties,
  activeTeam,
  audiences,
  clinic,
  displayName,
  faqs,
  mapsEmbedSrc,
  mapsHref,
  specialtyWhatsappHref,
  whatsappHref,
  type EquipeItem,
} from "@/lib/clinic";
import { cn, scrollToHash, withBase } from "@/lib/utils";

const SPECIALTY_ICONS = {
  Psicopedagogia: BookOpen,
  Psicologia: HeartHandshake,
  Fonoaudiologia: Ear,
  Psicanálise: MessageCircle,
  "Terapia ABA": ClipboardCheck,
  TCC: Brain,
} as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalClinic",
      name: clinic.name,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/images/hero.jpg`,
      telephone: clinic.whatsapp.telephone,
      address: {
        "@type": "PostalAddress",
        streetAddress: `${clinic.address.street}, ${clinic.address.neighborhood}`,
        addressLocality: clinic.address.city,
        addressRegion: clinic.address.state,
        addressCountry: "BR",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: clinic.hours.opens,
        closes: clinic.hours.closes,
      },
      areaServed: "Aimorés, Minas Gerais",
      medicalSpecialty: activeSpecialties().map((item) => item.nome),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    ...activeTeam().map((person) => ({
      "@type": "Person",
      name: displayName(person),
      jobTitle: person.funcao,
      worksFor: { "@type": "MedicalClinic", name: clinic.name },
    })),
  ],
};

export function HomePage() {
  return (
    <div id="topo" className="min-h-screen bg-bg pb-24 text-ink lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a
        href="#conteudo"
        onClick={scrollToHash}
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-surface"
      >
        Ir para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <Specialties />
        <Care />
        <Team />
        <Schedule />
        <Faq />
        <Visit />
      </main>
      <SiteFooter />
      <WhatsAppFab />
      <MobileActions />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-hero-wash" />
      <div className="relative mx-auto grid max-w-6xl items-start gap-4 px-5 pt-8 pb-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-16 lg:gap-y-4 lg:px-8 lg:pt-16 lg:pb-24">
        <p className="text-sm font-semibold tracking-[0.08em] text-accent uppercase lg:col-start-1">
          Clínica multidisciplinar
        </p>
        <h1 className="max-w-[18ch] font-display text-[2.125rem] leading-[1.15] tracking-display text-balance text-ink lg:col-start-1 lg:text-5xl">
          Um lugar para ser acolhido e crescer no seu tempo.
        </h1>
        <HeroPhoto className="lg:col-start-2 lg:row-start-1 lg:row-span-6" />
        <p className="text-base font-medium text-ink lg:col-start-1">
          Clínica multidisciplinar em Aimorés-MG
        </p>
        <p className="max-w-[65ch] text-base leading-normal text-pretty text-ink-soft lg:col-start-1">
          Psicopedagogia, psicologia, fonoaudiologia e psicanálise, TEA, TDAH,
          transtornos de aprendizagem e neurodesenvolvimento — com comunicação
          inclusiva em Libras e Braille.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-start-1">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#agendar" onClick={scrollToHash}>
              Agendar
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
            <a href={mapsHref()} target="_blank" rel="noopener noreferrer">
              <MapPin className="size-4" />
              Como chegar
            </a>
          </Button>
        </div>
        <ul className="flex flex-wrap gap-2 lg:col-start-1">
          {["Libras", "Braille", ...clinic.insurance].map((item) => (
            <li
              key={item}
              className="flex min-h-8 items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 text-sm font-medium text-ink-soft"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HeroPhoto({ className }: { className?: string }) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div className="rounded-xl bg-surface p-1 shadow-card">
        <div className="relative">
          <picture>
            <source
              type="image/webp"
              srcSet={`${withBase("/images/hero-800.webp")} 800w, ${withBase("/images/hero-1280.webp")} 1280w`}
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <img
              src={withBase("/images/hero.jpg")}
              alt="Fachada do Espaço Incluir em Aimorés, Minas Gerais."
              width={1280}
              height={720}
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/10] w-full rounded-lg object-cover lg:aspect-hero"
            />
          </picture>
          <figcaption className="absolute bottom-2 left-2 max-w-[11rem] rounded-md bg-ink/88 px-2.5 py-1.5 text-[0.6875rem] leading-snug text-surface">
            <span className="block font-medium">Aimorés, Minas Gerais</span>
            <span className="text-line">
              {clinic.hours.days} · {clinic.hours.time}
            </span>
          </figcaption>
        </div>
      </div>
    </figure>
  );
}

function Specialties() {
  const items = activeSpecialties();
  return (
    <section
      id="especialidades"
      className="scroll-mt-24 border-t border-line/60 bg-surface"
    >
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-24">
        <SectionIntro
          kicker="Especialidades"
          title="Uma equipe, vários olhares."
          text="Atendimento integrado para o desenvolvimento, a comunicação e a vida emocional — no mesmo espaço."
        />
        <ul className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-3 lg:gap-4">
          {items.map((item, index) => {
            const Icon = SPECIALTY_ICONS[item.nome];
            const n = String(index + 1).padStart(2, "0");
            return (
              <li
                key={item.nome}
                className="rounded-[20px] border border-line bg-bg/80 p-3 shadow-card lg:p-5"
              >
                <div className="flex items-center gap-2 lg:justify-between">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface text-accent lg:size-10">
                    <Icon className="size-4 lg:size-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="min-w-0 flex-1 font-display text-lg leading-tight tracking-display text-ink lg:hidden">
                    {item.nome}
                  </h3>
                  <span className="font-display text-sm text-ink-soft">{n}</span>
                </div>
                <h3 className="mt-4 hidden font-display text-2xl tracking-display text-ink lg:block">
                  {item.nome}
                </h3>
                <p className="mt-2 max-w-[65ch] text-[0.9375rem] leading-normal text-pretty text-ink-soft">
                  {item.texto}
                </p>
                <div className="mt-1 flex justify-end lg:mt-4 lg:justify-start">
                  <a
                    href={specialtyWhatsappHref(item.nome)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-sm font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Agendar
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Care() {
  return (
    <section id="cuidado" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-24">
        <SectionIntro
          kicker="A quem se destina"
          title="Acompanhamento especializado, com acolhimento de verdade."
          text="Cuidamos de crianças, adolescentes e famílias que buscam um espaço seguro para crescer."
        />
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:mt-12 lg:grid-cols-4 lg:gap-4">
          {audiences.map((item) => (
            <li
              key={item.id}
              className="min-w-0 overflow-visible rounded-[20px] border border-line bg-surface/80 px-2.5 py-4 lg:px-5 lg:py-6"
            >
              <span className="rule-accent" />
              <p
                lang="pt-BR"
                className="mt-3 font-display text-[clamp(14px,4vw,17px)] leading-tight tracking-normal hyphens-auto text-ink [overflow-wrap:anywhere] lg:text-xl lg:tracking-display lg:[overflow-wrap:normal]"
              >
                {item.title}
              </p>
              <p className="mt-2 text-[0.9375rem] leading-normal text-ink-soft">
                {item.text}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-2">
          <PhotoCard
            src={withBase("/images/infancia.jpg")}
            webp={withBase("/images/infancia-800.webp")}
            alt="Recepção do Espaço Incluir, com balcão, certificados e o logo EI."
            caption="Ambiente pensado para acolhimento de todos, calmo, ordenado e convidativo."
          />
          <PhotoCard
            src={withBase("/images/consultorio.jpg")}
            webp={withBase("/images/consultorio-800.webp")}
            alt="Sala de jogos do Espaço Incluir, com mesa redonda e estantes de jogos."
            caption="Sala de jogos para o cuidado com as crianças — materiais à mão, mesa compartilhada e um tempo só delas."
          />
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          <Pillar
            icon={ShieldCheck}
            title="Ambiente seguro"
            text="Um espaço acolhedor, discreto e preparado para o cuidado contínuo."
          />
          <Pillar
            icon={Accessibility}
            title="Libras e Braille"
            text="Comunicação inclusiva para que ninguém fique de fora do atendimento."
          />
          <Pillar
            icon={Stethoscope}
            title="Convênios e particular"
            text="Unimed, Cassi e atendimento particular."
          />
        </ul>
      </div>
    </section>
  );
}

function PhotoCard({
  src,
  webp,
  alt,
  caption,
}: {
  src: string;
  webp: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="rounded-[20px] border border-line bg-surface p-2 shadow-card">
      <picture>
        <source type="image/webp" srcSet={`${webp} 800w`} sizes="(max-width: 1024px) 100vw, 560px" />
        <img
          src={src}
          alt={alt}
          width={1280}
          height={960}
          loading="lazy"
          decoding="async"
          className="aspect-photo w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-ink/10"
        />
      </picture>
      <figcaption className="max-w-[65ch] px-3 py-4 text-[0.9375rem] leading-normal text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}

function Team() {
  const people = activeTeam();
  return (
    <section id="equipe" className="scroll-mt-24 border-t border-line/60 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-24">
        <SectionIntro
          kicker="Equipe"
          title="As profissionais da casa."
          text="Três olhares, o mesmo cuidado — psicopedagogia, psicologia e fonoaudiologia, em Aimorés."
        />
        <ul className="mt-8 divide-y divide-line lg:mt-12">
          {people.map((person) => (
            <li key={person.nome}>
              <Person person={person} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Person({ person }: { person: EquipeItem }) {
  const name = displayName(person);
  const featured = Boolean(person.rotulo);
  const webp = withBase(person.foto.replace(/\.jpg$/, "-300.webp"));
  return (
    <article
      className={cn(
        "grid grid-cols-[auto_1fr] items-start gap-4 sm:gap-6",
        featured ? "py-6 lg:py-10" : "py-6 lg:py-8",
      )}
    >
      <img
        src={withBase(person.foto)}
        srcSet={`${webp} 300w`}
        sizes={featured ? "(min-width: 1024px) 176px, 112px" : "(min-width: 1024px) 128px, 96px"}
        alt={name}
        width={300}
        height={400}
        loading="lazy"
        decoding="async"
        className={cn(
          "aspect-portrait shrink-0 rounded-2xl object-cover object-top shadow-card",
          featured ? "w-28 sm:w-36 lg:w-44" : "w-24 sm:w-28 lg:w-32",
        )}
      />
      <div className="min-w-0">
        {person.rotulo ? (
          <p className="text-sm font-semibold tracking-[0.08em] text-accent uppercase">
            {person.rotulo}
          </p>
        ) : null}
        <h3
          className={cn(
            "font-display tracking-display text-ink",
            featured ? "mt-1 text-3xl lg:text-4xl" : "text-2xl lg:text-3xl",
          )}
        >
          {name}
        </h3>
        <p className="mt-1 text-[0.9375rem] font-medium text-ink-soft">{person.funcao}</p>
        <p className="mt-3 max-w-[65ch] text-[0.9375rem] leading-normal text-pretty text-ink-soft">
          {person.texto}
        </p>
      </div>
    </article>
  );
}

function Schedule() {
  return (
    <section id="agendar" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start lg:px-8 lg:py-24">
        <div>
          <SectionIntro
            kicker="Agende uma conversa"
            title="O primeiro passo é simples: fale com a gente no WhatsApp."
            text="Conta um pouco da sua busca — avaliação, acompanhamento ou dúvida sobre convênio. Respondemos no horário de atendimento."
          />
          <ScheduleForm />
        </div>
        <div className="rounded-[20px] bg-ink px-6 py-8 text-surface shadow-lift sm:px-8">
          <dl className="grid gap-6">
            <div>
              <dt className="flex items-center gap-4 text-sm font-semibold tracking-[0.08em] text-line uppercase">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-surface/10 text-surface">
                  <MapPin className="size-5" strokeWidth={1.75} />
                </span>
                Endereço
              </dt>
              <dd className="mt-1 pl-[3.75rem] text-base leading-normal text-surface/90">
                {clinic.address.street}
                <br />
                {clinic.address.neighborhood}
                <br />
                {clinic.address.city}, {clinic.address.state}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-4 text-sm font-semibold tracking-[0.08em] text-line uppercase">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-surface/10 text-surface">
                  <Clock className="size-5" strokeWidth={1.75} />
                </span>
                Horário
              </dt>
              <dd className="mt-1 pl-[3.75rem] text-base leading-normal text-surface/90">
                {clinic.hours.days}
                <br />
                {clinic.hours.time}
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3">
            <Button asChild variant="light" size="lg" className="w-full">
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                Abrir WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="w-full text-surface hover:bg-surface/10"
            >
              <a href={mapsHref()} target="_blank" rel="noopener noreferrer">
                Como chegar
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-24 border-t border-line/60 bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-24">
        <SectionIntro
          kicker="Dúvidas"
          title="Perguntas frequentes."
          text="Respostas diretas sobre atendimento, horário e como chegar."
        />
        <div className="mt-8 max-w-[65ch] divide-y divide-line border-y border-line">
          {faqs.map((item) => (
            <details key={item.q} className="group py-1">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden="true" className="text-accent group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 text-[0.9375rem] leading-normal text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visita" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-24">
        <SectionIntro
          kicker="Visite"
          title="A clínica fica em Aimorés."
          text="Avenida Doutor Renato Barbuto, 109, Residencial Nilton Freire Sampaio."
        />
        <div className="mt-8 overflow-hidden rounded-[20px] border border-line bg-surface shadow-card">
          <iframe
            title="Mapa do Espaço Incluir"
            src={mapsEmbedSrc()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full border-0 lg:h-96"
          />
        </div>
        <Button asChild size="lg" className="mt-4">
          <a href={mapsHref()} target="_blank" rel="noopener noreferrer">
            <MapPin className="size-4" />
            Como chegar
          </a>
        </Button>
      </div>
    </section>
  );
}

function SectionIntro({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-[65ch]">
      <p className="text-sm font-semibold tracking-[0.08em] text-accent uppercase">{kicker}</p>
      <span className="mt-3 rule-accent" />
      <h2 className="mt-4 font-display text-3xl leading-tight tracking-display text-balance text-ink lg:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-normal text-pretty text-ink-soft">{text}</p>
    </div>
  );
}

function Pillar({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <li className="flex gap-4 rounded-[20px] border border-line bg-surface p-5 shadow-card">
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-bg text-accent">
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div>
        <p className="font-medium text-ink">{title}</p>
        <p className="mt-1 text-[0.9375rem] leading-normal text-ink-soft">{text}</p>
      </div>
    </li>
  );
}

