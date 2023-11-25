import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';
import cargarImg from './PublicarBarco/Nueva Imagen';


const PublicarBarco = () => {
const navigate = useNavigate(); 
  const [nuevoBarco, setNuevoBarco] = useState({
    accesorios: 'ss',
    capacidad: '3',
    consumo: '3',
    eslora: '3',
    horas: '3',
    manga: '3',
    marcaBarco: 'f',
    marcaMotor: 'f',
    modelo: 'f',
    modeloMotor: 'f',
    precio: '3',
    puntal: '3',
    tiempos: '3',
    tipo: 'f',
    year: '3',
    imagen: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoBarco((prev) => ({ ...prev, [name]: value }));
  };  
  const handleImagenChange = (e) => {
    setNuevoBarco((prev) => ({ ...prev, imagen: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación de campos
    if (nuevoBarco.tipo && nuevoBarco.marcaBarco && nuevoBarco.marcaMotor && nuevoBarco.precio && nuevoBarco.eslora && nuevoBarco.year
        && nuevoBarco.accesorios && nuevoBarco.capacidad && nuevoBarco.consumo && nuevoBarco.horas && nuevoBarco.manga && nuevoBarco.modelo
        && nuevoBarco.modeloMotor && nuevoBarco.puntal && nuevoBarco.tiempos) {
          let imagenes = []

          //Por cada imagen que se cargo llamo a cargar imagen
          //Deberia devolver un link pero devuelve la promesas
          const arImagenes =await Object.keys(nuevoBarco.imagen).map(async num => await cargarImg(nuevoBarco.imagen[num],nuevoBarco.marcaBarco).then(data=>{imagenes.push(data) }))
          console.log(arImagenes,nuevoBarco)
      try {
        // await addDoc(collection(db, 'barcos'), nuevoBarco);
        console.log('Barco agregado correctamente a Firestore');
        alert('¡Barco agregado correctamente!');
        setNuevoBarco({
            accesorios: '',
            capacidad: '',
            consumo: '',
            eslora: '',
            horas: '',
            manga: '',
            marcaBarco: '',
            marcaMotor: '',
            modelo: '',
            modeloMotor: '',
            precio: '',
            puntal: '',
            tiempos: '',
            tipo: '',
            year: '',
        });

        //navigate(`/detalle/${nuevoBarco.docRef.id}`);

      } catch (error) {
        console.error('Error al agregar el barco a Firestore:', error);
        alert('Error al agregar el barco. Por favor, inténtalo de nuevo.');
      }
    } else {
      console.error('Todos los campos son obligatorios');
      alert('Todos los campos son obligatorios. Por favor, completa todos los campos.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
        <h2>Publica tu barco</h2>

      <label>Accesorios: </label>
      <input type="text" name="accesorios" value={nuevoBarco.accesorios} onChange={handleInputChange} />
      <br/>
      <label>Capacidad: </label>
      <input type="number" name="capacidad" value={nuevoBarco.capacidad} onChange={handleInputChange} />
      <br/>
      <label>Consumo: </label>
      <input type="number" name="consumo" value={nuevoBarco.consumo} onChange={handleInputChange} />
      <br/>
      <label>Eslora: </label>
      <input type="number" name="eslora" value={nuevoBarco.eslora} onChange={handleInputChange} />
      <br/>
      <label>Horas: </label>
      <input type="number" name="horas" value={nuevoBarco.horas} onChange={handleInputChange} />
      <br/>
      <label>Manga: </label>
      <input type="number" name="manga" pattern="[0-9]+([.][0-9]+)?" value={nuevoBarco.manga} onChange={handleInputChange} />
      <br/>
      <label>Marca: </label>
      <input type="text" name="marcaBarco" value={nuevoBarco.marcaBarco} onChange={handleInputChange} />
      <br/>
      <label>Motor: </label>
      <input type="text" name="marcaMotor" value={nuevoBarco.marcaMotor} onChange={handleInputChange} />
      <br/>
      <label>Modelo: </label>
      <input type="text" name="modelo" value={nuevoBarco.modelo} onChange={handleInputChange} />
      <br/>
      <label>Modelo motor: </label>
      <input type="text" name="modeloMotor" value={nuevoBarco.modeloMotor} onChange={handleInputChange} />
      <br/>
      <label>Precio: </label>
      <input type="number" name="precio" value={nuevoBarco.precio} onChange={handleInputChange} />
      <br/>
      <label>Puntal: </label>
      <input type="number" name="puntal" pattern="[0-9]+([.][0-9]+)?" value={nuevoBarco.puntal} onChange={handleInputChange} />
      <br/>
      <label>Tiempos: </label>
      <input type="tiempos" name="tiempos" value={nuevoBarco.tiempos} onChange={handleInputChange} />
      <br/>
      <label>Tipo: </label>
      <input type="text" name="tipo" value={nuevoBarco.tipo} onChange={handleInputChange} />
      <br/>
      <label>Año: </label>
      <input type="number" name="year" pattern="[0-9]+([.][0-9]+)?" value={nuevoBarco.year} onChange={handleInputChange} />
      <br/>
      <label>Imagen: </label>
      <input type="file" name="Imagen" onChange={handleImagenChange} />
      <br/>

      <button type="submit">Publicar</button>
    </form>
  );
};

export default PublicarBarco;