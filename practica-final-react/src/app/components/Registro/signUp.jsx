"use client"
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const saveUser = async (user) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      toast.error("Error al añadir un nuevo usuario")
      console.error('Error en la función POST. Código de estado:', response.status);
      return;  // Salir de la función si hay un error en la respuesta
    } else {

      console.log('Usuario añadido con exito');
      toast.success("Usuario añádido con éxito")

    }

  } catch (error) {
    console.error('Error en la función POST:', error);
    toast.error("Error en el servidor")
  }
}

const checkExistingUser = async (user) => {

  try{

  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json();

  const userlog = data.users.find((u) => u.email === user.email);

  if(userlog){
    toast.error("Usuario ya existente")
  }else{
    console.log("comprobando si hay un comercio asociado")
    checkExistingUserCommerce(user);
  }
}catch{
  //esto se ejecuta en caso de no haya ningun usuario en el txt
  console.log("comprobando si hay un comercio asociado catch")
  checkExistingUserCommerce(user);
}

}

const checkExistingUserCommerce = async (user) => {
  try {
    const res = await fetch("http://localhost:3000/api/commerce");
    const data = await res.json();

    const userMerchant = data.commerce.find((u) => u.email === user.email);
    console.log("knsdajsbdjdjsa", userMerchant.password)
    if (userMerchant) {
      console.log(userMerchant);
      toast.success("Usuario comerciante");

      const newUserMerchant = {
        idCommerce: userMerchant.id,
        id: user.id,
        email: user.email,
        password: user.password,
        phone: userMerchant.phone,
        commerceName: userMerchant.commerceName,
        addres: userMerchant.addres,
        userType: 'merchant'
      };
      console.log(newUserMerchant);
      saveUser(newUserMerchant);

    } else {
      toast.error("USUARIO YA REGISTRADO");
    }
  } catch (error) {
    saveUser(user)
  }

}



function SignUp() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const modoAdmin = watch('modoAdmin', false);

  const onSubmit = (data) => {
    const userType = modoAdmin ? 'admin' : 'user';
    console.log(data)

    const newUser = {
      id: uuidv4(),
      userType: userType,
      ...data
    }
    console.log(newUser)
    checkExistingUser(newUser)



  }

  return (

    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

      <div className="w-full bg-gray-950 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-300 md:text-2xl dark:text-white">
            Registro de usuario
            <input
              type="checkbox"
              id="modoAdmin"
              className=" text-black bg-slate-900 hover:bg-red-700 ml-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg "
              {...register('modoAdmin')}

            />
            <label htmlFor="modoAdmin" className="ml-2 text-gray-300 text-sm font-medium">
              Modo Admin
            </label>
          </h1>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Your email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Este campo es requerido',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Ingresa un correo electrónico válido',
                  },
                })}
                id="email"
                className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Password</label>
              <input
                type="text"
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres',
                  },
                })}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full text-black bg-red-600  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Registrarse
            </button>
            <p className="text-sm font-light text-gray-300 dark:text-gray-300">
              Ya tengo una cuenta <Link href="/" className="font-medium text-white hover:underline dark:text-primary-500">Iniciar Sesion</Link>
            </p>
          </form>
        </div>
      </div>
    </div>

  );
};

export default SignUp
