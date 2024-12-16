import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/Layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import CreateProductPage from './pages/CreateProductPage';
import EditProductPage from './pages/EditProductPage';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductPage />} />
                    <Route path="/products/edit/:id" element={<EditProductPage />} />
                    <Route path="/create-product" element={<CreateProductPage />} />
                    <Route path="*" element={<ProductsPage />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default AppRouter;
