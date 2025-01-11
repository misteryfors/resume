// src/router/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.tsx';
import Home from './pages/Home/Home.tsx';
import News from "./pages/News.tsx";
import Podcasts from "./pages/Podcasts.tsx";
import Resources from "./pages/Resources.tsx";
import Contact from "./pages/Contact.tsx";
import Blog from "./pages/Blog.tsx";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/AboutMe" element={<News/>} />
                    <Route path="/Blog" element={<Blog/>} />
                    <Route path="/Podcasts" element={<Podcasts />} />
                    <Route path="/Resources" element={<Resources />} />
                    <Route path="/Contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </MainLayout>
        </Router>
    );
};

export default AppRouter;
