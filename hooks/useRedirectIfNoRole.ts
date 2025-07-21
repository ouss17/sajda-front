import { useEffect } from "react";
import { useRouter } from "expo-router";

export function useRedirectIfNoRole(
  user: any,
  redirectPath: Parameters<ReturnType<typeof useRouter>["replace"]>[0] = "/horaires"
) {
  const router = useRouter();
  useEffect(() => {
    if (!user?.role) {
      router.replace(redirectPath);
    }
  }, [user, router, redirectPath]);
}