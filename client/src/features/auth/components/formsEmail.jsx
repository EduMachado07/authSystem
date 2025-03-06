import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";

const FormsEmail = () => {
  return (
    <form className="w-full flex flex-col gap-7">
      <h1 className="text-3xl text-colorPrimary font-bold w-full">
        Redefinir Senha
      </h1>

      <p className="text-md font-semibold text-pretty">
        Informe o seu e-mail para encontrarmos a sua conta, e assim, enviarmos
        uma mensagem para redefinição da sua senha.
      </p>

      {/* campo email */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" placeholder="seu email" />
      </section>

      <Button type="submit" size={"lg"}>
        Enviar
      </Button>

      <p className="text-sm font-semibold text-center">
        Lembrou de sua senha?{" "}
        <Link
          to={"/login"}
          className="text-colorSecondary underline underline-offset-2"
        >
          Entre por aqui
        </Link>
      </p>
    </form>
  );
};

export default FormsEmail;
