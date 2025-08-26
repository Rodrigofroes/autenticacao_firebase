import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import ButtonLogin from "@/app/components/ui/buttonLogin";

export default async function SignIn() {

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

            <ButtonLogin />

          </div>
        </section>
      </div>
    </main>
  );
}
