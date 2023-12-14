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
        <div className="search-bar p-20 mt-10">
            <input type="text" placeholder="Search..." onChange={handleChange} value={searching} className="bg-gray-100"/>
            <button className='bg-grey-500 text-white' onClick={handleSubmit}>Search</button>
        </div>
    )

}