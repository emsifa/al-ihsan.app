import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { RouteState } from "../types";

export function useRouteState(): RouteState {
  const router = useRouter();
  const [routeState, setRouteState] = useState<RouteState>();

  useEffect(() => {
    const handleRouteChangeStart = () => setRouteState("start");
    const handleRouteChangeComplete = () => setRouteState("complete");
    const handleRouteChangeError = () => setRouteState("error");

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [routeState]);

  return routeState;
}
