import emailjs from "@emailjs/browser";

const Correo = ({ ok }) => {
  const sendEmail = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_tq5t04h",
        "template_by8bgu9",
        event.target,
        "G8EYaqEFbkSjKkcat"
      )
      .then((response) => (response.status === 200 ? ok(true) : ok(false)))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="text-white mt-16 p-8 w-[500px] ml-16 text-xl mb-8  border-2 rounded-md">
        <h2>Contactenos</h2>

        <form onSubmit={sendEmail}>
          <div className="flex gap-4 mt-4">
            <label>Nombre</label>
            <input
              type="text"
              name="user_name"
              className="ml-[-3px] w-[312px]"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              className="ml-[25px] w-[312px]"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <label>Telefono</label>
            <input type="tel" name="user_tel" className="ml-[-3px] w-[312px]" />
          </div>
          <div className="flex gap-4 mt-4">
            <label htmlFor="">Motivo</label>
            <input
              type="text"
              name="user_Motivo"
              className="ml-[11px] w-[312px]"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <label>Mensaje</label>

            <textarea
              name="user_message"
              className="h-[150px] w-[312px]"
            ></textarea>
          </div>
          <button>Send</button>
        </form>
      </div>
      {/* <h2>Buenas</h2>
      <input type="text" name="correo" placeholder="Escribe el correo" />
      <input type="text" name="texto" placeholder="Escribe el mensaje" />
      <form action="">
        <button type="submit">enviar correo</button>
      </form> */}
    </div>
  );
};

export default Correo;
