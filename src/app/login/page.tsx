"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      router.push("/projects");
    } else {
      alert("Login failed");
    }
  }

  console.log(email, password);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-[350px] space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
