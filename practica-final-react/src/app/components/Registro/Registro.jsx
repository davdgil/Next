"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Popup from '../Popup';

const Registro = () => {
  const [userType, setUserType] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();


  const handleOptionChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleForm();
  };

  const handleForm = () => {

    if (userType == null) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
      console.log("Tipo de usuario:", userType);
      console.log("Correo electrónico:", email);
      console.log("Contraseña:", pass);
      setEmail('')
      setPass('')

      switch (userType) {
        case 'admin':
          router.push('/admin'); // Ajusta la ruta según la estructura real de tu proyecto

          break;
      }

    }
  };

  return (
    <div className="flex items-center justify-center mt-5">
      {showPopup && <Popup message="Selecciona un usuario" onClose={() => setShowPopup(false)} />}
      <form
        className="bg-slate-800 p-7 rounded-md shadow-md max-w-none mx-auto border border-gray-300"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="UserName">
            Correo electrónico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text" value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="UserPass">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password" value={pass} onChange={(e) => setPass(e.target.value)}
          />
        </div>
        {/*------------------------checkBoxes-------------------------------*/}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-bold mb-2">Que usuario eres:</label>
          <div className="flex items-center">
            <input
              type="radio"
              name="opciones"
              value="admin"
              className="mr-2"
              onChange={handleOptionChange}
            />
            <label htmlFor="opcion1" className="text-gray-300 mr-4">
              Admin
            </label>
            <input
              type="radio"
              name="opciones"
              value="comercio"
              className="mr-2"
              onChange={handleOptionChange}
            />
            <label htmlFor="opcion2" className="text-gray-300 mr-4">
              Comercio
            </label>
            <input
              type="radio"
              name="opciones"
              value="usuario"
              className="mr-2"
              onChange={handleOptionChange}
            />
            <label htmlFor="opcion3" className="text-gray-300 mr-4">
              Usuario
            </label>
            <input
              type="radio"
              name="opciones"
              value="anonimo"
              className="mr-2"
              onChange={handleOptionChange}
            />
            <label htmlFor="opcion3" className="text-gray-300">
              Anonimo
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
        </div>
      </form>






    </div>
  );
};

export default Registro;
