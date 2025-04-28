import { useEffect } from 'react'
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const { getProducts, products } = useProducts();

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default HomePage;