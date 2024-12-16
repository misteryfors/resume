import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.tsx';
import AboutMe from "./pages/AboutMe/AboutMe.tsx";
import SkillsAndTools from "./pages/SkillsAndTools/SkillsAndTools.tsx";
import Projects from "./pages/Projects/Projects.tsx";

const AppRouter: React.FC = () => {
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<MainLayout><AboutMe /></MainLayout>} />
                    <Route path="/SkillsAndTools" element={<MainLayout><SkillsAndTools /></MainLayout>} />
                    <Route path="/Projects" element={<MainLayout><Projects /></MainLayout>} />
                    <Route path="*" element={<MainLayout><AboutMe /></MainLayout>} />

                    <Route path="/Projects/Crypto" element={<iframe src="/projects/src-crypto/crypto.html" title="Crypto Project" />} />
                    <Route path="/Projects/WeatherApp" element={<iframe src="/projects/src-weather-app/weather-app.html" title="WeatherApp Project" />} />
                    <Route path="/Projects/ToDoList" element={<iframe src="/projects/src-to-do-list/to-do-list.html" title="ToDo List Project" />} />
                    <Route path="/Projects/Blog" element={<iframe src="/projects/blog-website--vite-react-app/dist/index.html" title="ToDo List Project" />} />
                    <Route path="/Projects/ProductsList" element={<iframe src="/projects/3m--vite-react-app/dist/index.html" title="Products List Project" />} />
                </Routes>

        </Router>
    );
};

export default AppRouter;
