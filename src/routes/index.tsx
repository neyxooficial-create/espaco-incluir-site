import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://oespacoincluir.com.br/" }],
  }),
  component: Home,
});

function Home() {
  return <HomePage />;
}
