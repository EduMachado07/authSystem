import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";

import Google from "./svgGoogle";
import Github from "./svgGithub";

const FormsLogin = () => {
  return (
    <form className="w-full flex flex-col gap-7">
      <h1 className="text-3xl text-colorPrimary font-bold w-full">Login</h1>

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
        Entrar
      </Button>
      <p className="text-sm font-semibold text-center">OU CONTINUE COM</p>

      {/* -- third party -- */}
      <section className="flex items-center px-2 gap-7">
        <div className="w-2/4">
          <Button variant={"outline"} className="w-full">
            <Google />
            Google
          </Button>
        </div>
        <div className="w-2/4">
          <Button variant={"outline"} className="w-full">
            <Github />
            GitHub
          </Button>
        </div>
      </section>

      <>
        <Link
          to={"/user-email"}
          className="text-sm font-semibold text-center -mb-3 text-colorSecondary underline underline-offset-2"
        >
          Esqueceu sua senha?
        </Link>
        <p className="text-sm font-semibold text-center">
          Não possui uma conta?{" "}
          <Link
            to={"/register"}
            className="text-colorSecondary underline underline-offset-2"
          >
            Cadastre-se
          </Link>
        </p>
      </>
    </form>
  );
};

export default FormsLogin;
