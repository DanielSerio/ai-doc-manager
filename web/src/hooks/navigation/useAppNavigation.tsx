import { useRouterState } from "@tanstack/react-router";
import { useCallback, useMemo } from "react";

export function useAppNavigation() {
  const routerState = useRouterState();
  const resolvedHref = useMemo(() => routerState.resolvedLocation?.pathname, [routerState.resolvedLocation]);
  const isRouteActive = useCallback((href: string) => {
    if (href === resolvedHref) {
      return true;
    }

    if (href !== '/' && resolvedHref?.startsWith(href)) {
      return true;
    }

    return false;
  }, [resolvedHref]);

  const state = {
    resolvedHref
  };

  const methods = {
    isRouteActive
  };

  return [state, methods] as const;
}