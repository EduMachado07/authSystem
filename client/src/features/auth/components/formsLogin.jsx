import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Google from "./svgGoogle";
import Github from "./svgGithub";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { apiAuth } from "@/store/configAxios";

const FormsLogin = () => {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await apiAuth.post("/login", {
        email: data.email,
        password: data.password,
      });
      console.log(res);

      navigate("/profile");
    } catch (error) {
      setErrorApi(error.response.data.message);
      console.log(error.response.data);
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-colorPrimary font-bold w-full">Login</h1>
      {/* {isSubmitted && (errors?.email || errors?.password) && (
        <p className="text-red-500 font-semibold">Informe todos os campos</p>
      )} */}

      {errorApi && <p className="text-red-500 font-semibold">{errorApi}</p>}

      {/* campo email */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="email">E-mail</Label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "E-mail é obrigatório",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Formato do e-mail inválido",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="email"
              placeholder="seu email"
              onChange={(e) => {
                field.onChange(e);
                setErrorApi(""); // Limpa o erro ao modificar o input
              }}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.email.message}
          </p>
        )}
      </section>
      {/* campo senha */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="password">Senha</Label>
        <Controller
          name="password"
          control={control}
          rules={{ required: "Senha é obrigatória" }}
          render={({ field }) => (
            <Input
              {...field}
              id="password"
              type="password"
              placeholder="senha"
              onChange={(e) => {
                field.onChange(e);
                setErrorApi("");
              }}
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.password.message}
          </p>
        )}
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
