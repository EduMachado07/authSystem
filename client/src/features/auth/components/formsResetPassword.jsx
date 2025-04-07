import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { apiAuth, apiUser } from "@/store/configAxios";

const FormsResetPassword = () => {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState("");

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await apiAuth.post("/alter-password", {
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
      className="w-full flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-colorPrimary font-bold w-full">
        Nova Senha
      </h1>

      {/* CAMPO NOVA SENHA */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="newPassword">Nova Senha</Label>
        <Controller
          name="newPassword"
          control={control}
          rules={{ required: "Informe uma nova senha" }}
          render={({ field }) => (
            <Input
              {...field}
              id="newPassword"
              type="password"
              placeholder="senha"
            />
          )}
        />
        {errors.newPassword && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.newPassword.message}
          </p>
        )}
      </section>

      {/* CAMPO CONFIRMA SENHA */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="confirmPassword">Confirmar Senha</Label>
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirme a sua senha",
            validate: (value) =>
              value === getValues("newPassword") || "Senhas diferentes",
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="confirmPassword"
              type="password"
              placeholder="senha"
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 font-semibold text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </section>

      <Button type="submit" size={"lg"}>
        Redefinir Senha
      </Button>
    </form>
  );
};

export default FormsResetPassword;
