import React, { useEffect } from 'react';
import './AboutMe.css';

const AboutMe: React.FC = () => {
    useEffect(() => {
        const code = `
.candidate {
    name: "Новиков Артем";
    role: "Frontend-разработчик";
    experience: "2+ лет";
    location: "Нижний Новгород, Россия";

    skills: {
        languages: ["JavaScript", "TypeScript", "HTML5", "SCSS"],
        frameworks: ["React", "Redux", "NextJS", "TailWind"],
        tools: ["Vite", "Git", "Docker", "CI/CD"],
        design: ["Figma", "Adobe XD"]
    };  
}
        `;

        // Функция для форматирования кода
        function formatCode(code: string): string {
            return code
                .replace(/(?<!["'])(&__[\w-]+)(?!["'])(?=(?:[^"]*"[^"]*")*[^"]*$)/g, '<span class="code-block__selector">$1</span>')
                .replace(/(?<!["'])(\.[a-zA-Z0-9_-]+)(?!["'])(?=(?:[^"]*"[^"]*")*[^"]*$)/g, '<span class="code-block__selector">$1</span>')
                .replace(/([a-zA-Z-]+):/g, '<span class="code-block__property">$1</span>:')
                .replace(/\[([^\]]+)\]/g, '[<span class="code-block__value">$1</span>]')
                .replace(/:\s*([^;]+)/g, ': <span class="code-block__value">$1</span>')
                .replace(/([{}])/g, '<span class="code-block__punctuation">$1</span>')
                .replace(/^( {12}|\t{3})(.*)$/gm, '<span class="code-block__indent-3">$2</span>')
                .replace(/^( {8}|\t{2})(.*)$/gm, '<span class="code-block__indent-2">$2</span>')
                .replace(/^( {4}|\t)(.*)$/gm, '<span class="code-block__indent-1">$2</span>');
        }

        const formattedCode = formatCode(code);

        const codeBlock = document.querySelector('.code-block');
        if (codeBlock) {
            // Очистка содержимого перед записью
            codeBlock.innerHTML = '';
            codeBlock.innerHTML = formattedCode;
        }
    }, []);

    return (
        <div className="about-me">
            <div className="about-me__text">
                <p className="about-me__caption"> &gt; &nbsp;&nbsp;&nbsp; Junior frontend developer</p>
                <h1 className="about-me__heading">Артём Новиков</h1>
                <blockquote className="about-me__quote">Не люблю длинные речи и недоделанную работу.</blockquote>
            </div>
            <div className="code-block"></div>
        </div>
    );
};

export default AboutMe;
