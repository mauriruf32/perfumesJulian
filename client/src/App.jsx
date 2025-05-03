import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ProductProvider } from "./context/ProductsContext";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProfilePage from "./pages/ProfilePage";
import DetailProductPage from "./pages/DetailProductPage";
import ProtectedRoute from "./ProtectedRoute";
import ThemeContextProvider from "./context/ThemeContextProvider";

// Componente que decide mostrar el Footer
const FooterVisibility = () => {
  const location = useLocation();
  const protectedRoutes = ['/register', '/addproduct', '/profile'];
  
  // Mostrar footer solo si NO está en una ruta protegida
  return !protectedRoutes.includes(location.pathname) ? <Footer /> : null;
};

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
        <ThemeContextProvider>
           <main className="container content-container mx-auto px-10 md:px-0">
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/products/:id" element={<DetailProductPage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/addproduct" element={<ProductFormPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
              </Route>
            </Routes>
            <FooterVisibility /> {/* Reemplazamos <Footer /> por este componente */}
          </main>
        </ThemeContextProvider>
         
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ProductProvider } from "./context/ProductsContext";
// import { NavBar } from "./components/NavBar";
// import { Footer } from "./components/Footer";
// import { AuthProvider } from "./context/AuthContext";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import ProductFormPage from "./pages/ProductFormPage";
// import ProfilePage from "./pages/ProfilePage";
// import DetailProductPage from "./pages/DetailProductPage";
// import ProtectedRoute from "./ProtectedRoute";

// const App = () => {
//   return (
//   <AuthProvider>
//     <ProductProvider>
//       <BrowserRouter>
//       <main className="container content-container mx-auto px-10 md:px-0">
//       <NavBar />
//       <Routes>
//       <Route path="/" element={<HomePage/>} />
//       <Route path="/products/:id" element={<DetailProductPage/>} />
//       <Route path="/login" element={<LoginPage/>} />

//       <Route element={<ProtectedRoute/>}>
//         <Route path="/register" element={<RegisterPage/>} />
//         <Route path="/addproduct" element={<ProductFormPage/>} />
//         <Route path="/profile" element={<ProfilePage/>} />
//       </Route>
//       </Routes>
//       <Footer/>
//       </main>
//       </BrowserRouter>
//     </ProductProvider>
//   </AuthProvider>
//   )
// }

// export default App;