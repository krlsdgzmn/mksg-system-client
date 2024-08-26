"use client";

import Container from "@/components/container";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SpeedInsights } from "@vercel/speed-insights/next";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  role: string;
};

interface AuthContextType {
  data: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setData(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_API}verify-token/${token}`,
        );

        if (response.ok) {
          const user = await response.json();
          setData(user);
        } else {
          localStorage.removeItem("token");
          setData(null);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("token");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [router]);

  const currentPath = usePathname();

  // Redirect logic based on authentication status
  useEffect(() => {
    if (!loading) {
      if (data && currentPath === "/") {
        router.push("/order-forecast");
      } else if (!data && currentPath !== "/") {
        router.push("/");
      }
    }
  }, [data, loading, router, currentPath]);

  const signIn = async (username: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_API}token`,
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        },
      );
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.access_token}`;
      localStorage.setItem("token", response.data.access_token);
      setData(response.data.user);
      router.push("/order-forecast");
    } catch (error) {
      console.error("Failed to sign in:", error);
      throw error;
    }
  };

  const signOut = () => {
    localStorage.removeItem("token");
    setData(null);
    queryClient.clear();
    router.push("/");
  };

  if (loading) {
    return (
      <Container className="relative flex min-h-screen items-center justify-center border">
        <Loader2 size={32} className="animate-spin" />
      </Container>
    );
  }

  return (
    <AuthContext.Provider value={{ data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
