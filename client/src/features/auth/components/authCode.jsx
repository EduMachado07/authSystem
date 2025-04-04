import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { apiAuth } from "@/store/configAxios";

const AuthCode = () => {
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  // useEffect(() => {
  //   let interval;

  //   if (timer > 0 && isResending) {
  //     interval = setInterval(() => {
  //       setTimer((prevTimer) => prevTimer - 1);
  //     }, 1000);
  //   } else if (timer === 0) {
  //     clearInterval(interval);
  //     setIsResending(false);
  //   }

  //   return () => clearInterval(interval);
  // }, [timer, isResending]);

  // function resend() {
  //   setTimer(60);
  //   setIsResending(true);
  // }

  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  async function onSubmit(data) {
    try {
      const res = await apiAuth.post("/register", {
        data: data.code,
      });
      console.log(res);

      // navigate("/profile");
    } catch (error) {
      setErrorApi(error.response.data.message);
      setDisabledButton(true);
      console.log(error.response.data);
    }
  }

  return (
    <form
      className="w-full flex flex-col gap-8 items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl text-colorPrimary font-bold w-full">
        Código de Autenticação
      </h1>

      <p className="text-md font-semibold text-pretty">
        Enviamos um código de autenticação para o seu email, digite os números
        nos campos abaixo para verificar o seu acesso.
      </p>

      <div className="flex flex-col gap-3">
        <Controller
          name="code"
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <InputOTP maxLength={6} {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        <div className="w-full text-right">
          <button
            className={`${
              isResending
                ? ""
                : "underline underline-offset-2 text-colorSecondary cursor-pointer"
            }`}
          >
            Reenviar código
          </button>
        </div>
      </div>

      <Button className="w-full" type="submit" size={"lg"}>
        Verificar
      </Button>
    </form>
  );
};

export default AuthCode;
