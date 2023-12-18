
"use client"
import { useState, useEffect } from "react";


export default function UserList({ userFilter }) {

    return (
        <div className="max-w-4xl mx-auto my-8">
            <h2 className="text-3xl text-gray-300 font-bold mb-4">Lista de Usuarios</h2>
            {userFilter && userFilter.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userFilter.map((user, index) => (
                        <li key={index} className="bg-white rounded-md overflow-hidden shadow-md">
                            <img
                                src={`https://picsum.photos/300/200?unique=${user.id}`}
                                className="w-full h-40 object-cover object-center"
                            />
                            <div className="p-4  h-full ">
                                <h4 className="text-sky-950 text-lg font-bold mb-2">{user.commerceName}</h4>
                                <p className="text-gray-900 font-bold">ID: <span className=" text-gray-500  ">{user.id}</span></p>
                                <p className="text-gray-900 font-bold">Email: <span className=" text-gray-500  ">{user.email || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">Teléfono:<span className=" text-gray-500  "> {user.userType || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">CIF: <span className=" text-gray-500  ">{user.cif || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">Dirección: <span className=" text-gray-500  ">{user.addres || 'No disponible'}</span></p>
                                <div className="mt-4 flex justify-end ">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 font-medium focus:outline-none relative"
                                        onClick={() => deleteComerces(user.id)}
                                    >
                                        Eliminar comercio
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay comercios disponibles</p>
            )}
        </div>
    );
}