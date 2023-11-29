import React from "react";
import Logo from "../../assets/Nosotross.png";

export default function QuienesSomos() {
  return (
    <>
      <div></div>
      <br />
      <br />
      <div className="bg-gray-200 min-h-screen py-5">
        <div className="container mx-auto">
          <div className="flex flex-col items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl font-bold mb-5">Sobre Nosotros</h1>
              <h2 className="text-2xl mb-8">
                Somos una empresa apasionada por brindar soluciones náuticas.
                Desde el 2001 nos dedicamos a la comercialización de
                embarcaciones nuevas y usadas, representando a los astilleros
                Génesis y Segue.
              </h2>
              <h3 className="text-xl mb-8">
                Contamos con experiencia internacional en el rubro. Nuestro
                conocimiento comercial y técnico sobre la construcción de
                barcos, nos posiciona como un socio ideal para concretar tu
                operación de la forma más segura posible.
              </h3>
              <h4 className="text-xl mb-8">
                {" "}
                Nuestros valores son la seriedad, el compromiso y la
                confidencialidad.
              </h4>
            </div>
            <img
              src={Logo}
              alt="Nautica Rios"
              className="mt-5 object-contain w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}
