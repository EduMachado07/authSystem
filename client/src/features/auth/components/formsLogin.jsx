import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link, useNavigate } from "react-router-dom";

import Google from "./svgGoogle";
import Github from "./svgGithub";

import { useForm, Controller } from "react-hook-form";

const FormsLogin = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);

    navigate("/profile");
  }

  return (
    <form
      className="w-full flex flex-col gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-colorPrimary font-bold w-full">Login</h1>
      {errors?.email?.type === "required" ? (
        <p>email é obrigatório</p>
      ) : errors?.password?.type === "required" ? (
        <p>senha é obrigatória</p>
      ) : (
        <p>campos não preenchidos</p>
      )}

      
      {/* campo email */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input {...field} id="email" placeholder="seu email" />
          )}
        />
      </section>
      {/* campo senha */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="password">Senha</Label>
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              {...field}
              id="password"
              type="password"
              placeholder="senha"
            />
          )}
        />
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
