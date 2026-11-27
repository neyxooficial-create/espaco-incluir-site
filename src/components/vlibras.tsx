import { useEffect } from "react";

type VLibrasWindow = Window & {
  VLibras?: { Widget: new (url: string) => unknown };
};

export function VLibras() {
  useEffect(() => {
    if (document.getElementById("vlibras-script")) return;
    const script = document.createElement("script");
    script.id = "vlibras-script";
    script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
    script.async = true;
    script.onload = () => {
      const Widget = (window as VLibrasWindow).VLibras?.Widget;
      if (Widget) new Widget("https://vlibras.gov.br/app");
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="enabled" {...{ vw: "" }}>
      <div className="active" {...{ "vw-access-button": "" }} />
      <div {...{ "vw-plugin-wrapper": "" }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}
