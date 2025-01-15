import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout.tsx';
import AboutMe from "./pages/AboutMe/AboutMe.tsx";
import SkillsAndTools from "./pages/SkillsAndTools/SkillsAndTools.tsx";
import Projects from "./pages/Projects/Projects.tsx";
import projectsData from "../public/projects/projectsData.json";
import ProjectsLayout from "./layouts/ProjectsLayout/ProjectsLayout.tsx";

const AppRouter: React.FC = () => {

  return (
    <Router basename="resume/">
      <Routes>
        <Route path="/" element={<MainLayout><AboutMe /></MainLayout>} />
        <Route path="/SkillsAndTools" element={<MainLayout><SkillsAndTools /></MainLayout>} />
        <Route path="/Projects" element={<MainLayout><Projects /></MainLayout>} />
        <Route path="*" element={<MainLayout><AboutMe /></MainLayout>} />



        {projectsData.map((project) => (
          <Route
            key={project.id}
            path={`/Projects/${project.direct}`}
            element={
            (project.direct && <ProjectsLayout link={project.direct.toString()}>
              <iframe
                  src={"/resume/projects/"+project.direct+"/index.html"}
                  title={project.title}
                  style={{ width: '100%', height: '100vh', border: 'none' }}
              />
            </ProjectsLayout>)
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;
