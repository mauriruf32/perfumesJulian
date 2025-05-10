import { Link } from "react-router-dom";

function ProductCard({ product }) {
      const formatPrice = (price) => {
        return price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
    };
  return (
    <Link to={`/products/${product.id}`} className="block w-60  dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <div 
        key={product.id} 
        className="bg-gray-600 text-white rounded-lg mb-3 p-4 w-60 h-64 flex flex-col  dark:border-gray-600 dark:bg-white  dark:text-black"
        style={{
          boxShadow: '0 4px 6px -1px rgba(46, 41, 78, 0.3), 0 2px 4px -1px rgba(46, 41, 78, 0.2)'
        }}
      >
        {/* Contenedor de imagen con tamaño fijo */}
        <div className="h-40 flex-grow-0 overflow-hidden rounded-xl">
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
          <h2 className="text-xl font-semibold mt-2">
             ${formatPrice(product.price)}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;