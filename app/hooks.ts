"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { authSignIn, authSignOut, authVerifyToken } from "./actions";
import { SignInForm, User } from "./types";

const QUERY_KEY = "auth-user";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const signOut = () => {
    authSignOut();
    queryClient.removeQueries({ queryKey: [QUERY_KEY] });
  };

  const { data, isLoading, isError, refetch } = useQuery<User>({
    queryKey: [QUERY_KEY],
    queryFn: authVerifyToken,
    staleTime: 1000 * 60,
    enabled: isClient && !!localStorage.getItem("token"),
  });

  const signIn = async (signInForm: SignInForm) => {
    const user = await authSignIn(signInForm);
    queryClient.setQueryData<User>([QUERY_KEY], user);
    return user;
  };

  return {
    data,
    isLoading,
    isError,
    refetch,
    signIn,
    signOut,
  };
};
