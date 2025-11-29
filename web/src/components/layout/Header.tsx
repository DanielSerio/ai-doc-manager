import { PAGE_DATA } from "@/lib/const";
import { useRouterState } from "@tanstack/react-router";

export function Header() {
  const routerState = useRouterState();

  const nonRootRouteMatches = routerState.matches.filter((match) => match.routeId !== '__root__');

  if (!nonRootRouteMatches.length) {
    throw new Error('No non-root route matches found');
  }

  const routedId = nonRootRouteMatches[0].routeId;

  return (
    <header>
      <section>
        <h1>{PAGE_DATA[routedId].title}</h1>
      </section>
    </header>
  );
}