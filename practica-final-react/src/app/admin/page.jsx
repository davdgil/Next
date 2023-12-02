import Form from '@/app/components/Admin/form'
import './page.css'
export default function Admin() {
    return (
        <div>
           <div className='title text-center my-8'>
                <h1 className="text-3xl font-bold text-gray-300 ">DAR DE ALTA UN COMERCIO</h1>
                <p className="text-lg text-red-300 mt-2">Completa el formulario para registrar un nuevo comercio.</p>
            </div>


      
            <Form></Form>
           
        </div>
    
        )
}