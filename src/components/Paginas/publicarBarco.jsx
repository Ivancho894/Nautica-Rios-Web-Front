import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";

const PublicarBarco = () => {
  const navigate = useNavigate();
  const [nuevoBarco, setNuevoBarco] = useState({
    accesorios: "",
    capacidad: "",
    consumo: "",
    eslora: "",
    horas: "",
    manga: "",
    marcaBarco: "",
    marcaMotor: "",
    modelo: "",
    modeloMotor: "",
    precio: "",
    puntal: "",
    tiempos: "",
    tipo: "",
    year: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNuevoBarco((prev) => ({ ...prev, [id]: value }));
    console.log(nuevoBarco);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación de campos
    if (
      nuevoBarco.tipo &&
      nuevoBarco.marcaBarco &&
      nuevoBarco.marcaMotor &&
      nuevoBarco.precio &&
      nuevoBarco.eslora &&
      nuevoBarco.year &&
      nuevoBarco.accesorios &&
      nuevoBarco.capacidad &&
      nuevoBarco.consumo &&
      nuevoBarco.horas &&
      nuevoBarco.manga &&
      nuevoBarco.modelo &&
      nuevoBarco.modeloMotor &&
      nuevoBarco.puntal &&
      nuevoBarco.tiempos
    ) {
      try {
        await addDoc(collection(db, "barcos"), nuevoBarco);
        console.log("Barco agregado correctamente a Firestore");
        alert("¡Barco agregado correctamente!");
        setNuevoBarco({
          accesorios: "",
          capacidad: "",
          consumo: "",
          eslora: "",
          horas: "",
          manga: "",
          marcaBarco: "",
          marcaMotor: "",
          modelo: "",
          modeloMotor: "",
          precio: "",
          puntal: "",
          tiempos: "",
          tipo: "",
          year: "",
        });

        //navigate(`/detalle/${nuevoBarco.docRef.id}`);
      } catch (error) {
        console.error("Error al agregar el barco a Firestore:", error);
        alert("Error al agregar el barco. Por favor, inténtalo de nuevo.");
      }
    } else {
      console.error("Todos los campos son obligatorios");
      alert(
        "Todos los campos son obligatorios. Por favor, completa todos los campos."
      );
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-10">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="accesorios"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Accesorios
            </label>
            <input
              type="text"
              id="accesorios"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={nuevoBarco.accesorios}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="capacidad"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Capacidad
            </label>
            <input
              type="number"
              id="capacidad"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={nuevoBarco.capacidad}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="consumo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Consumo
            </label>
            <input
              type="number"
              id="consumo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={nuevoBarco.consumo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="eslora"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Eslora
            </label>
            <input
              type="number"
              id="eslora"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={nuevoBarco.eslora}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="horas"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Horas
            </label>
            <input
              type="number"
              id="horas"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={nuevoBarco.horas}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="manga"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Manga
            </label>
            <input
              type="number"
              id="manga"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              pattern="[0-9]+([.][0-9]+)?"
              value={nuevoBarco.manga}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="marca"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Marca
          </label>
          <input
            type="text"
            id="marcaBarco"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nuevoBarco.marcaBarco}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="marcaMotor"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Marca del motor
          </label>
          <input
            type="text"
            id="marcaMotor"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nuevoBarco.marcaMotor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="modelo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Modelo
          </label>
          <input
            type="text"
            id="modelo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nuevoBarco.modelo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="modeloMotor"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Modelo del motor
          </label>
          <input
            type="text"
            id="modeloMotor"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nuevoBarco.modeloMotor}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="precio"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Precio
          </label>
          <input
            type="number"
            id="precio"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nuevoBarco.precio}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="puntal"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Puntal
          </label>
          <input
            type="number"
            id="puntal"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            pattern="[0-9]+([.][0-9]+)?"
            value={nuevoBarco.puntal}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="tiempos"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tiempos
          </label>
          <input
            type="number"
            id="tiempos"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nuevoBarco.tiempos}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="tipo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tipo
          </label>
          <input
            type="text"
            id="tipo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nuevoBarco.tipo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="year"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Año
          </label>
          <input
            type="number"
            id="year"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={nuevoBarco.year}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-start mb-6"></div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Publicar
        </button>
      </div>
    </form>
  );

  // return (
  //   <h1>
  //     <form onSubmit={handleSubmit}>
  //       <h2>Publica tu barco</h2>

  //       <label>Accesorios: </label>
  //       <input
  //         type="text"
  //         name="accesorios"
  //         value={nuevoBarco.accesorios}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Capacidad: </label>
  //       <input
  //         type="number"
  //         name="capacidad"
  //         value={nuevoBarco.capacidad}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Consumo: </label>
  //       <input
  //         type="number"
  //         name="consumo"
  //         value={nuevoBarco.consumo}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Eslora: </label>
  //       <input
  //         type="number"
  //         name="eslora"
  //         value={nuevoBarco.eslora}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Horas: </label>
  //       <input
  //         type="number"
  //         name="horas"
  //         value={nuevoBarco.horas}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Manga: </label>
  //       <input
  //         type="number"
  //         name="manga"
  //         pattern="[0-9]+([.][0-9]+)?"
  //         value={nuevoBarco.manga}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Marca: </label>
  //       <input
  //         type="text"
  //         name="marcaBarco"
  //         value={nuevoBarco.marcaBarco}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Motor: </label>
  //       <input
  //         type="text"
  //         name="marcaMotor"
  //         value={nuevoBarco.marcaMotor}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Modelo: </label>
  //       <input
  //         type="text"
  //         name="modelo"
  //         value={nuevoBarco.modelo}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Modelo motor: </label>
  //       <input
  //         type="text"
  //         name="modeloMotor"
  //         value={nuevoBarco.modeloMotor}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Precio: </label>
  //       <input
  //         type="number"
  //         name="precio"
  //         value={nuevoBarco.precio}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Puntal: </label>
  //       <input
  //         type="number"
  //         name="puntal"
  //         pattern="[0-9]+([.][0-9]+)?"
  //         value={nuevoBarco.puntal}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Tiempos: </label>
  //       <input
  //         type="tiempos"
  //         name="tiempos"
  //         value={nuevoBarco.tiempos}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Tipo: </label>
  //       <input
  //         type="text"
  //         name="tipo"
  //         value={nuevoBarco.tipo}
  //         onChange={handleInputChange}
  //       />
  //       <br />
  //       <label>Año: </label>
  //       <input
  //         type="number"
  //         name="year"
  //         pattern="[0-9]+([.][0-9]+)?"
  //         value={nuevoBarco.year}
  //         onChange={handleInputChange}
  //       />
  //       <br />

  //       <button type="submit">Publicar</button>
  //     </form>
  //   </h1>
  // );
};

export default PublicarBarco;
