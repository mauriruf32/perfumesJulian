import { useEffect } from 'react'
import { useProducts } from '../context/ProductsContext';
import ProductCard from '../components/ProductCard';

function HomePage() {
  const { getProducts, products } = useProducts();
console.log(products)

  useEffect(() => {
    getProducts()
  } ,[])

   return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  )
}

export default HomePage;