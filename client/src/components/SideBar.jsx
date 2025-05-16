import React from 'react';
import { FaTachometerAlt, FaUser, FaBox } from 'react-icons/fa';
import { GiDelicatePerfume, GiPerfumeBottle } from "react-icons/gi";

const SideBar = ({ activeTab, setActiveTab, onNavItemClick }) => {
  return (
    <div className="bg-gray-100 text-gray-900 h-full w-full border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white overflow-y-auto">
      <div className="h-full flex flex-col">
        {/* Logo - oculto en móviles */}
        <h1 className='text-xl md:text-2xl font-bold hidden md:block mt-4 text-center italic'>EM Importados</h1>
        
        {/* Menú */}
        <ul className='flex flex-col mt-2 md:mt-5 space-y-1 md:space-y-0 flex-grow px-1'>
          <li 
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start py-2 px-1 md:px-4 md:space-x-4 rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('dashboard');
              onNavItemClick && onNavItemClick();
            }}
          >
            <FaTachometerAlt className="text-xl md:text-2xl" />
            <span className='text-xs md:text-base md:inline mt-1 md:mt-0'>Dashboard</span>
          </li>
          
          <li 
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start py-2 px-1 md:px-4 md:space-x-4 rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'users' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('users');
              onNavItemClick && onNavItemClick();
            }}
          >
            <FaUser className="text-xl md:text-2xl" />
            <span className="text-xs md:text-base md:inline mt-1 md:mt-0">Usuarios</span>
          </li>
          
          <li 
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start py-2 px-1 md:px-4 md:space-x-4 rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'products' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('products');
              onNavItemClick && onNavItemClick();
            }}
          >
            <FaBox className="text-xl md:text-2xl" />
            <span className="text-xs md:text-base md:inline mt-1 md:mt-0">Productos</span>
          </li>
          
          <li 
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start py-2 px-1 md:px-4 md:space-x-4 rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'settings' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('settings');
              onNavItemClick && onNavItemClick();
            }}
          >
            <GiDelicatePerfume className="text-xl md:text-2xl" />
            <span className="text-xs md:text-base md:inline mt-1 md:mt-0">Nuevo Producto</span>
          </li>

          <li 
            className={`flex flex-col md:flex-row items-center justify-center md:justify-start py-2 px-1 md:px-4 md:space-x-4 rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'notes' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('notes');
              onNavItemClick && onNavItemClick();
            }}
          >
            <GiPerfumeBottle className="text-xl md:text-2xl" />
            <span className="text-xs md:text-base md:inline mt-1 md:mt-0">Nueva Nota</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

// import React from 'react';
// import { FaTachometerAlt, FaUser, FaBox, FaAngleDoubleUp } from 'react-icons/fa';
// import { GiDelicatePerfume, GiPerfumeBottle  } from "react-icons/gi";

// const SideBar = ({ activeTab, setActiveTab, onNavItemClick }) => {
//   return (
//     <div className="bg-gray-100 text-gray-900 h-full px-4 w-full border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white overflow-y-auto">
//       <div className="h-full flex flex-col">
//         <h1 className='text-2xl font-bold hidden md:block mt-4 text-center italic'>EM Importados</h1>
//         <ul className='flex flex-col mt-5 text-xl flex-grow'>
//           <li 
//             className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : ''}`}
//             onClick={() => {
//               setActiveTab('dashboard');
//               onNavItemClick && onNavItemClick();
//             }}
//           >
//             <FaTachometerAlt />
//             <span className='hidden md:inline'>Dashboard</span>
//           </li>
//           <li 
//             className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'users' ? 'bg-blue-600 text-white' : ''}`}
//             onClick={() => {
//               setActiveTab('users');
//               onNavItemClick && onNavItemClick();
//             }}
//           >
//             <FaUser />
//             <span className="hidden md:inline">Ver Usuarios</span>
//           </li>
//           <li 
//             className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'products' ? 'bg-blue-600 text-white' : ''}`}
//             onClick={() => {
//               setActiveTab('products');
//               onNavItemClick && onNavItemClick();
//             }}
//           >
//             <FaBox />
//             <span className="hidden md:inline">Ver Productos</span>
//           </li>
//           <li 
//             className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'settings' ? 'bg-blue-600 text-white' : ''}`}
//             onClick={() => {
//               setActiveTab('settings');
//               onNavItemClick && onNavItemClick();
//             }}
//           >
//            <GiDelicatePerfume />
//             <span className="hidden md:inline">Crear Producto</span>
//           </li>

//           <li 
//             className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'settings' ? 'bg-blue-600 text-white' : ''}`}
//             onClick={() => {
//               setActiveTab('notes');
//               onNavItemClick && onNavItemClick();
//             }}
//           >
//             <GiPerfumeBottle />
//             <span className="hidden md:inline">Crear Note</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideBar;

