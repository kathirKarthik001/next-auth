"use client";

import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

const SocialProviders = () => {

  const handleLogin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center gap-3 mt-4 ">
      <Button
        variant="outline"
        className="w-1/2 flex items-center justify-center gap-2"
        onClick={() =>handleLogin("google")}
      >
        <FcGoogle size={20} /> Google
      </Button>
      <Button
        variant="outline"
        className="w-1/2  flex items-center justify-center gap-2"
        onClick={() =>handleLogin("github")}
      >
        <FaGithub size={20} /> GitHub
      </Button>
    </div>
  );
};

export default SocialProviders;
