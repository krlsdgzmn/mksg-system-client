"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const USERNAME = "admin";
const PASSWORD = "admin";
const MIN_LENGTH = 5;
const MAX_LENGTH = 32;

export default function SignInPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSignIn = () => {
    if (!username || !password) {
      toast({
        title: "Incomplete fields",
        description: "Please fill all the required fields",
        variant: "destructive",
      });

      return;
    }

    if (
      username.length < MIN_LENGTH ||
      password.length < MIN_LENGTH ||
      username.length > MAX_LENGTH ||
      password.length > MAX_LENGTH
    ) {
      toast({
        title: "Input length error",
        description: "Please enter between 5 and 32 characters",
        variant: "destructive",
      });

      return;
    }

    if (username !== USERNAME || password !== PASSWORD) {
      toast({
        title: "Invalid credentials",
        description: "Please try again",
        variant: "destructive",
      });

      return;
    }

    if (username === USERNAME && password === PASSWORD) {
      toast({
        title: "Success",
        description: "You are signed in to MKSG Clothing system",
      });

      router.push("/order-forecast");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  return (
    <Container className="relative flex min-h-[85vh] items-center justify-center">
      <div className="flex w-[95%] max-w-[300px] flex-col items-center justify-center gap-3">
        <header className="pb-2 text-center">
          <h1 className="bg-gradient-to-b from-black/60 to-black bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-white/50">
            MKSG Clothing
          </h1>
          <p className="text-base text-muted-foreground">
            Please sign in to continue
          </p>
        </header>

        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          maxLength={MAX_LENGTH}
          onKeyDown={handleKeyDown}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          maxLength={MAX_LENGTH}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleSignIn}
          className="flex w-full items-center gap-1 text-sm"
          variant="outline"
        >
          Sign In <LogIn size={14} />
        </Button>
      </div>
    </Container>
  );
}
