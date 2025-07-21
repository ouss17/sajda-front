import { useEffect } from "react";
import { useRouter } from "expo-router";

export function useRedirectIfRoleNotAllowed(
  user: any,
  allowedRoles: string[],
  redirectPath: Parameters<ReturnType<typeof useRouter>["replace"]>[0] = "/horaires"
) {
  const router = useRouter();
  useEffect(() => {
    if (!user?.role || !allowedRoles.includes(user.role)) {
      router.replace(redirectPath);
    }
  }, [user, allowedRoles, router, redirectPath]);
}