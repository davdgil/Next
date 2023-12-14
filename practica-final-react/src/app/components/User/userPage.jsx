"use client"
import React from "react";


export default function UserPage({ commerce, click }) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {console.log(commerce)}
        {commerce.map((singleCommerce) => (
          <div
            key={singleCommerce.id}
            className="w-1/2 p-8 bg-slate-300 rounded-lg mb-4 cursor-pointer hover:bg-slate-400"
            onClick={() => click(singleCommerce.id)}
          >
            <p className="text-2xl text-slate-950 mb-2">{singleCommerce.commerceName}</p>
            <hr className="my-6 border-1 border-gray-500" />
            <p className="font-bold text-slate-950">+34 {singleCommerce.phone}</p>
            <p className="font-bold text-slate-950">{singleCommerce.email}</p>
            <p className="font-bold text-slate-950">{singleCommerce.addres}</p>
          </div>
        ))}
      </div>
    );
  }
  
