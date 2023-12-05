"use client";
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './form.css'
import Popup from '../Popup';


function Form(){

    const [commerceName, setcommerceName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [cif, setCif] = useState('')
    const [addres, setAddres] = useState('')
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('')

    async function handleSubmit (commerce) {
        try {
            const response = await fetch('/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commerce),
            });
    
            if (response.ok) {
                // La solicitud fue exitosa (código de estado 2xx)
                setMessage("Comercio agregado con éxito");
                setShowPopup(true);
            } else {
                // La solicitud fue exitosa pero la respuesta tiene un código de estado no exitoso
                console.error('Respuesta no exitosa:', response.status);
                setMessage("Error al registrar un nuevo comercio");
                setShowPopup(true);
            }
        } catch (error) {
            // Hubo un error en la conexión o la solicitud
            console.error('Error en la función POST:', error);
            setMessage("Error al registrar un nuevo comercio");
            setShowPopup(true);
        }
    };
    
    
  
    const checkFields = async (e) =>{

        e.preventDefault();

        const formValues = [commerceName, email, phone, cif, addres]

          if (formValues.some(value => !value.trim())) {
            setMessage("Es obligatorio completar todos los campos");
            setShowPopup(true);
        
        } else {
            setShowPopup(false);

            const newCommerce = {
                id: uuidv4(),
                commerceName: commerceName,
                email:email,
                phone:phone,
                cif: cif,
                addres:addres,
            }

            console.log(newCommerce)

            const respuesta = await handleSubmit(newCommerce);
            console.log(respuesta)
            
        }

    }


    return(
        <div className="flex items-center justify-center flex-col ">
            <div className='title text-center my-8'>
                <h1 className="text-3xl font-bold text-gray-300 ">DAR DE ALTA UN COMERCIO</h1>
                <p className="text-lg text-red-300 mt-2">Completa el formulario para registrar un nuevo comercio.</p>
            </div>

            {showPopup && <Popup message = {message} onClose={() => setShowPopup(false)} />}

            <form className="w-full max-w-lg rounded mt-8 adminForm " onSubmit={checkFields}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Nombre del comercio
                        </label>
                        <input className="appearance-none block w-full  text-black border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name" type="text" 
                            value={commerceName} 
                            onChange={(e) => setcommerceName(e.target.value)} 
                        />
                        
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-last-name">
                            E-mail
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="grid-last-name" type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-city">
                            Telefono de contacto
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-city" type="tel" pattern='[0-9]*' maxLength={9} minLength={9}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-city">
                            CIF
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        id="grid-city" type="text" pattern="\d{8}[a-zA-Z]" maxLength="9" minLength="9"
                        value={cif}
                        onChange={(e) => setCif(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-password">
                            Dirección
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-password" type="search"
                        value={addres}
                        onChange={(e) => setAddres(e.target.value)}  />
                        <p className="text-gray-400 text-xs italic">direccion del establecimiento</p>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Añadir Comercio
                    </button>
                    </div>
                
            </form>
            
        </div>

    )
}

export default Form