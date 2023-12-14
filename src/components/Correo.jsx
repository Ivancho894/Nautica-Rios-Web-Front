import emailjs from "@emailjs/browser";
import { Toaster, toast } from "sonner";
import { useState } from "react";

const Correo = ({ ok }) => {
  const [email, setEmail] = useState({
    user_name: "",
    user_email: "",
    user_tel: "",
    user_Motivo: "",
    user_message: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const property = e.target.name;
    const value = e.target.value;
    setEmail({ ...email, [property]: value });
  };
  console.log(email);
  const sendEmail = (event) => {
    event.preventDefault();
    if (
      email.user_name !== "" &&
      email.user_email !== "" &&
      email.user_tel !== "" &&
      email.user_Motivo !== "" &&
      email.user_message !== ""
    ) {
      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_TEMPLATE_ID,
          event.target,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then((response) => (response.status === 200 ? ok(true) : ok(false)))
        .catch((error) => console.log(error));
      setTimeout(() => {
        setEmail({
          user_name: "",
          user_email: "",
          user_tel: "",
          user_Motivo: "",
          user_message: "",
        });
      }, 1000);
    } else {
      toast.error("", {
        description: (
          <span className="text-red-700 text-base">
            Se requiere que todos los campos esten completos
          </span>
        ),
      });
    }
  };
  return (
    <div>
      <Toaster />
      <div className="text-white mt-16 p-8 w-[500px] ml-16 text-xl mb-8  border-2 rounded-md">
        <h2>Contactenos</h2>

        <form onSubmit={sendEmail}>
          <div className="flex gap-4 mt-4">
            <label>Nombre</label>
            <input
              type="text"
              name="user_name"
              value={email.user_name}
              onChange={handleChange}
              className="ml-[-3px] w-[312px] text-black "
            />
          </div>
          <div className="flex gap-4 mt-4">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              value={email.user_email}
              onChange={handleChange}
              className="ml-[25px] w-[312px] text-black"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <label>Telefono</label>
            <input
              type="tel"
              name="user_tel"
              value={email.user_tel}
              onChange={handleChange}
              className="ml-[-3px] w-[312px] text-black"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <label htmlFor="">Motivo</label>
            <input
              type="text"
              name="user_Motivo"
              value={email.user_Motivo}
              onChange={handleChange}
              className="ml-[11px] w-[312px] text-black"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <label>Mensaje</label>

            <textarea
              name="user_message"
              value={email.user_message}
              onChange={handleChange}
              className="h-[150px] w-[312px] text-black"
            ></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Correo;
