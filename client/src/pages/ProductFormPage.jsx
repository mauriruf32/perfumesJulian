import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";
import { useState } from "react";

function ProductFormPage() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const { createProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const preset_name = "jvu2gwik";
  const cloud_name = "djsqt7j6v";

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', preset_name);
    setFile(URL.createObjectURL(files[0]));
    setLoading(true);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
            method: 'POST',
            body: data
        });

        const file = await response.json();
        setValue("image", file.secure_url);
        setLoading(false);
    } catch (error) {
        console.error('Error uploading image:', error);
        setLoading(false);
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createProduct(data);
      // Limpiar el formulario después de enviar
      reset();
      setFile(null); // Limpiar la vista previa de la imagen
    } catch (error) {
      console.error("Error creating product:", error);
    }
  });

  return (
    <div className="flex justify-center items-center h-full p-6">
      <form onSubmit={onSubmit} className="bg-white text-black shadow-md rounded-md px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Producto
          </label>
          <input 
            type="text"
            placeholder="Nombre"
            {...register("name", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Precio
          </label>
          <input 
            type="number"
            placeholder="Precio"
            {...register("price", { required: true, min: 0 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Descripción
          </label>
          <textarea 
            placeholder="Descripción"
            {...register("description", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Imagen
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {file && (
            <img 
              src={file} 
              alt="Vista previa" 
              className="w-full h-48 object-contain mx-auto my-4 border rounded"
            />
          )}
          {loading && <p className="text-blue-500 text-sm">Subiendo imagen...</p>}
          <input type="hidden" {...register("image")} />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductFormPage;


// import { useForm } from "react-hook-form";
// import { useProducts } from "../context/ProductsContext";
// import { useState } from "react";

// function ProductFormPage() {
//   const { register, handleSubmit, setValue } = useForm();
//   const { createProduct } = useProducts();
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState();
//   const preset_name = "jvu2gwik";
//   const cloud_name = "djsqt7j6v";

//   const uploadImage = async (e) => {
//     const files = e.target.files;
//     const data = new FormData();
//     data.append('file', files[0]);
//     data.append('upload_preset', preset_name);
//     console.log(e.target.files);
//     setFile(URL.createObjectURL(e.target.files[0]));
//     setLoading(true);

//     try {
//         const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
//             method: 'POST',
//             body: data
//         });

//         const file = await response.json();
//         setValue("image", file.secure_url);
//         setLoading(false);
//     } catch (error) {
//         console.error('Error uploading image:', error);
//         setLoading(false);
//     }
//   }

//   const onSubmit = handleSubmit((data) => {
//     createProduct(data); 
//   });

//   return (
//     <div className="flex justify-center items-center h-full p-6" >
//       <form onSubmit={onSubmit} className="bg-white text-black shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
//         <label htmlFor="name"
//           className="block text-gray-700 text-sm font-bold mb-2 "
//         >
//           Nombre del Producto
//         </label>
//         <input 
//         type="text"
//         placeholder="Nombre"
//         { ...register("name")}
//         autoFocus
//         className="shadow appearance-none border rounded w-full py-2 px-3"
//          />
//         <label htmlFor="price"
//           className="block text-gray-700 text-sm font-bold mb-2 "
//         >
//           Precio
//         </label>
//         <input 
//         type="number"
//         placeholder="Precio"
//         { ...register("price")}
//         autoFocus
//         className="shadow appearance-none border rounded w-full py-2 px-3"
//          />
//         <label htmlFor="description"
//           className="block text-gray-700 text-sm font-bold mb-2 "
//         >
//           Descripcion
//         </label>
//          <textarea 
//          name="description"
//          placeholder="Descripcion"
//          { ...register("description")}
//          className="shadow appearance-none border rounded w-full py-2 px-3"
//          />
//         <label htmlFor="image"
//           className="block text-gray-700 text-sm font-bold mb-2 "
//         >
//           Imagen
//         </label>
       
//         <input
//           type='file'
//           accept="image/*"
//           onChange={uploadImage}
//           className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
//         />
//          <img src={file} alt='' className="w-96 object-contain mx-auto my-4"/>
//         {loading && <p>Uploading image...</p>}

//         <button
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Guardar
//         </button>
//       </form>
//     </div>
//   )
// }

// export default ProductFormPage;