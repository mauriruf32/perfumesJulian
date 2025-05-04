import React, { useContext } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { ThemeCotext  } from '../context/ThemeContextProvider' // Corregí el typo "ThemeCotext" → "ThemeContext"
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import LogoBlanco from "../images/EMIMPORTADOSLOGO_SIN_FONDO.png"
import LogoNegro from "../images/EMIMPORTADOSLOGO_NEGRO_SIN_FONDO.png"

export function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeCotext ); // Corregí el nombre del contexto

  return (
    <Navbar className="w-full px-4 py-3 bg-white text-white shadow-none rounded-none dark:border-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        {/* Logo dinámico según el tema */}
        <Link to="/" className="flex items-center">
          <img 
            src={theme === "dark" ? LogoBlanco : LogoNegro} // Cambia el logo según el tema
            alt="EM Importados Logo" 
            className="h-12 md:h-16 object-contain hover:scale-105 transition-transform"
          />
        </Link>

        {/* Resto del código... */}
        <ul className="flex items-center gap-4 md:gap-6">
          {isAuthenticated ? (
            <>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
              >
                Bienvenido {user.name}
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
              >
                <Link to="/profile" className="flex items-center hover:text-blue-600 transition-colors text-black dark:text-white">
                  Profile
                </Link>
              </Typography> 
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
              >
                <Link 
                  to="/" 
                  onClick={() => logout()} 
                  className="flex items-center hover:text-blue-600 transition-colors text-black dark:text-white"
                >
                  LogOut
                </Link>
              </Typography> 
            </>
          ) : (
            <>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
              >
                <Link to="/login" className="flex items-center hover:text-blue-600 transition-colors text-black dark:text-white">
                  LogIn
                </Link>
              </Typography>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
              >
                <Link to="/register" className="flex items-center hover:text-blue-600 transition-colors text-black dark:text-white">
                  Registrate
                </Link>
              </Typography>
            </>
          )}
          
          <button className='text-2xl text-black dark:text-white' onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </ul>
      </div>
    </Navbar>
  );
}
// import React from "react";
// import {
//   Navbar,
//   Typography,
// } from "@material-tailwind/react";
// import { Link } from "react-router-dom";
// import Logo from "../images/EMIMPORTADOSLOGO_NEGRO_SIN_FONDO.png"

// export function NavBar() {
//   return (
//     <Navbar className="mx-auto max-w-screen-xl px-6 py-3 bg-white  text-white">
//       <div className="flex items-center justify-between text-blue-gray-900">
//         {/* Logo ajustado */}
//         <Link to="/" className="flex items-center">
//           <img 
//             src={Logo} 
//             alt="EM Importados Logo" 
//             className="h-12 md:h-16 object-contain" // Altura responsive
//           />
//         </Link>

//         {/* Lista de navegación */}
//         <ul className="flex items-center gap-4 md:gap-6">
//           <Typography
//             as="li"
//             variant="small"
//             color="blue-gray"
//             className="p-1 font-medium"
//           >
//             <Link to="/login" className="flex items-center hover:text-blue-600 transition-colors">
//               LogIn
//             </Link>
//           </Typography>
//           <Typography
//             as="li"
//             variant="small"
//             color="blue-gray"
//             className="p-1 font-medium"
//           >
//             <Link to="/register" className="flex items-center hover:text-blue-600 transition-color">
//               Registrate
//             </Link>
//           </Typography>
//           <Typography
//             as="li"
//             variant="small"
//             color="blue-gray"
//             className="p-1 font-medium"
//           >
//             <Link to="/addproduct" className="flex items-center hover:text-blue-600 transition-colors">
//               Add Productos
//             </Link>
//           </Typography>
//           <Typography
//             as="li"
//             variant="small"
//             color="blue-gray"
//             className="p-1 font-medium"
//           >
//             <Link to="/profile" className="flex items-center hover:text-blue-600 transition-colors">
//               Profile
//             </Link>
//           </Typography>
//         </ul>
//       </div>
//     </Navbar>
//   );
// }