import { Link, useParams } from "react-router-dom";

function ProductCard({ product }) {
  const {id} = useParams();

  return (
    <Link to={`/products/${product.id}`}>
    <div key={product.id} className="bg-white  text-black rounded-lg border-gray-800 mb-3 p-4">
  <img
  src={product.image}
  alt=""
  className="w-full"
  />
  <h1 className="text-lg font-bold"> 
    {product.name}  
  </h1>
  <h2 className="text-2xl" >
    {product.price}
  </h2>

</div>
    </Link>
  );
}

export default ProductCard;