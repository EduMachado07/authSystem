import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useState, useEffect } from "react";

const AuthCode = () => {
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;

    if (timer > 0 && isResending) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
      setIsResending(false);
    }

    return () => clearInterval(interval);
  }, [timer, isResending]);

  function resend() {
    setTimer(60);
    setIsResending(true);
  }

  return (
    <form className="w-full flex flex-col gap-8 items-center">
      <h1 className="text-3xl text-colorPrimary font-bold w-full">
        Código de Autenticação
      </h1>

      <p className="text-md font-semibold text-pretty">
        Enviamos um código de autenticação para o seu email, digite os números nos campos abaixo para verificar o seu acesso.
      </p>

      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <button
        onClick={resend}
        disabled={isResending}
        className={`w-full text-right md:px-32 -mt-4 ${isResending ? 'text-gray-400' : 'text-colorSecondary hover:underline underline-offset-2 cursor-pointer'}`}
      >
        Reenviar código
      </button>

      <Button className="w-full" type="submit" size={"lg"}>
        Verificar
      </Button>
    </form>
  );
};

export default AuthCode;
