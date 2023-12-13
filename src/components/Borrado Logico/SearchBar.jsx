import { useState } from 'react'



export default function SearchBar({lista,set,prop}){
    const [searching,setSearching] = useState("")

    const handleChange = (e) => {
        setSearching(e.target.value)
    }

    const handleSubmit = () => {
        console.log(lista)
        let listaAux =lista.filter(e => e[prop].toLowerCase().includes(searching.toLowerCase()))
        set(listaAux);
        setSearching("")
    }
    
    return (
        <div className="search-bar">
            <h1>hola</h1>
            <h1>hola</h1>
            <input type="text" placeholder="Search..." onChange={handleChange} value={searching}/>
            <button onClick={handleSubmit}>Search</button>
        </div>
    )

}