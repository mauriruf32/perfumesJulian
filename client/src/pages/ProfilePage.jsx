import React, { useState } from 'react';
import ThemeContextProvider from '../context/ThemeContextProvider';
import SideBar from '../components/SideBar';
import ShowProducts from '../components/ShowProducts';
import ShowUsers from '../components/ShowUsers';
import ProductFormPage from './ProductFormPage';
import EditUsers from '../components/EditUsers';
import EditProduct from '../components/EditProducts';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('products'); // Estado para controlar la pestaña activa

  return (
    <ThemeContextProvider>
      <div className='flex'>
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className='grow ml-16 md:ml-64 h-full lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white p-6'>
          {/* Contenido dinámico basado en la pestaña activa */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
              {/* Contenido del dashboard */}
            </div>
          )}
          
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
              <ShowUsers />
            </div>
          )}
                    
            {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
              <EditUsers />
            </div>
          )}
          
          {activeTab === 'products' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
              <ShowProducts />
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
              <EditProduct />
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Configuración</h2>
              <ProductFormPage />
            </div>
          )}
        </div>
      </div>
    </ThemeContextProvider>
  );
}

export default ProfilePage;