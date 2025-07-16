import { useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import { CarouselDefault } from '../components/Carousel';

function HomePage() {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <CarouselDefault />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;


// import { useEffect } from 'react'
// import { useProducts } from '../context/ProductsContext';
// import ProductCard from '../components/ProductCard';
// import { CarouselDefault } from '../components/Carousel';

// function HomePage() {
//   const { getProducts, products } = useProducts();

//   useEffect(() => {
//     getProducts()
//   }, [])

//   return (
//     <div>
//       <CarouselDefault/>
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-6">
//         <div className="grid grid-cols-3 min-[500px]:grid-cols-2 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-5 min-[1280px]:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
//           {products.map((product) => (
//             <ProductCard product={product} key={product.id} />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HomePage;

