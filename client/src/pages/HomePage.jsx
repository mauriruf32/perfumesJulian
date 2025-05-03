import { useEffect } from 'react'
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';
import { CarouselDefault } from '../components/Carousel';

function HomePage() {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div>
      <CarouselDefault/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4  dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
    </div>

  )
}

export default HomePage;