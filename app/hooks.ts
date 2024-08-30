"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { authSignIn, authSignOut, authVerifyToken } from "./actions";
import { SignInForm, User } from "./types";
import { usePathname, useRouter } from "next/navigation";

const QUERY_KEY = "auth-user";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentPath = usePathname();
  const router = useRouter();

  // Redirect logic based on authentication status
  useEffect(() => {
    if (!isLoading) {
      if (data && currentPath === "/") {
        router.push("/order-forecast");
      } else if (!data && currentPath !== "/") {
        router.push("/");
      }
    }
  });

  const signIn = async (signInForm: SignInForm) => {
    const user = await authSignIn(signInForm);
    queryClient.setQueryData<User>([QUERY_KEY], user);
    return user;
  };

  const signOut = () => {
    authSignOut();
    queryClient.removeQueries({ queryKey: [QUERY_KEY] });
  };

  const { data, isLoading, isError } = useQuery<User>({
    queryKey: [QUERY_KEY],
    queryFn: authVerifyToken,
    staleTime: 1000 * 60 * 1,
    enabled: isClient && !!localStorage.getItem("token"),
  });

  return {
    data,
    isLoading,
    isError,
    signIn,
    signOut,
  };
};
