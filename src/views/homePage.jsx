// ACA VA LA PAGINA HOME
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_BARCOS, GET_FILTERS } from "../redux/actions";
import baner from "../assets/homeBaner.png"
import destacado1 from "../assets/destacado1.png"
import destacado2 from "../assets/destacado2.png"
import destacado3 from "../assets/destacado3.png"
import destacado4 from "../assets/destacado4.png"
import destacado5 from "../assets/destacado5.png"
import destacado6 from "../assets/destacado6.png"
import destacado7 from "../assets/destacado7.png"
import destacado8 from "../assets/destacado8.png"
import ventas from "../assets/ventas.png"
import gestoria from "../assets/gestoria.png"
import asesor from "../assets/asesor.png"
import Logo from "../assets/Nosotross.png";
import insta from "../assets/insta.png";


export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(GET_FILTERS())
    // dispatch(GET_BARCOS())
  }, []);
 
 

 
 
 
  return (
    <div >
      <div className=" w-full m-0px">
        <img src={baner} alt="baner" className="w-full" />
      </div>

      <h1 className="mt-16 font-bold mb-5">DESTACADOS</h1>
      <div className="ml-8 mt-8 p-4 grid grid-cols-4 gap-4">
        <div className="">
          <img src={destacado1} alt="barco1" className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]" />
          <h2 className="mt-4">GENESIS 350 - Entrega Inmediata!</h2>
        </div >
        <div className="">
          <img src={destacado2} alt="barco2" className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]" />
          <h2 className="mt-4">MOTORYACHT 70 - Astillero San Isidro</h2>
        </div>
        <div>
          <img src={destacado3} alt="barco3" className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]" />
          <h2 className="mt-4">SEGUE 720 - 2014</h2>
        </div>
        <div>
          <img src={destacado4} alt="barco4" className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]" />
          <h2 className="mt-4">GENESIS DEL MAR 46 - 2017</h2>
        </div>
        <div>
          <img src={destacado5} alt="barco5" className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]" />
          <h2 className="mt-4"> GENESIS DELTA 40 - 2018</h2>
        </div>
        <div>
          <img src={destacado6} alt="barco6" className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]" />
          <h2 className="mt-4">SEGUE 34 GT - 2021</h2>
        </div>
        <div>
          <img src={destacado7} alt="barco7" className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]" />
          <h2 className="mt-4">GENESIS 350X - 2023</h2>
        </div>
        <div>
          <img src={destacado8} alt="barco8" className="w-96 shadow-[0_5px_40px_1px_rgba(0,0,0,2)]" />
          <h2 className="mt-4"> GENESIS 350 - 2018!</h2>
        </div>

      </div>

      <button className="mt-16"
        onClick={() => {
          navigate("/todoslosbarcos");
        }}
      >
        VER BARCOS
      </button>
      <>
        <div></div>
        <br />
        <br />
        <div className="bg-gray-200 py-5">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
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
                className="mt-5 object-contain w-96"
              />
            </div>
          </div>
        </div>
      </>
      <h1 className="mt-16 font-bold mb-5">SERVICIOS</h1>


      <div className="flex items-center justify-center mt-8 p-4 gap-16 " style={{ alignItems: 'flex-start' }}>
        <div className=" w-96 flex flex-col items-center justify-center">

          <div>
            <img src={ventas} alt="ventas" className="w-96  " />
          </div>
          <div>
            <h1 className=" mt-4 text-3xl font-bold mb-5">VENTAS</h1>
          </div>
          <div>
            <h1 className="text-xl mb-8">Te ofrecemos una gran variedad de barcos: cruceros, veleros, motoveleros y lanchas tanto usados, como 0km. Buscamos la embarcación acorde a tu presupuesto
              También tasamos tu barco, hacemos traslados, gestoría, inspección del estado general de las embarcaciones, clases de adaptación a su nueva embarcación.</h1>
          </div>

        </div>

        <div className=" w-96 flex flex-col items-center justify-center">

          <div>
            <img src={gestoria} alt="gestoria" className="w-96  " />
          </div>
          <div>
            <h1 className=" mt-4 text-3xl font-bold mb-5">GESTORIA</h1>
          </div>
          <div>
            <h1 className="text-xl mb-8">En Cenáutica te ofrecemos el servicio de gestoría náutica para realizar todos los trámites necesarios para que puedas obtener tu título náutico, renovarlo en caso de que haya caducado o solicitar un duplicado, si lo has perdido, te lo han robado y se te ha deteriorado. También te asesoramos en todas las dudas que puedan surgirte sobre tu barco relacionadas con la administración.</h1>
          </div>
        </div>

        <div className=" w-96 flex flex-col items-center justify-center">
          <div className="mb-5">
            <img src={asesor} alt="asesor" className="w-96" />
          </div>

          <div className="text-center">
            <h1 className=" text-3xl font-bold mb-2">ASESORAMIENTO</h1>
          </div>

          <div className="text-center">
            <h1 className="text-xl mb-8">
              Ofrecemos asesoramiento tanto en la venta de embarcaciones usadas como así también en la compra de embarcaciones nuevas nacionales e importadas, conociendo profesionalmente como son los procesos constructivos y, tanto en las nuevas como en las usadas, tomar resguardos legales a tener en cuenta referentes a este particular tema.
            </h1>
          </div>
        </div>



      </div>

      <h1 className="mt-16 font-bold mb-5">INSTAGRAM</h1>

      



      <div className=" ml-8 mt-8 p-32 grid grid-cols-3 gap-16">


        <div>
        <iframe width="440" height="440"
      src="http://instagram.com/p/C0esTeDJapT/embed" ></iframe>

        </div>
        <div>
        <iframe width="440" height="440"
      src="http://instagram.com/p/C0UrID9pzem/embed" ></iframe>
        </div>
        <div>
        <iframe width="440" height="440"
      src="http://instagram.com/p/C0UY13op_Bg/embed" ></iframe>

        </div>
        <div>
        <iframe width="440" height="440"
      src="http://instagram.com/p/C0UQBXEOwvL/embed" ></iframe>

        </div>
        <div>
        <iframe width="440" height="440"
      src="http://instagram.com/p/C0P5wKwJPQj/embed" ></iframe>

        </div>
        <div>
        <iframe width="440" height="440"
      src="http://instagram.com/p/C0LElZvNGNl/embed" ></iframe>

        </div>

      </div>

      <div className=" flex items-end gap-4">
        <img src={insta} alt="barco3" className="w-16 ml-44" />
        <h1 className="text-5xl font-bold ">nauticarios</h1>
      </div>


      <div className="bg-black w-full h-[600px] mt-16 p-4 grid grid-cols-2">

        <div className=" text-white w-96 ml-[200px]  mt-16">

          <div className="" >
            <h1 className="  text-3xl font-bold mb-5">CONTACTO</h1>
          </div>

          <div>
            <h1 className="text-xl mb-8">
              Buenos Aires - Uruguay - Paraguay:<br></br><br />

              Ivan Serralta - Cel. y WhatsApp: <br /><br />

              (+549) 11-5601-0255 <br /><br />


              info@nauticarios.com <br /><br />



              Aristóbulo Del Valle 3580.

              Benavidez. (B1621DXH)

              Tigre. Pcia. de Bs. As.



              Santa Fé y Paraná:

              Victor Buyatti -<br /><br /> Cel. y WhatsApp: <br /><br />

              +549-3425-225971
            </h1>
          </div>
       
         

       
        </div>
        <div className="text-white mt-16 p-8 w-[500px] ml-16 text-xl mb-8  border-2 rounded-md">
             <div className="flex gap-4 mt-4">
              <label htmlFor="Nombre">Nombre</label>
              <input type="text"className="ml-[-3px] w-[312px]"/>
             </div>
             <div className="flex gap-4 mt-4">
              <label htmlFor="Email">Email</label>
              <input className="ml-[25px] w-[312px]" type="text" />
             </div>
             <div className="flex gap-4 mt-4">
              <label htmlFor="Telefono">Teléfono</label>
              <input className="ml-[-3px] w-[312px]" type="text" />
             </div>
             <div className="flex gap-4 mt-4">
              <label htmlFor="Motivo">Motivo</label>
              <input className="ml-[11px] w-[312px]" type="text" />
             </div>
             <div className="flex gap-4 mt-4">
              <label htmlFor="Mensaje">Mensaje</label>
              <textarea className="h-[150px] w-[312px]"></textarea>
             </div>
        
        
        
        
        </div>
      
      </div>
    </div>
  );
}
