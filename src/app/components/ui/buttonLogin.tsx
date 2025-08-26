"use client";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";

export default function ButtonLogin() {
    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", { callbackUrl: "/details" });
        } catch (error) {
            console.error("Erro ao fazer login com o Google:", error);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={handleGoogleSignIn}
                className="group inline-flex items-center gap-3 rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-3 text-sm font-medium
                         transition-all hover:border-neutral-500 hover:bg-neutral-750/60 active:scale-[0.98] focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-neutral-900
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
                <FontAwesomeIcon
                    icon={faGoogle}
                    width={18}
                    className="shrink-0"
                />
                Entrar com Google
            </button>
        </>
    );
}