import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { getStorage, ref ,uploadBytes,getDownloadURL} from "firebase/storage";
import { async } from "@firebase/util";


const PublicarBarco = () => {
  const number =Math.floor(Math.random() * 10000)
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
    imagenes:[],
    });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNuevoBarco((prev) => ({ ...prev, [id]: value }));
  };
  const handleImagenChange = async (e) => {
    const storage = getStorage();
    //Referencia de la img a cargar
    const mountainsRef = ref(storage, `Fotos de barcos/${nuevoBarco.marcaBarco}-${nuevoBarco.modelo}-${number}/${nuevoBarco.marcaBarco}${nuevoBarco.imagenes.length}`);
    //Agrego la imagen a la base de datos
    const data = await uploadBytes(mountainsRef, e.target.files[0])
    //Busco el link de la imagen
    const link = await getDownloadURL(data.ref)

    setNuevoBarco((prev) => ({ ...prev, imagenes: [...nuevoBarco.imagenes, link]}));
  }

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
      nuevoBarco.tiempos &&
      nuevoBarco.imagenes.length > 0
    ) {

      try {
        await addDoc(collection(db, "barcos"), nuevoBarco);
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
          imagenes: []
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
    <div className="mt-20 p-5">
      <h1>Nueva Embarcacion</h1>
    <form onSubmit={handleSubmit} className=" max-w  mx-auto grid grid-cols-1 md:grid-cols-2 gap-8  p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-h-full" >
  <div className="mb-4">
    <label htmlFor="marcaBarco" className="block text-sm font-medium text-gray-900 dark:text-white">
      Marca
    </label>
    <input
      type="text"
      id="marcaBarco"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.marcaBarco}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="modelo" className="block text-sm font-medium text-gray-900 dark:text-white">
      Modelo
    </label>
    <input
      type="text"
      id="modelo"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.modelo}
      onChange={handleInputChange}
      required
    />
  </div>

    <div className="mb-4">
      <label htmlFor="accesorios" className="block text-sm font-medium text-gray-900 dark:text-white">
        Accesorios
      </label>
      <input
        type="text"
        id="accesorios"
        className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={nuevoBarco.accesorios}
        onChange={handleInputChange}
        required
      />
    </div>
      
    <div className="mb-4">
      <label htmlFor="capacidad" className="block text-sm font-medium text-gray-900 dark:text-white">
        Capacidad
      </label>
      <input
        type="number"
        id="capacidad"
        className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={nuevoBarco.capacidad}
        onChange={handleInputChange}
        required
      />
  </div>

  <div className="mb-4">
    <label htmlFor="marcaMotor" className="block text-sm font-medium text-gray-900 dark:text-white">
      Marca Del Motor
    </label>
    <input
      type="text"
      id="marcaMotor"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.marcaMotor}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="modeloMotor" className="block text-sm font-medium text-gray-900 dark:text-white">
      Modelo Del Motor
    </label>
    <input
      type="text"
      id="modeloMotor"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.modeloMotor}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="horas" className="block text-sm font-medium text-gray-900 dark:text-white">
      Horas
    </label>
    <input
      type="number"
      id="horas"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.horas}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="consumo" className="block text-sm font-medium text-gray-900 dark:text-white">
      Consumo
    </label>
    <input
      type="number"
      id="consumo"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.consumo}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="tiempos" className="block text-sm font-medium text-gray-900 dark:text-white">
      Tiempos
    </label>
    <input
      type="number"
      id="tiempos"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.tiempos}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="precio" className="block text-sm font-medium text-gray-900 dark:text-white">
      Precio
    </label>
    <input
      type="number"
      id="precio"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.precio}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="tipo" className="block text-sm font-medium text-gray-900 dark:text-white">
      Tipo
    </label>
    <input
      type="text"
      id="tipo"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.tipo}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="year" className="block text-sm font-medium text-gray-900 dark:text-white">
      Año
    </label>
    <input
      type="number"
      id="year"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.year}
      onChange={handleInputChange}
      required
    />
  </div>  
  <div className="mb-4">
    <label htmlFor="puntal" className="block text-sm font-medium text-gray-900 dark:text-white">
      Puntal
    </label>
    <input
      type="number"
      id="puntal"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.puntal}
      onChange={handleInputChange}
      required
    />
  </div>
  <div className="mb-4">
    <label htmlFor="manga" className="block text-sm font-medium text-gray-900 dark:text-white">
      Manga
    </label>
    <input
      type="number"
      id="manga"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.manga}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="eslora" className="block text-sm font-medium text-gray-900 dark:text-white">
      Eslora
    </label>
    <input
      type="number"
      id="eslora"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoBarco.eslora}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4 ">
    <label htmlFor="imagen" className="block text-sm font-medium text-gray-900 dark:text-white">
      Imagen
    </label>
    <input
      type="file"
      id="imagen"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleImagenChange}
      required
    />
  </div>
  <div className="flex justify-center mb-4  ">

  <button
    type="submit"
    className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 text-white font-medium rounded-lg text-sm w-full p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

  >
    Publicar
  </button></div>
</form>

</div>
  );
}

export default PublicarBarco;
