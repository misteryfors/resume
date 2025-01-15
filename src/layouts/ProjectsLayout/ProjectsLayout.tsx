import React from 'react';
import "./ProjectsLayout.css";
import { ReactComponent as Back } from '../../assets/arrow-left-circle-fill.svg';
import { ReactComponent as GitHub } from '../../assets/Github.svg';
import { Link, useNavigate } from "react-router-dom";

interface ProjectsLayoutProps {
  link: string;
  children: React.ReactNode;
}

const ProjectsLayout: React.FC<ProjectsLayoutProps> = ({ children, link }) => {
  const navigate = useNavigate(); // Хук для управления навигацией

  const handleBackClick = () => {
    navigate(-1); // Возвращает пользователя на предыдущую страницу
  };

  return (
    <div className="ProjectsLayout">
      <div className="ProjectsLayout__buttons">
        <button className="ProjectsLayout__button" onClick={handleBackClick}>
          <Back className="Icon-large" />
          <p className="ProjectsLayout__button-text">Back</p>
        </button>
        <Link className="ProjectsLayout__button" to={`https://github.com/misteryfors/resume/tree/master/projects/${link}`}>
          <GitHub className="Icon-large" />
          <p className="ProjectsLayout__button-text">GitHub</p>
        </Link>
      </div>
      <div className="ProjectsLayout__content">
        <main className="ProjectsLayout__main">{children}</main>
      </div>
    </div>
  );
};

export default ProjectsLayout;
