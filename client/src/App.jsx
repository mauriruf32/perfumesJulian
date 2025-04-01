import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductsContext";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductFormPage from "./pages/ProductFormPage";
import ProfilePage from "./pages/ProfilePage";
import DetailProductPage from "./pages/DetailProductPage";

import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
  <AuthProvider>
    <ProductProvider>
      <BrowserRouter>
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
      </main>
      </BrowserRouter>
    </ProductProvider>
  </AuthProvider>
  )
}

export default App;