import React from "react";

const Footer: React.FC=() =>{
    return(
        <footer className="w-full p-8 box-border">
            <p className="font-normal text-center text-[#F5F4F4FF] sm:text-12 lg:text-16">
                Проект выполнен в рамках стажировки
                <a className="font-normal text-center text-[#F5F4F4FF] sm:text-12 lg:text-16" target="_blank" href="https://preax.ru">PREAX</a>
            </p>
        </footer>
    )
}

export default Footer;