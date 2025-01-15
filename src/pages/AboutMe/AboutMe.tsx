import React, { useEffect, useState } from 'react';
import './AboutMe.css';

const AboutMe: React.FC = () => {
    const [lines, setLines] = useState<string[]>([]); // Хранит массив строк
    const [currentLine, setCurrentLine] = useState(''); // Текущая строка
    const [caption, setCaption] = useState(''); // Текст caption
    const [showCursor, setShowCursor] = useState(true); // Отображение курсора

    const fullText = `
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
    `.trim(); // Убираем лишние переносы

    const captionText = '>  Junior frontend developer';

    // Функция для форматирования кода
    function formatCode(code: string): string {
        return code
          .replace(/(\.[a-zA-Z0-9_-]+\s*\{)/g, '<span class="code-block__selector">$1</span>') // Форматирование селекторов
          .replace(/([a-zA-Z-]+):/g, '<span class="code-block__property">$1</span>:') // Форматирование свойств
          .replace(/\[([^\]]+)\]/g, '[<span class="code-block__value">$1</span>]') // Форматирование значений в массивах
          .replace(/([{}[\],])/g, '<span class="code-block__punctuation">$1</span>')
          .replace(/:\s*"([^"]*)"/g, ': <span class="code-block__value">"$1"</span>') // Форматирование строк в кавычках
          .replace(/:\s*([^;]+)/g, ': <span class="code-block__value">$1</span>') // Форматирование значений после двоеточий (кроме строк в кавычках)
          .replace(/^( {12}|\t{3})(.*)$/gm, '<span class="code-block__indent-3">$2</span>')
          .replace(/^( {8}|\t{2})(.*)$/gm, '<span class="code-block__indent-2">$2</span>')
          .replace(/^( {4}|\t)(.*)$/gm, '<span class="code-block__indent-1">$2</span>');
    }

    useEffect(() => {
        let captionIndex = 0;
        let lineIndex = 0;
        const linesArray = fullText.split('\n'); // Разбиваем текст на строки
        let currentCharIndex = 0;
        setShowCursor(true);
        const captionInterval = setInterval(() => {
            if (captionIndex < captionText.length-1) {
                setCaption((prev) => prev + captionText[captionIndex]);
                captionIndex++;
            } else {
                clearInterval(captionInterval);
                setShowCursor(false); // Убираем курсор после завершения ввода
                startCodeAnimation();
            }
        }, 50); // Медленный вывод caption

        const startCodeAnimation = () => {
            const codeInterval = setInterval(() => {
                if (lineIndex < linesArray.length) {
                    const currentFullLine = linesArray[lineIndex];
                    const nextChar = currentFullLine[currentCharIndex];

                    if (nextChar !== undefined) {
                        setCurrentLine((prev) => prev + nextChar); // Добавляем символ в текущую строку
                        currentCharIndex++;
                    } else {
                        setLines((prev) => [...prev, formatCode(currentFullLine)]);
                        setCurrentLine('');
                        currentCharIndex = 0;
                        lineIndex++;
                    }
                } else {
                    clearInterval(codeInterval);
                }
            }, 20); // Быстрая скорость вывода кода
        };


        return () => {
            clearInterval(captionInterval);
        };
    }, []);

    return (
      <div className="about-me">
          <div className="about-me__text">
              <p className="about-me__caption">
                  {caption}
                  {showCursor && <span className="about-me__cursor">|</span>}
              </p>
              <h1 className="about-me__heading">Артём Новиков</h1>
              <blockquote className="about-me__quote">Не люблю длинные речи и недоделанную работу.</blockquote>
          </div>
          <div className="about-me__code">
              <div className="code-block">
                  {lines.map((line, index) => (
                    <div
                      key={index}
                      className="code-block__line"
                      dangerouslySetInnerHTML={{ __html: line }}
                    ></div>
                  ))}
                  {currentLine && (
                    <div
                      className="code-block__line"
                      dangerouslySetInnerHTML={{ __html: formatCode(currentLine) }}
                    ></div>
                  )}
              </div>
          </div>
      </div>
    );
};

export default AboutMe;
