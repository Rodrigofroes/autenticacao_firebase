"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { app } from "./lib/firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut, type User } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    setErr(null);
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (e: any) {
      console.error(e);
      setErr("Não foi possível fazer login agora. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setErr(null);
    setIsLoading(true);
    try {
      const auth = getAuth(app);
      await signOut(auth);
      setUser(null);
    } catch (e: any) {
      console.error(e);
      setErr("Falha ao sair. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-neutral-900 via-neutral-950 to-black text-neutral-100">
      <div className="w-full max-w-md p-4">
        <section
          className="rounded-2xl border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-xl shadow-xl p-6"
          aria-labelledby="login-title"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-neutral-800 grid place-items-center">
                <FontAwesomeIcon icon={faGoogle} width={18} />
              </div>
              <h1 id="login-title" className="text-lg font-semibold">
                Faça login para continuar
              </h1>
            </div>

            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoading}
              className="group inline-flex items-center gap-3 rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-3 text-sm font-medium
                         transition-all hover:border-neutral-500 hover:bg-neutral-750/60 active:scale-[0.98] focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-neutral-900
                         disabled:opacity-60 disabled:cursor-not-allowed"
              aria-busy={isLoading}
            >
              <FontAwesomeIcon
                icon={faGoogle}
                width={18}
                className="shrink-0"
              />
              {isLoading ? "Conectando..." : "Entrar com Google"}
            </button>

            {err && (
              <p role="alert" className="text-sm text-red-400">
                {err}
              </p>
            )}
          </div>
        </section>

        {user && (
          <section
            className="mt-4 rounded-2xl border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-xl shadow-xl p-6"
            aria-labelledby="user-title"
          >
            <div className="flex items-center gap-4">
              <Image
                src={user.photoURL ?? "/avatar-fallback.png"}
                alt={user.displayName ?? "Usuário"}
                width={56}
                height={56}
                className="rounded-full"
                priority
              />
              <div className="min-w-0">
                <h2 id="user-title" className="text-base font-semibold">
                  {user.displayName ?? "Usuário logado"}
                </h2>
                <p className="text-sm text-neutral-300 truncate">
                  {user.email}
                </p>
                <p className="text-xs text-neutral-500 truncate">UID: {user.uid}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoading}
                className="rounded-lg border border-neutral-700 bg-neutral-850 px-4 py-2 text-sm
                           hover:border-neutral-500 hover:bg-neutral-800 transition-colors
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Sair
              </button>
              <span className="text-xs text-neutral-500">
                Autenticado com Google
              </span>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
