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
import Announcement from "./components/Announcement";

const FooterVisibility = () => {
  const location = useLocation();
  const protectedRoutes = ['/register', '/addproduct', '/profile'];
  return !protectedRoutes.includes(location.pathname) ? <Footer /> : null;
};

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <ThemeContextProvider>
            {/* Eliminamos container y mx-auto, añadimos w-full y min-h-screen */}
            <main className="w-full min-h-screen dark:bg-gray-900 dark:text-white">
              <Announcement/>
              <NavBar />
              {/* Contenedor para el contenido principal con padding lateral */}
              <div className="px-4 md:px-6 lg:px-8"> {/* Ajusta estos valores según necesites */}
                <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/products/:id" element={<DetailProductPage/>} />
                  <Route path="/login" element={<LoginPage/>} />
                    <Route path="/register" element={<RegisterPage/>} />

                  <Route element={<ProtectedRoute/>}>
                    {/* <Route path="/register" element={<RegisterPage/>} /> */}
                    <Route path="/addproduct" element={<ProductFormPage/>} />
                    <Route path="/profile" element={<ProfilePage/>} />
                  </Route>
                </Routes>
              </div>
              <FooterVisibility />
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