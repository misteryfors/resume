import './Header.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault(); // Предотвращаем отправку формы
        if (input.trim()) {
            navigate(`/${encodeURIComponent(input)}`);// Обновляем ссылку
        }
    };

    return (
        <header className="w-full flex justify-between items-center p-8 box-border sm:gap-[16px] lg:gap-[135px]">
            <h1 className="hidden">Погода в вашем городе</h1>
            <div className="py-[10px] px-[0] box-border h-[48px] w-[54px] lg:w-[192px]">
                <div className="w-full h-full bg-[url('/img/Tablet.svg')] bg-cover bg-no-repeat bg-center lg:bg-[url('/img/logo.svg')]"></div>
            </div>
            <form
                className="relative w-full max-w-[506px]"
                onSubmit={handleSearch} // Заменяем стандартное поведение формы
            >
                <input
                    value={input}
                    className="header__search-input"
                    placeholder="Поиск по городу"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit" // Кнопка отправки
                    className="header__search-button"
                ></button>
            </form>
        </header>
    );
};

export default Header;
