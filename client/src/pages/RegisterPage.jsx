import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


function RegisterPage() {
    const { 
      register, 
      handleSubmit,
      formState: { errors },
     } = useForm();
    const { signUp, isAuthenticated, errors: RegisterErrors } = useAuth();
    const navigate = useNavigate();


   useEffect(() => {
    if (isAuthenticated)
      navigate('/')
   }, [isAuthenticated])
    
    const onSubmit = handleSubmit( async (values) =>{
      signUp(values);
    });

  return (
    <div>
      {
        RegisterErrors.map((error, i) => (
          <div class="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))
      }
<form class="w-full max-w-lg"  onSubmit={onSubmit} >
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" 
      type="text" 
      placeholder="Name"
      { ... register ("name", { required: true })} 
      />
      {errors.name && (<p class="text-red-500">Name is requiered</p>)}
    </div>
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Email
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
      type="text" 
      placeholder="Email"
      { ... register ("email", { required: true })} 
      />
      {errors.email && (<p class="text-red-500">Email is requiered</p>)}
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" 
      type="password" 
      placeholder="******************"
      { ... register ("password", { required: true })} 
      />
      {errors.password && (<p class="text-red-500">Password is requiered</p>)}
    </div>
  </div>
  <div class="md:flex md:items-center">
    <div class="md:w-1/3"></div>
    <div class="md:w-2/3">
      <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
      type="submit">
        Register
      </button>
    </div>
  </div>
</form>
<p class="flex gap-x-2 justify-between">
  Ya tienes una cuenta? <Link to="/login"
  class="text-sky-500">Ingresar</Link>
</p>
    </div>
  )
}

export default RegisterPage;