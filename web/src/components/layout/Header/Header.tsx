import { useIsMobile } from "@/hooks/layout";
import { Nav } from "./Nav";


export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="bg-card border-b h-10">
      <section className="flex justify-between items-center h-full">
        <h1 className="px-4">DocManager</h1>
        <Nav isMobile={isMobile} />
      </section>
    </header>
  );
}