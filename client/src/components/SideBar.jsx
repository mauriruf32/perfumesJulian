import React from 'react';
import { FaTachometerAlt, FaUser, FaBox, FaCog, FaAngleDoubleUp } from 'react-icons/fa';

const SideBar = ({ activeTab, setActiveTab, onNavItemClick }) => {
  return (
    <div className="bg-gray-100 text-gray-900 h-full px-4 w-full border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white overflow-y-auto">
      <div className="h-full flex flex-col">
        <h1 className='text-2xl font-bold hidden md:block mt-4 text-center italic'>EM Importados</h1>
        <ul className='flex flex-col mt-5 text-xl flex-grow'>
          <li 
            className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('dashboard');
              onNavItemClick && onNavItemClick();
            }}
          >
            <FaTachometerAlt />
            <span className='hidden md:inline'>Dashboard</span>
          </li>
          <li 
            className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'users' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('users');
              onNavItemClick && onNavItemClick();
            }}
          >
            <FaUser />
            <span className="hidden md:inline">Ver Usuarios</span>
          </li>
          <li 
            className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'products' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('products');
              onNavItemClick && onNavItemClick();
            }}
          >
            <FaBox />
            <span className="hidden md:inline">Ver Productos</span>
          </li>
          <li 
            className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'settings' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('settings');
              onNavItemClick && onNavItemClick();
            }}
          >
            <FaCog />
            <span className="hidden md:inline">Crear Productos</span>
          </li>

          <li 
            className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:text-white hover:bg-blue-600 ${activeTab === 'settings' ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => {
              setActiveTab('notes');
              onNavItemClick && onNavItemClick();
            }}
          >
            <FaAngleDoubleUp />
            <span className="hidden md:inline">Crear Notes</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;

