import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MenuAdmin = ({ handleLogout, displayName }) => {
  const navigate = useNavigate();

  const irListaDeDeseos = (e) => {
    e.preventDefault();
    navigate("/listaDeDeseos");
  };

  const irGestionBarcos = (e) => {
    e.preventDefault();

    navigate("/gestionBarcos");
  };

  const irGestionAccesorios = (e) => {
    e.preventDefault();
    navigate("/gestionAccesorios");
  };

  const irGestionUsuarios = (e) => {
    e.preventDefault();
    navigate("/gestionUsuarios");
  };

  const irGestionAcceso = (e) => {
    e.preventDefault();
    navigate("/accesoUsuarios");
  };

  const irPublicarBarcos = (e) => {
    e.preventDefault();
    navigate("/publicarBarco");
  };

  const irPublicarAccesorio = (e) => {
    e.preventDefault();
    navigate("/publicarAccesorio");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {displayName}
          <UserIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          <Cog8ToothIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item> */}
            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  type="submit"
                  onClick={irListaDeDeseos}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Lista de deseos
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  type="submit"
                  onClick={irPublicarBarcos}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Publicar un barco
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  type="submit"
                  onClick={irPublicarAccesorio}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Publicar un accesorio
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  type="submit"
                  onClick={irGestionBarcos}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Gestion de barcos
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  type="submit"
                  onClick={irGestionAccesorios}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Gestion de accesorios
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  type="submit"
                  onClick={irGestionUsuarios}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Gestion de permisos admin
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  type="submit"
                  onClick={irGestionAcceso}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Gestion acceso de usuarios
                </a>
              )}
            </Menu.Item>


            <Menu.Item>
              {({ active }) => (
                <a
                  href=""
                  type="submit"
                  onClick={handleLogout}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block w-full px-4 py-2 text-left text-sm"
                  )}
                >
                  Cerrar sesion
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuAdmin;
