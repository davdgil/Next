"use client";

import { useEffect, useState } from 'react';

const getCommerces = async () => {
    const res = await fetch("http://localhost:3000/api/commerce");
    const data = await res.json();
    console.log(data.commerce);
    return data.commerce;
};

export default function Commerces() {
    const [commerces, setCommerces] = useState([]);

    useEffect(() => {
        const fetchCommercesData = async () => {
            const commerceData = await getCommerces();
            setCommerces(commerceData);
        };

        fetchCommercesData();
    }, []); // El array vacío asegura que el efecto solo se ejecute una vez al montar el componente.

    return (
        <div className="max-w-4xl mx-auto my-8">
            <h2 className="text-3xl font-bold mb-4">Lista de Comercios</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
                {commerces.map((commerce, index) => (
                    <li key={index} className="bg-white rounded-md overflow-hidden shadow-md ">
                        <img
                            src={commerce.imageUrl || 'https://via.placeholder.com/300'}
                            alt={commerce.commerceName}
                            className="w-full h-40 object-cover object-center"
                        />
                        <div className="p-4  h-full ">
                            <h4 className="text-sky-950 text-lg font-bold mb-2">{commerce.commerceName}</h4>
                            <p className="text-gray-900 font-bold">ID: <span className=" text-gray-500  ">{commerce.id}</span></p>
                            <p className="text-gray-900 font-bold">Email: <span className=" text-gray-500  ">{commerce.email || 'No disponible'}</span></p>
                            <p className="text-gray-900 font-bold">Teléfono:<span className=" text-gray-500  "> {commerce.phone || 'No disponible'}</span></p>
                            <p className="text-gray-900 font-bold">CIF: <span className=" text-gray-500  ">{commerce.cif || 'No disponible'}</span></p>
                            <p className="text-gray-900 font-bold">Dirección: <span className=" text-gray-500  ">{commerce.addres || 'No disponible'}</span></p>
                            <div className="mt-4 flex justify-end ">
                                <button 
                                    className="text-blue-500 hover:text-blue-700 font-medium focus:outline-none relative"

                                >Eliminar comercio
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
