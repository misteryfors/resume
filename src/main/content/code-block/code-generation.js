document.addEventListener('DOMContentLoaded', () => {
    const code = `
/* Описание кандидата */
.candidate {
    name: "Новиков Артем";
    role: "Frontend-разработчик";
    experience: "2+ лет";
    location: "Нижний Новгород, Россия";

    skills: {
        languages: ["JavaScript", "TypeScript", 
        "HTML5", "CSS3", "SCSS"],
        frameworks: ["React", "Next.js", 
        "Redux", "Zustand"],
        tools: ["Vite", "Git", "Jest", 
        "Docker", "CI/CD"],
        design: ["Figma", "Adobe XD"]
    };  

/*Я — целеустремлённый разработчик с опытом в создании современных
веб-приложений, ориентированных на высокую производительность 
и чистый код. Постоянно стремлюсь к инновациям и улучшению 
своих навыков в области разработки и дизайна. */
}

`;

    // Функция для форматирования кода
    function formatCode(code) {
        return code
            // Стиль для BEM-селекторов с амперсандом, исключая строки в кавычках
            .replace(/(?<!["'])(&__[\w-]+)(?!["'])(?=(?:[^"]*"[^"]*")*[^"]*$)/g, '<span class="code-block__selector">$1</span>')
            // Стиль для обычных селекторов, исключая строки в кавычках
            .replace(/(?<!["'])(\.[a-zA-Z0-9_-]+)(?!["'])(?=(?:[^"]*"[^"]*")*[^"]*$)/g, '<span class="code-block__selector">$1</span>')
            // Стиль для свойств
            .replace(/([a-zA-Z-]+):/g, '<span class="code-block__property">$1</span>:')
            // Стиль для значений
            .replace(/:\s*([^;]+)/g, ': <span class="code-block__value">$1</span>')
            // Стиль для скобок и двоеточий
            .replace(/([{}])/g, '<span class="code-block__punctuation">$1</span>');
    }
    

    const codeBlock = document.querySelector('.code-block');
    codeBlock.innerHTML = formatCode(code);
});
