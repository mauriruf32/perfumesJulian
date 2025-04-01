import React from "react";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 bg-blue-500">
      <div className="flex items-center justify-between text-blue-gray-900">
        {/* Logo o nombre de la marca */}
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
          Mi Marca
        </Typography>

        {/* Lista de navegación */}
        <ul className="flex items-center gap-6">
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/login" className="flex items-center hover:text-blue-500 transition-colors">
              LogIn
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/register" className="flex items-center hover:text-blue-500 transition-colors">
              Registrate
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/addproduct" className="flex items-center hover:text-blue-500 transition-colors">
              add Productos
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link to="/profile" className="flex items-center hover:text-blue-500 transition-colors">
              Profile
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <a to="/addproduct" className="flex items-center hover:text-blue-500 transition-colors">
              Crear Producto
            </a>
          </Typography>
        </ul>
      </div>
    </Navbar>
  );
}