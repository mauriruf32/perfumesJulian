import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function LoginPage() {
  const { register, handleSubmit, formState: {errors}, } = useForm();
  const { signIn, errors: SignInErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit( async (data) =>{
    signIn(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/profile')
  }, [isAuthenticated])

  return (
    <div class="flex h-[calc(100vh-100px)] items-center justify-center  dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <div class="bg-blue-800  max-w-md w-full p-10 rounded-md" >
      {
        SignInErrors.map((error, i) => (
          <div class="bg-red-500 p-2 text-white text-center my-2">
            {error}
          </div>
        ))
      }
        <h1 class="text-2xl font-bold" >Login</h1>
      <form  onSubmit={onSubmit} >
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Email
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" 
      type="email" 
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
        LogIn
      </button>
    </div>
  </div>
</form>
{/* <p class="flex gap-x-2 justify-between">
  No tienes una cuenta? <Link to="/register"
  class="text-sky-500">Registrate</Link>
</p> */}
      </div>
      
    </div>
  )
}

export default LoginPage;