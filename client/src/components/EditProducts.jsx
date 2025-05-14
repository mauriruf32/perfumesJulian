import React, { useState, useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import {URL} from "../config.js"

const EditProduct = () => {
    const [products, setProducts] = useState([]);
    const [editedProduct, setEditedProduct] = useState({});
    const [editStatus, setEditStatus] = useState({});
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { updateProduct } = useProducts();

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${URL}/products`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (productId, product) => {
        setEditStatus((prev) => ({ ...prev, [productId]: true }));
        setEditedProduct({ ...product });
    };

    const handleFieldChange = (fieldName, value) => {
        setEditedProduct(prev => ({
            ...prev,
            [fieldName]: fieldName === "price" ? parseFloat(value) : 
                        fieldName === "deleted" ? value === "true" : value
        }));
    };

    const handleInlineUpdate = async (productId, e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${URL}/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedProduct),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update product");
            }

            const updatedProduct = await response.json();
            setProducts(prev => prev.map(p => p.id === productId ? updatedProduct : p));
            setEditStatus(prev => ({ ...prev, [productId]: false }));
            setEditedProduct({});
        } catch (error) {
            console.error("Error updating product:", error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderInputField = (fieldName, value, productId) => {
        if (fieldName === "deleted") {
            return (
                <select
                    value={editedProduct[fieldName] ?? false}
                    onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                    className="form-select"
                >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            );
        }

        return (
            <input
                type={fieldName === "price" ? "number" : "text"}
                value={editedProduct[fieldName] ?? ""}
                onChange={(e) => handleFieldChange(fieldName, e.target.value)}
                className="form-control"
            />
        );
    };

    const renderTableCell = (product, fieldName) => {
        const isEditing = editStatus[product.id];
        
        return (
            <td key={fieldName}>
                {isEditing ? (
                    renderInputField(fieldName, product[fieldName], product.id)
                ) : fieldName === "deleted" ? (
                    product[fieldName] ? "Sí" : "No"
                ) : (
                    product[fieldName]
                )}
            </td>
        );
    };

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
        }));
    };

    const sortedProducts = React.useMemo(() => {
        return [...products].sort((a, b) => {
            if (!sortConfig.key) return 0;
            
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            
            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [products, sortConfig]);

    if (isLoading && products.length === 0) return <div>Loading...</div>;
    if (error) return <div className="alert alert-danger">Error: {error}</div>;

    return (
        <div className="container mt-4">
            <h2>Editar Productos</h2>
            
            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th onClick={() => handleSort("name")}>Nombre</th>
                            <th onClick={() => handleSort("description")}>Descripción</th>
                            <th onClick={() => handleSort("price")}>Precio</th>
                            <th onClick={() => handleSort("deleted")}>Eliminado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map(product => (
                            <tr key={product.id}>
                                {renderTableCell(product, "name")}
                                {renderTableCell(product, "description")}
                                {renderTableCell(product, "price")}
                                {renderTableCell(product, "deleted")}
                                <td>
                                    {editStatus[product.id] ? (
                                        <>
                                            <button 
                                                onClick={(e) => handleInlineUpdate(product.id, e)}
                                                className="btn btn-success btn-sm me-2"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? "Guardando..." : "Guardar"}
                                            </button>
                                            <button 
                                                onClick={() => setEditStatus(prev => ({ ...prev, [product.id]: false }))}
                                                className="btn btn-secondary btn-sm"
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            onClick={() => handleEdit(product.id, product)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Editar
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EditProduct;

// import React, { useState, useEffect } from "react";

// const EditProduct = () => {
//     const [products, setProducts] = useState([]);
//     const [editedProduct, setEditedProduct] = useState({});
//     const [editStatus, setEditStatus] = useState({});
//     const [sortConfig, setSortConfig] = useState({
//       key: null,
//       direction: "asc",
//     });

//     useEffect(() => {
//       const fetchProducts = async () => {
//         try {
//           const response = await fetch(`http://localhost:4000/api/products`, {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//           const data = await response.json();
//           setProducts(data);
//         } catch (error) {
//           console.error("Error fetching products:", error);
//         }
//       };

//       fetchProducts();
//     }, []);

//     const handleEdit = (productId, product) => {
//       setEditStatus((prevEditStatus) => ({
//         ...prevEditStatus,
//         [productId]: true,
//       }));
//       setEditedProduct({ ...product });
//     };

//     const handleFieldChange = (fieldName, value) => {
//       setEditedProduct((prevEditedProduct) => ({
//         ...prevEditedProduct,
//         [fieldName]: fieldName === "price" ? parseFloat(value) : value,
//       }));
//     };

//     const handleInlineUpdate = async (productId, e) => {
//       e.preventDefault();

//       try {
//         const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(editedProduct),
//         });

//         if (response.ok) {
//           const updatedProduct = await response.json();
//           setProducts((prevProducts) =>
//             prevProducts.map((p) => (p.id === productId ? updatedProduct : p))
//           );
//           setEditStatus((prevEditStatus) => ({
//             ...prevEditStatus,
//             [productId]: false,
//           }));
//           setEditedProduct({});
//         } else {
//           const errorData = await response.json();
//           console.error("Error updating product. Server response:", errorData);
//         }
//       } catch (error) {
//         console.error("Error updating product:", error);
//       }
//     };

//     const renderInputField = (fieldName, value, options = []) => (
//       <div className="input-field">
//         <label>{fieldName}:</label>
//         {options.length ? (
//           <select
//             value={value !== undefined ? value : ""}
//             onChange={(e) => handleFieldChange(fieldName, e.target.value)}
//           >
//             <option value="">Select...</option>
//             {options.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         ) : (
//           <input
//             type={fieldName === "deleted" ? "checkbox" : "text"}
//             value={
//               fieldName === "deleted" ? value : value !== undefined ? value : ""
//             }
//             onChange={(e) => handleFieldChange(fieldName, e.target.value)}
//           />
//         )}
//       </div>
//     );

//     const renderTableHeader = () => {
//       const headers = [
//         "Name",
//         "Description",
//         "Price",
//         // "Stock",
//         // "Size",
//         // "Color",
//         // "Material",
//         // "Category",
//         "Deleted",
//         "Actions",
//       ];

//       return (
//         <tr>
//           {headers.map((header) =>
//             renderHeaderCell(header.toLowerCase(), header)
//           )}
//         </tr>
//       );
//     };

//     const renderHeaderCell = (key, title) => (
//       <th key={key} onClick={() => handleSort(key)}>
//         {title}
//         {sortConfig.key === key && (
//           <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
//         )}
//       </th>
//     );

//     const renderTableCell = (product, fieldName) => {
//       const isEditing = editStatus[product.id];
//       const value = isEditing ? editedProduct[fieldName] : product[fieldName];

//       return (
//         <td key={fieldName}>
//           {isEditing ? (
//             fieldName === "deleted" ? (
//               <div className="input-field">
//                 <label></label>
//                 <select
//                   value={value || false}
//                   onChange={(e) =>
//                     handleFieldChange(fieldName, e.target.value === "true")
//                   }
//                 >
//                   <option value={true}>Sí</option>
//                   <option value={false}>No</option>
//                 </select>
//               </div>
//             ) : (
//               renderInputField(fieldName, value, getOptionsForField(fieldName))
//             )
//           ) : fieldName === "deleted" ? (
//             value ? (
//               "Sí"
//             ) : (
//               "No"
//             )
//           ) : (
//             value
//           )}
//         </td>
//       );
//     };

//     const renderTable = () => {
//       const sortedProducts = [...products].sort((a, b) => {
//         if (sortConfig.key) {
//           const keyA = a[sortConfig.key];
//           const keyB = b[sortConfig.key];
//           if (keyA < keyB) {
//             return sortConfig.direction === "asc" ? -1 : 1;
//           }
//           if (keyA > keyB) {
//             return sortConfig.direction === "asc" ? 1 : -1;
//           }
//         }
//         return 0;
//       });

//       return (
//         <div className="row">
//           <div className="col">
//             <table className="table">
//               <thead className="table-primary">{renderTableHeader()}</thead>
//               <tbody>
//                 {sortedProducts.map((product) => (
//                   <tr key={product.id}>
//                     {renderTableCell(product, "name")}
//                     {renderTableCell(product, "description")}
//                     {renderTableCell(product, "price")}
//                     {/* {renderTableCell(product, "stock")}
//                     {renderTableCell(product, "size")}
//                     {renderTableCell(product, "color")}
//                     {renderTableCell(product, "material")}
//                     {renderTableCell(product, "category")}*/}
//                     {renderTableCell(product, "deleted")} 
//                     <td>
//                       {editStatus[product.id] ? (
//                         <>
//                           <button
//                             className="save-btn"
//                             onClick={(e) => handleInlineUpdate(product.id, e)}
//                           >
//                             Save
//                           </button>
//                           <button
//                             className="cancel-btn"
//                             onClick={() =>
//                               setEditStatus((prevEditStatus) => ({
//                                 ...prevEditStatus,
//                                 [product.id]: false,
//                               }))
//                             }
//                           >
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <button onClick={() => handleEdit(product.id, product)}>
//                           Edit
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       );
//     };

//     const handleSort = (key) => {
//       let direction = "asc";
//       if (sortConfig.key === key && sortConfig.direction === "asc") {
//         direction = "desc";
//       }
//       setSortConfig({ key, direction });
//     };

//     const getOptionsForField = (fieldName) => {
//       switch (fieldName) {
//         case "color":
//           return ["Rojo", "Azul", "Naranja", "Amarillo", "Verde", "Otro"];
//         default:
//           return [];
//       }
//     };

//     return (
//       <div className="edit-prod">
//         {renderTable()}
//       </div>
//     );
// };

// export default EditProduct;