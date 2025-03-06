import { Outlet } from "react-router-dom";

import background from "../../assets/imgLogin.jpg";

function Auth() {
  return (
    <main className="h-dvh flex">
      <section className="md:w-2/5 max-md:hidden overflow-hidden">
        <img src={background} alt="" />
      </section>
      {/* FORMULARIO */}
      <section className="bg-colorBack h-full md:w-3/5 w-full flex flex-col gap-7 justify-center items-center px-7 md:px-40">
        {/* -- component forms -- */}
        <Outlet />
      </section>
    </main>
  );
}

export default Auth;
