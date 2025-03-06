import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";

// import Google from "./svgGoogle";
// import Github from "./svgGithub";

const FormsRegister = () => {
  return (
    <form className="w-full flex flex-col gap-7">
      <h1 className="text-3xl text-colorPrimary font-bold w-full">Cadastro</h1>

      <div className="flex max-md:flex-col md:justify-between gap-6 w-full">
        {/* campo nome */}
        <section className="flex flex-col gap-3 md:w-2/4">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" placeholder="primeiro nome" />
        </section>
        {/* campo sobrenome */}
        <section className="flex flex-col gap-3 md:w-2/4">
          <Label htmlFor="sobrenome">Sobrenome</Label>
          <Input id="sobrenome" placeholder="sobrenome" />
        </section>
      </div>
      {/* campo email */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" placeholder="seu email" />
      </section>
      {/* campo senha */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" placeholder="senha" />
      </section>

      <Button type="submit" size={"lg"}>
        Cadastrar
      </Button>

      <>
        <p className="text-sm font-semibold text-center">
          Já possui uma conta?{" "}
          <Link
            to={"/login"}
            className="text-colorSecondary underline underline-offset-2"
          >
            Entre por aqui
          </Link>
        </p>
      </>
    </form>
  );
};

export default FormsRegister;
