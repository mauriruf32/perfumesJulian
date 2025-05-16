import React, { useState } from 'react';
import ThemeContextProvider from '../context/ThemeContextProvider';
import SideBar from '../components/SideBar';
import ShowProducts from '../components/ShowProducts';
import ShowUsers from '../components/ShowUsers';
import ProductFormPage from './ProductFormPage';
import { FiMenu } from 'react-icons/fi';
import FragranceNoteForm from '../components/CreateFragranceNote';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('products');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeContextProvider>
      <div className='flex min-h-screen bg-gray-100 dark:bg-gray-900'>
        {/* Mobile menu button */}
        <button
          className="md:hidden fixed top-4 left-6 z-50 p-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu className="w-6 h-6" />
        </button>

        {/* SideBar - Responsive */}
        <div className={`fixed md:static z-40 w-64 h-full transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-0' : '-left-64'} md:left-0`}>
          <SideBar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onNavItemClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Contenido principal - Centrado */}
        <div className='flex-1 min-w-0 md:ml-30 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-2 md:p-6 transition-all duration-300'>
          {/* Contenedor del contenido centrado con ancho máximo */}
          <div className='w-full max-w-full md:max-w-4xl mx-auto px-4'>
            {/* Contenido dinámico */}
            {activeTab === 'dashboard' && (
              <div className='w-full'>
                <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Dashboard</h2>
                {/* Contenido del dashboard centrado */}
                <div className="flex justify-center">
                  {/* Aquí tu contenido centrado */}

                </div>
              </div>
            )}
            
            {activeTab === 'users' && (
              <div className='w-full'>
                <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Gestión de Usuarios</h2>
                <div className="flex justify-center">
                  <ShowUsers />
                </div>
              </div>
            )}
            
            {activeTab === 'products' && (
              <div className='w-full'>
                <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Gestión de Productos</h2>
                <div className="flex justify-center">
                  <ShowProducts />
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className='w-full'>
                <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Productos</h2>
                <div className="flex justify-center">
                  <ProductFormPage />
                </div>
              </div>
            )}
                        
            {activeTab === 'notes' && (
              <div className='w-full'>
                <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Notes</h2>
                <div className="flex justify-center">
                <FragranceNoteForm />

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ThemeContextProvider>
  );
}

export default ProfilePage;