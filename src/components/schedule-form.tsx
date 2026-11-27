import { withBase } from "@/lib/utils";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { activeSpecialties, scheduleMessage, whatsappHref } from "@/lib/clinic";

const ATENDIMENTO = ["Unimed", "Cassi", "Particular"] as const;

export function ScheduleForm() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [convenio, setConvenio] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [aceite, setAceite] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!nome.trim()) {
      setError("Informe o nome do responsável.");
      return;
    }
    if (!aceite) {
      setError("É preciso concordar com a Política de Privacidade.");
      return;
    }
    setError("");
    const href = whatsappHref(
      scheduleMessage({ nome, idade, especialidade, convenio, periodo }),
    );
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4" noValidate>
      <Field label="Nome do responsável" id="agendar-nome" required>
        <input
          id="agendar-nome"
          name="nome"
          autoComplete="name"
          required
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          className="field"
        />
      </Field>
      <Field label="Idade de quem será atendido" id="agendar-idade">
        <input
          id="agendar-idade"
          name="idade"
          inputMode="numeric"
          value={idade}
          onChange={(event) => setIdade(event.target.value)}
          className="field"
        />
      </Field>
      <Field label="Especialidade" id="agendar-especialidade">
        <select
          id="agendar-especialidade"
          name="especialidade"
          value={especialidade}
          onChange={(event) => setEspecialidade(event.target.value)}
          className="field"
        >
          <option value="">Selecione</option>
          {activeSpecialties().map((item) => (
            <option key={item.nome} value={item.nome}>
              {item.nome}
            </option>
          ))}
          <option value="Ainda não sei">Ainda não sei</option>
        </select>
      </Field>
      <Field label="Atendimento" id="agendar-atendimento">
        <select
          id="agendar-atendimento"
          name="convenio"
          value={convenio}
          onChange={(event) => setConvenio(event.target.value)}
          className="field"
        >
          <option value="">Selecione</option>
          {ATENDIMENTO.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Melhor dia/período" id="agendar-periodo">
        <input
          id="agendar-periodo"
          name="periodo"
          value={periodo}
          onChange={(event) => setPeriodo(event.target.value)}
          className="field"
        />
      </Field>
      <p className="text-[0.9375rem] leading-normal text-ink-soft">
        Os dados preenchidos são usados apenas para montar sua mensagem no
        WhatsApp e não ficam armazenados neste site. Não informe diagnósticos
        ou dados de saúde.
      </p>
      <label className="flex min-h-11 items-start gap-3 text-[0.9375rem] leading-normal text-ink">
        <input
          type="checkbox"
          checked={aceite}
          onChange={(event) => setAceite(event.target.checked)}
          className="mt-1 size-5 shrink-0 accent-accent"
        />
        <span>
          Li e concordo com a{" "}
          <a href={withBase("/privacidade")} className="font-medium text-accent underline underline-offset-4">
            Política de Privacidade
          </a>
        </span>
      </label>
      {error ? (
        <p role="alert" className="text-sm font-medium text-accent">
          {error}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Enviar pelo WhatsApp
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
