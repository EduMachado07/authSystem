import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FormsResetPassword = () => {
  return (
    <form className="w-full flex flex-col gap-8">
      <h1 className="text-3xl text-colorPrimary font-bold w-full">
        Nova Senha
      </h1>

      {/* campo nova senha */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="password">Nova senha</Label>
        <Input type="password" id="password" placeholder="senha" />
      </section>

      {/* campo confirma senha */}
      <section className="flex flex-col gap-3">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input type="password" id="confirmPassword" placeholder="senha" />
      </section>

      <Button type="submit" size={"lg"}>
        Redefinir Senha
      </Button>
    </form>
  );
};

export default FormsResetPassword;
