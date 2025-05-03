import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="block w-full  dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <div 
        key={product.id} 
        className="bg-white text-black rounded-lg mb-3 p-4 w-full h-64 flex flex-col  dark:border-gray-600 dark:bg-gray-900 dark:text-white"
        style={{
          boxShadow: '0 4px 6px -1px rgba(46, 41, 78, 0.3), 0 2px 4px -1px rgba(46, 41, 78, 0.2)'
        }}
      >
        {/* Contenedor de imagen con tamaño fijo */}
        <div className="h-40 flex-grow-0 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Contenido */}
        <div className="mt-2 text-center flex flex-col justify-end flex-grow">
          <h5 className="text-lg font-medium line-clamp-2">
            {product.name}  
          </h5>
          <h2 className="text-xl font-semibold text-gray-800 mt-2">
            ${product.price}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;