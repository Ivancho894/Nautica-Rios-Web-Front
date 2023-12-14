// ACA VA LA PAGINA HOME
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_BARCOS, GET_FILTERS } from "../redux/actions";
import baner from "../assets/Nautica Rios Web .png";
import destacado1 from "../assets/1.png";
import destacado2 from "../assets/2.png";
import destacado3 from "../assets/3.png";
import destacado4 from "../assets/4.png";
import destacado5 from "../assets/5.png";
import destacado6 from "../assets/6.png";
import destacado7 from "../assets/7.png";
import destacado8 from "../assets/8.png";
import ventas from "../assets/ventas.png";
import gestoria from "../assets/gestoria.png";
import asesor from "../assets/asesor.png";
import Logo from "../assets/Nosotross.png";
import insta from "../assets/insta.png";
import { Toaster, toast } from "sonner";
import { AiFillChrome } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import Correo from "../components/Correo";
import { Link } from "react-router-dom";
import CopiarAlPortapapeles from "../components/CopiarAlPortapapeles";
export default function Home() {
  const auth = useAuth();
  const { displayName } = auth.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const not = useSelector((state) => state.notificaciones);
  useEffect(() => {
    // dispatch(GET_FILTERS())
    // dispatch(GET_BARCOS())
    if (not) {
      toast("bienvenido a Nautica Rios", {
        description: "Gracias por ingresar a esta pagina ",
        icon: (
          <AiFillChrome
            className="text-cyan-400 text-3xl"
            //style={{ color: "green", fontSize: "1rem" }}
          />
        ),
      });
      if (auth.user) {
        toast.success("Acceso exitoso", {
          description: (
            <span className="text-green-700 text-base">
              bienvenido {displayName},
            </span>
          ),
        });
      }
    }
  }, []);
  function ok(e) {
    if (e) {
      toast.success("Se envio correctamente");
    } else {
      toast("No se envio");
    }
  }
  return (
    <div>
      <Toaster />

      <div id="inicio" className=" w-full m-0px">
        <img src={baner} alt="baner" className="w-full"style={{ marginTop: '30px' }} />
      </div>

      <h1 className="mt-16 font-bold mb-5">EMBARCACIONES DESTACADAS</h1>
      <div className="ml-8 mt-8 p-4 grid grid-cols-4 gap-4">
        <div className="">
          <img
            src={destacado1}
            alt="barco1"
            className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
          />
          <h2 className="mt-4">Regnicoli Dorado</h2>
        </div>
        <div className="">
          <img
            src={destacado2}
            alt="barco2"
            className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
          />
          <h2 className="mt-4">QuickSilver 1600</h2>
        </div>
        <div>
          <img
            src={destacado3}
            alt="barco3"
            className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
          />
          <h2 className="mt-4">Bermuda Sport 180</h2>
        </div>
        <div>
          <img
            src={destacado4}
            alt="barco4"
            className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
          />
          <h2 className="mt-4">Yamaha VXR</h2>
        </div>
        <div>
          <img
            src={destacado5}
            alt="barco5"
            className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
          />
          <h2 className="mt-4">Geuna F185 GSS</h2>
        </div>
        <div>
          <img
            src={destacado6}
            alt="barco6"
            className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
          />
          <h2 className="mt-4">QuickSilver 2000</h2>
        </div>
        <div>
          <img
            src={destacado7}
            alt="barco7"
            className="w-96  shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
          />
          <h2 className="mt-4">Prinz 700</h2>
        </div>
        <div>
          <img
            src={destacado8}
            alt="barco8"
            className="w-96 shadow-[0_5px_40px_1px_rgba(0,0,0,2)]"
          />
          <h2 className="mt-4">Canestrari 275</h2>
        </div>
      </div>

      <button
        className="mt-16 text-white"
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
        <div id="nosotros" className="bg-gray-200 py-5">
          <div className="container mx-auto">
            <div className="flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-3xl font-bold mb-5">Sobre Nosotros</h1>
                <h2 className="text-2xl mb-8">
                  Bienvenido a Náutica Ríos, tu socio confiable en el mundo
                  marítimo. En Náutica Ríos, nos apasiona conectar a las
                  personas con la experiencia única de navegar en el rio. Como
                  especialistas en la industria naval, ofrecemos una gama
                  completa de servicios para satisfacer todas tus necesidades en
                  el mundo de los barcos.
                </h2>
                
                <h4 className="text-xl mb-8">
                  {" "}
                  En Náutica Ríos, nos apasiona el rio y queremos compartir esa
                  pasión contigo. Sea cual sea tu visión, estamos aquí para
                  convertirla en realidad. Confía en Náutica Ríos para brindarte
                  un servicio de primer nivel, ya sea para comprar, mantener o
                  mejorar tu embarcación. Únete a nosotros en esta emocionante
                  aventura en el agua.
                </h4>
              </div>
            
            </div>
          </div>
        </div>
      </>
      <a href="home#inicio">🛥</a>
      <h1 className="mt-16 font-bold mb-5">SERVICIOS</h1>

      <div
        className="flex items-center justify-center mt-8 p-4 gap-16 "
        style={{ alignItems: "flex-start" }}
      >
        <div className=" w-96 flex flex-col items-center justify-center">
          <div>
            <img src={ventas} alt="ventas" className="w-96  " />
          </div>
          <div>
            <h1 className=" mt-4 text-3xl font-bold mb-5">VENTAS</h1>
          </div>
          <div>
            <h1 className="text-xl mb-8">
              Te ofrecemos una gran variedad de barcos: cruceros,
              lanchas tanto usados, como 0km. Buscamos la
              embarcación acorde a tu presupuesto También tasamos tu barco,
              hacemos traslados, gestoría, inspección del estado general de las
              embarcaciones, clases de adaptación a su nueva embarcación.
            </h1>
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
            <h1 className="text-xl mb-8">
              En Náutica Ríos te ofrecemos el servicio de gestoría náutica para
              realizar todos los trámites necesarios para que puedas obtener tu
              título náutico, renovarlo en caso de que haya caducado o solicitar
              un duplicado, si lo has perdido, te lo han robado y se te ha
              deteriorado. También te asesoramos en todas las dudas que puedan
              surgirte sobre tu barco relacionadas con la administración.
            </h1>
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
              Ofrecemos asesoramiento tanto en la venta de embarcaciones usadas
              como así también en la compra de embarcaciones nuevas nacionales e
              importadas, conociendo profesionalmente como son los procesos
              constructivos y, tanto en las nuevas como en las usadas, tomar
              resguardos legales a tener en cuenta referentes a este particular
              tema.
            </h1>
          </div>
        </div>
      </div>
      <h1 className="mt-16 font-bold mb-5">INSTAGRAM</h1>

      <div className=" ml-8 mt-8 p-32 grid grid-cols-3 gap-16">
        <div>
          <iframe
            width="440"
            height="440"
            src="http://instagram.com/p/C0esTeDJapT/embed"
          ></iframe>
        </div>
        <div>
          <iframe
            width="440"
            height="440"
            src="http://instagram.com/p/C0UrID9pzem/embed"
          ></iframe>
        </div>
        <div>
          <iframe
            width="440"
            height="440"
            src="http://instagram.com/p/C0UY13op_Bg/embed"
          ></iframe>
        </div>
        <div>
          <iframe
            width="440"
            height="440"
            src="http://instagram.com/p/C0UQBXEOwvL/embed"
          ></iframe>
        </div>
        <div>
          <iframe
            width="440"
            height="440"
            src="http://instagram.com/p/C0P5wKwJPQj/embed"
          ></iframe>
        </div>
        <div>
          <iframe
            width="440"
            height="440"
            src="http://instagram.com/p/C0LElZvNGNl/embed"
          ></iframe>
        </div>
      </div>
      <div className=" flex items-end gap-4">
      <a href="https://www.instagram.com/nauticarios_embarcaciones/ ">
          <img src={insta} alt="barco3" className="w-16 ml-44" />
        </a>
        <a href="https://www.instagram.com/nauticarios_embarcaciones/ ">
        <h1 className="text-5xl font-bold ">nauticarios_embarcaciones</h1>
       </a>
      </div>

      <div className="bg-black w-full h-[600px] mt-16 p-4 grid grid-cols-2">
        <div className=" text-white w-96 ml-[200px]  mt-16">
          <div className="">
            <h1 id="contacto" className="  text-3xl font-bold mb-5">
              CONTACTO
            </h1>
          </div>

          <div>
            <h1 className="text-xl mb-8">
              Operamos en toda la Argentina y alrededores:<br></br>
              <br />
              Ivan Serralta - Cel. y WhatsApp: <br />
              <br />
              (+549) 3541-566295 <br />
              <br />
              <CopiarAlPortapapeles texto="somosnauticarios@gmail.com" />
              <br />
              <br />
              Ventas:
              <br />
              <Link to="https://api.whatsapp.com/message/L6R75S3FBG45D1?autoload=1&app_absent=0">
                +549-1173632760
              </Link>
            </h1>
          </div>
        </div>
        <Correo ok={ok} />
        <a href="home#inicio">🛥</a>
        {/* <div className="text-white mt-16 p-8 w-[500px] ml-16 text-xl mb-8  border-2 rounded-md">
          <div className="flex gap-4 mt-4">
            <label htmlFor="Nombre">Nombre</label>
            <input type="text" className="ml-[-3px] w-[312px]" />
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
        </div> */}
      </div>
    </div>
  );
}
