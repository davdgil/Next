"use client";
import { useState } from 'react'
import './form.css'

function Form(){

    const [merchantName, setmerchantName] = useState('')


    return(
        <div className="flex items-center justify-center ">
            <form className="w-full max-w-lg rounded mt-8 adminForm">
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Nombre del comercio
                </label>
                <input className="appearance-none block w-full  text-black border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
                
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-last-name">
                E-mail
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"  />
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-5">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-city">
                Telefono de contacto
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"  />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-city">
                CIF
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" />
            </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="grid-password">
                Dirección
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text"  />
                <p className="text-gray-400 text-xs italic">direccion del establecimiento</p>
            </div>
            </div>
            
            </form>
        </div>

    )
}

export default Form