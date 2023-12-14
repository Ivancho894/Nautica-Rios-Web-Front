import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { getStorage, ref ,uploadBytes,getDownloadURL} from "firebase/storage";


const PublicarAccesorio = () => {
  const number =Math.floor(Math.random() * 1000000000000000)
  const [nuevoAccesorio, setnuevoAccesorio] = useState({
    descripcion:"",
    eliminado: false,
    material: "",
    nombre: "",
    marca:"",
    peso: "",
    precio: 0,
    tipo: "",
    variaciones:[
      {
        color:"",
        imagenes:[]
      }
    ]
    });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setnuevoAccesorio((prev) => ({ ...prev, [id]: value }));
  };
  const handleColorChange = (e) => {
    const { id, value } = e.target;
    setnuevoAccesorio((prev) => ({ ...prev, variaciones: [{ ...prev.variaciones[0], [id]: value }] }));
  
  }
  const handleImagenChange = async (e) => {
    const storage = getStorage();
    //Referencia de la img a cargar
    const mountainsRef = ref(storage, `Fotos de accesorios/${nuevoAccesorio.nombre}-${nuevoAccesorio.marca}-${number}/${nuevoAccesorio.nombre}-${nuevoAccesorio.marca}${nuevoAccesorio.variaciones[0].imagenes.length}`);
    //Agrego la imagen a la base de datos
    const data = await uploadBytes(mountainsRef, e.target.files[0])
    //Busco el link de la imagen
    const link = await getDownloadURL(data.ref)

    setnuevoAccesorio((prev) => ({ ...prev, variaciones: [{...nuevoAccesorio.variaciones[0], imagenes: [...prev.variaciones[0].imagenes,link]}]}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación de campos
    if (
      nuevoAccesorio.nombre &&
      nuevoAccesorio.descripcion &&
      nuevoAccesorio.precio &&

      nuevoAccesorio.variaciones[0].color &&
      nuevoAccesorio.variaciones[0].imagenes.length > 0
    ) {

      try {
        await addDoc(collection(db, "accesorios"), nuevoAccesorio);
        alert("¡Accesorio agregado correctamente!");
        setnuevoAccesorio({
          descripcion:"",
          eliminado: false,
          material: "",
          nombre: "",
          marca:"",
          peso: "",
          precio: 0,
          tipo: "",
          variaciones:[
            {
              color:"",
              imagenes:[]
            }
          ]
        });

      } catch (error) {
        console.error("Error al agregar el accesorio a Firestore:", error);
        alert("Error al agregar el accesorio. Por favor, inténtalo de nuevo.");
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
      <h1>Nuevo Accesorio</h1>
    <form onSubmit={handleSubmit} className=" max-w  mx-auto grid grid-cols-1 md:grid-cols-2 gap-8  p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-h-full" >
  <div className="mb-4">
    <label htmlFor="nombre" className="block text-sm font-medium text-gray-900 dark:text-white">
      nombre
    </label>
    <input
      type="text"
      id="nombre"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoAccesorio.nombre}
      onChange={handleInputChange}
      required
    />
  </div>

  <div className="mb-4">
    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-900 dark:text-white">
    Descripcion
    </label>
    <input
      type="text"
      id="descripcion"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoAccesorio.descripcion}
      onChange={handleInputChange}
      required
    />
  </div>

    <div className="mb-4">
      <label htmlFor="marca" className="block text-sm font-medium text-gray-900 dark:text-white">
        Marca
      </label>
      <input
        type="text"
        id="marca"
        className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={nuevoAccesorio.marca}
        onChange={handleInputChange}
        required
      />
    </div>
      
    <div className="mb-4">
      <label htmlFor="peso" className="block text-sm font-medium text-gray-900 dark:text-white">
        Peso
      </label>
      <input
        type="number"
        id="peso"
        className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={nuevoAccesorio.peso}
        onChange={handleInputChange}
      />
  </div>

  <div className="mb-4">
    <label htmlFor="color" className="block text-sm font-medium text-gray-900 dark:text-white">
      Color
    </label>
    <input
      type="text"
      id="color"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoAccesorio.variaciones[0].color}
      onChange={handleColorChange}
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
      value={nuevoAccesorio.precio}
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
      value={nuevoAccesorio.tipo}
      onChange={handleInputChange}
    />
  </div>  
  <div className="mb-4">
    <label htmlFor="material" className="block text-sm font-medium text-gray-900 dark:text-white">
      Material
    </label>
    <input
      type="text"
      id="material"
      className="bg-gray-50 w-80 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={nuevoAccesorio.material}
      onChange={handleInputChange}
    />
  </div>

  
  <div className="mb-4 ">
    <label htmlFor="imagenes" className="block text-sm font-medium text-gray-900 dark:text-white">
      Imagenes
    </label>
    <input
      type="file"
      id="imagenes"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      onChange={handleImagenChange}
      required
    />
  </div>
  <div className="flex items-center mb-4 ">

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

export default PublicarAccesorio;
