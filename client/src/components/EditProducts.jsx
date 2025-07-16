import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { URL } from "../config.js";

function EditProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { updateProduct } = useProducts(); // solo usamos updateProduct ahora

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);

  const preset_name = "eymimportados";
  const cloud_name = "dd5qc02kn";

  // ✅ Función local para obtener el producto
// Dentro del componente EditProductForm

const getProductById = async (id) => {
  try {
    const res = await fetch(`${URL}/products/${id}`);
    const data = await res.json();

    // Manejo de formato de respuesta
    if (Array.isArray(data)) {
      return data[0]; // ✅ cuando backend responde [ {...} ]
    } else if (Array.isArray(data.product)) {
      return data.product[0]; // ✅ cuando responde { product: [ {...} ] }
    } else if (typeof data === "object" && data.product) {
      return data.product; // ✅ cuando responde { product: {...} }
    } else {
      console.warn("Formato de respuesta inesperado:", data);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
};


  useEffect(() => {
    async function loadProduct() {
      try {
        const product = await getProductById(id);
        console.log("Producto cargado:", product);
        if (product) {
          setOriginalProduct(product);
          setValue("name", product.name);
          setValue("price", product.price);
          setValue("description", product.description);
          setValue("image", product.image);
          setFile(product.image);
        }
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    }
    loadProduct();
  }, [id, setValue]);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", preset_name);
    setFile(URL.createObjectURL(files[0]));
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const file = await response.json();
      setValue("image", file.secure_url);
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateProduct(id, data);
      alert("Producto actualizado correctamente");
      navigate("/profile");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  });

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded shadow max-w-6xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">
        Editar Producto
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 🧾 Columna izquierda: vista previa original */}
        <div className="md:w-1/2 bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-md font-semibold mb-4 text-gray-700 dark:text-white">
            Información actual
          </h3>
          {originalProduct ? (
            <div className="space-y-4">
              {["name", "price", "description"].map((key) => (
                <div key={key}>
                  <strong className="capitalize text-gray-600 dark:text-gray-300">
                    {key}:
                  </strong>
                  <p className="text-gray-800 dark:text-white">
                    {originalProduct[key]}
                  </p>
                </div>
              ))}
              <div>
                <strong className="text-gray-600 dark:text-gray-300">Imagen actual:</strong>
                <img
                  src={originalProduct.image}
                  alt="Producto"
                  className="w-full h-48 object-contain mt-2 rounded border"
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Cargando información...</p>
          )}
        </div>

        {/* 📝 Columna derecha: formulario editable */}
        <form
          onSubmit={onSubmit}
          className="md:w-1/2 bg-white dark:bg-gray-900 p-4 rounded shadow"
        >
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Precio</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
            <textarea
              {...register("description", { required: true })}
              className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Nueva imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
            />
            {file && (
              <img
                src={file}
                alt="Vista previa"
                className="w-full h-48 object-contain mt-2 rounded border"
              />
            )}
            {loading && <p className="text-blue-500 text-sm">Subiendo imagen...</p>}
            <input type="hidden" {...register("image")} />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductForm;




// import { useForm } from "react-hook-form";
// import { useProducts } from "../context/ProductsContext";
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function EditProductForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { register, handleSubmit, setValue } = useForm();
//   const { updateProduct, getProductById } = useProducts();
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);

//   const preset_name = "eymimportados";
//   const cloud_name = "dd5qc02kn";

//   useEffect(() => {
//     async function loadProduct() {
//       try {
//         const product = await getProductById(id);
//         if (product) {
//           setValue("name", product.name);
//           setValue("price", product.price);
//           setValue("description", product.description);
//           setValue("image", product.image);
//           setFile(product.image);
//         }
//       } catch (error) {
//         console.error("Error al cargar el producto:", error);
//       }
//     }
//     loadProduct();
//   }, [id, setValue, getProductById]);

//   const uploadImage = async (e) => {
//     const files = e.target.files;
//     const data = new FormData();
//     data.append("file", files[0]);
//     data.append("upload_preset", preset_name);
//     setFile(URL.createObjectURL(files[0]));
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
//         {
//           method: "POST",
//           body: data,
//         }
//       );
//       const file = await response.json();
//       setValue("image", file.secure_url);
//     } catch (error) {
//       console.error("Error al subir la imagen:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       await updateProduct(id, data);
//       alert("Producto actualizado correctamente");
//       navigate("/profile"); // volver a la lista
//     } catch (error) {
//       console.error("Error al actualizar el producto:", error);
//     }
//   });

//   return (
//     <div className="p-4 bg-white dark:bg-gray-900 rounded shadow max-w-xl mx-auto mt-8">
//       <form onSubmit={onSubmit}>
//         <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">
//           Editar Producto
//         </h2>

//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
//           <input
//             type="text"
//             {...register("name", { required: true })}
//             className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1">Precio</label>
//           <input
//             type="number"
//             step="0.01"
//             {...register("price", { required: true })}
//             className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
//           <textarea
//             {...register("description", { required: true })}
//             className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 dark:text-gray-300 mb-1">Imagen</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={uploadImage}
//             className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"
//           />
//           {file && (
//             <img
//               src={file}
//               alt="Vista previa"
//               className="w-full h-48 object-contain mt-2 rounded border"
//             />
//           )}
//           {loading && <p className="text-blue-500 text-sm">Subiendo imagen...</p>}
//           <input type="hidden" {...register("image")} />
//         </div>

//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={() => navigate("/products")}
//             className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//           >
//             Cancelar
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? "Guardando..." : "Actualizar"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default EditProductForm;



