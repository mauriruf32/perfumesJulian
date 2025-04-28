import React from "react";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import Logo from "../images/EMIMPORTADOSLOGO_NEGRO_SIN_FONDO.png"

export function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <Navbar className="w-full px-4 py-3 bg-white text-white shadow-none rounded-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        {/* Logo ajustado */}
        <Link to="/" className="flex items-center">
          <img 
            src={Logo} 
            alt="EM Importados Logo" 
            className="h-12 md:h-16 object-contain hover:scale-105 transition-transform"
          />
        </Link>

        {/* Lista de navegación */}
        <ul className="flex items-center gap-4 md:gap-6">
          { isAuthenticated ? (
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
            <Link to="/profile" className="flex items-center hover:text-blue-600 transition-colors text-black">
              Profile
            </Link>
          </Typography> 
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/" 
            onClick={() => {
              logout();
            }} 
            className="flex items-center hover:text-blue-600 transition-colors text-black">
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
            <Link to="/login" className="flex items-center hover:text-blue-600 transition-colors text-black">
              LogIn
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/register" className="flex items-center hover:text-blue-600 transition-colors text-black">
              Registrate
            </Link>
          </Typography>
            </>
          )}
          

          {/* <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/addproduct" className="flex items-center hover:text-blue-600 transition-colors text-black">
              Add Productos
            </Link>
          </Typography>*/}

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