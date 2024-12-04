document.addEventListener('DOMContentLoaded', () => {
    const code = `
/* Описание кандидата */
.candidate {
    name: "Новиков Артем";
    role: "Frontend-разработчик";
    experience: "2+ лет";
    location: "Нижний Новгород, Россия";

    skills: {
        languages: ["JavaScript", "TypeScript", "HTML5", "CSS3", "SCSS"],
        frameworks: ["React", "Next.js", "Redux", "Zustand"],
        tools: ["Vite", "Git", "Jest", "Docker", "CI/CD"],
        design: ["Figma", "Adobe XD"]
    };  

/*Я — целеустремлённый разработчик с опытом в создании современных веб-приложений,
  ориентированных на высокую производительность и чистый код. Постоянно стремлюсь
  к инновациям и улучшению своих навыков в области разработки и дизайна. */
}

`;

    // Функция для форматирования кода
    // Функция для форматирования кода
function formatCode(code) {
    return code
        // Стиль для BEM-селекторов с амперсандом
        .replace(/(?<!["'])(&__[\w-]+)(?!["'])(?=(?:[^"]*"[^"]*")*[^"]*$)/g, '<span class="code-block__selector">$1</span>')
        // Стиль для обычных селекторов
        .replace(/(?<!["'])(\.[a-zA-Z0-9_-]+)(?!["'])(?=(?:[^"]*"[^"]*")*[^"]*$)/g, '<span class="code-block__selector">$1</span>')
        // Стиль для свойств
        .replace(/([a-zA-Z-]+):/g, '<span class="code-block__property">$1</span>:')
        // Стиль для значений в квадратных скобках
        .replace(/\[([^\]]+)\]/g, '[<span class="code-block__value">$1</span>]')
        // Стиль для значений
        .replace(/:\s*([^;]+)/g, ': <span class="code-block__value">$1</span>')
        // Стиль для скобок и двоеточий
        .replace(/([{}])/g, '<span class="code-block__punctuation">$1</span>')
        // Отступ в 3 таба (12 пробелов или 3 таба) - без сохранения пробелов
        .replace(/^( {12}|\t{3})(.*)$/gm, '<span class="code-block__indent-3">$2</span>')
        // Отступ в 2 таба (8 пробелов или 2 таба) - без сохранения пробелов
        .replace(/^( {8}|\t{2})(.*)$/gm, '<span class="code-block__indent-2">$2</span>')
        // Отступ в 1 таб (4 пробела или таб) - без сохранения пробелов
        .replace(/^( {4}|\t)(.*)$/gm, '<span class="code-block__indent-1">$2</span>');
}


    const codeBlock = document.querySelector('.code-block');
    codeBlock.innerHTML = formatCode(code);
});
