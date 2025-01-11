import React, { useState, useEffect } from 'react';
    import './SkillsAndTools.css'

    interface skill {
        img: string;
        name: string;
        experience: string;
        comment: string;
    }

const SkillsAndTools: React.FC = () => {
    const skills: skill[] = [
        {
            img: "React.svg",
            name: "React",
            experience: "1 год+",
            comment: "Опыт в разработке компонентов, управление состоянием через хуки и контекст, интеграция с Redux и RTK Query.",
        },
        {
            img: "CSS.svg",
            name: "CSS",
            experience: "1 год+",
            comment: "Создание адаптивной верстки, работа с Flexbox и Grid, стилизация с использованием SCSS и BEM-методологии.",
        },
        {
            img: "HTML.svg",
            name: "HTML",
            experience: "1 год+",
            comment: "Глубокое понимание семантики HTML5, доступности и использования современных тегов для улучшения SEO.",
        },
        {
            img: "JavaScript.svg",
            name: "JavaScript",
            experience: "1 год+",
            comment: "Уверенное владение ES6+, работа с асинхронным кодом, взаимодействие с API через Fetch и Axios.",
        },
        {
            img: "Redux.svg",
            name: "Redux",
            experience: "6 месяцев+",
            comment: "Настройка глобального состояния приложения, интеграция Redux Toolkit и управление сложными состояниями.",
        },
        {
            img: "Node.svg",
            name: "Node.js",
            experience: "1 год+",
            comment: "Базовые навыки работы с серверной частью, настройка Express.js, работа с файловой системой и обработка API-запросов.",
        },
        {
            img: "Github.svg",
            name: "GitHub",
            experience: "1 год+",
            comment: "Работа с ветками, пулл-реквестами и настройкой CI/CD для автоматизации рабочих процессов.",
        },
        {
            img: "Docker.svg",
            name: "Docker",
            experience: "6 месяцев+",
            comment: "Создание Docker-контейнеров, управление образами, настройка docker-compose для локальной разработки.",
        },
        {
            img: "Webpack.svg",
            name: "Webpack",
            experience: "1 год+",
            comment: "Оптимизация сборки, настройка конфигураций для разработки и продакшена, работа с плагинами и загрузчиками.",
        },
        {
            img: "Vite.svg",
            name: "Vite",
            experience: "6 месяцев+",
            comment: "Использование Vite для быстрой разработки, настройка плагинов и интеграция с React и TypeScript.",
        },
        {
            img: "Dbeaver.svg",
            name: "DBeaver",
            experience: "1 год+",
            comment: "Работа с базами данных через DBeaver, выполнение SQL-запросов и анализ структур данных.",
        },
        {
            img: "MySQL.svg",
            name: "MySQLite",
            experience: "1 год+",
            comment: "Создание баз данных, выполнение CRUD-операций и работа с таблицами и индексами.",
        },
        {
            img: "Tailwind.svg",
            name: "Tailwind CSS",
            experience: "6 месяцев+",
            comment: "Создание компонентов с помощью utility-first подхода, настройка темизации и работа с плагинами Tailwind.",
        },
        {
            img: "TypeScript.svg",
            name: "TypeScript",
            experience: "6 месяцев+",
            comment: "Типизация компонентов и функций, работа с интерфейсами, настройка проекта для улучшения читаемости и предотвращения ошибок.",
        },
        {
            img: "NextJS.svg",
            name: "Next.js",
            experience: "6 месяцев+",
            comment: "Работа с серверным рендерингом (SSR) и статической генерацией (SSG), настройка маршрутизации и API-роутов.",
        },
    ];


    // Состояние для размера чанка
    const [chunkSize, setChunkSize] = useState(3);

    // Функция для группировки массива
    const chunkArray = (array: skill[], size: number) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    // Обновление размера чанка в зависимости от ширины экрана
    useEffect(() => {
        const updateChunkSize = () => {
            if (window.innerWidth <= 1280) {
                setChunkSize(2); // Устанавливаем размер чанка на 2
            } else {
                setChunkSize(3); // Устанавливаем размер чанка на 3
            }
        };

        // Обработчик события изменения размера окна
        window.addEventListener('resize', updateChunkSize);
        updateChunkSize(); // Вызов при монтировании компонента

        return () => {
            window.removeEventListener('resize', updateChunkSize); // Очистка обработчика
        };
    }, []);

    // Генерация сгруппированных данных
    const groupedSkills = chunkArray(skills, chunkSize);

    return (
        <section className="content__block">
            {groupedSkills.map((group, groupIndex) => (
                <div className="skills" key={groupIndex}>
                    <ul className="container-center Slot-separator-50">
                        {group.map((skill, index) => (
                            <li className="skills__skill" key={index}>
                                <div className="skills__person">
                                    <img
                                        src={"./badges/" + skill.img}
                                        alt={skill.name}
                                        className="skills__person-photo"
                                    />
                                    <p className="skills__person-info">
                                        <span className="skills__person-name">{skill.name}</span>
                                        <span className="skills__person-bio">{skill.experience}</span>
                                    </p>
                                </div>
                                <div className="skills__comment">
                                    <p className="skills__comment-text">
                                        {skill.comment}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
};

export default SkillsAndTools;

