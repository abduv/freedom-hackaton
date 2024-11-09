import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate(); // Для навигации, если нужно будет в дальнейшем

    const handleChange = (event) => {
        setText(event.target.value);
        const textarea = event.target;
        textarea.style.height = 'auto'; // сбрасываем высоту
        textarea.style.height = `${textarea.scrollHeight}px`; // устанавливаем высоту на scrollHeight
    };

    const handleKeyDown = (event) => {
        // Если нажата клавиша Enter
        if (event.key === "Enter") {
            if (event.shiftKey) {
                // Если одновременно нажаты Shift + Enter, вставляем новую строку
                setText(text + "\n"); // Добавляем новую строку в текстовое поле
                event.preventDefault(); // Предотвращаем стандартное поведение (например, отправка формы)
            } else {
                // Логика для обычного нажатия Enter
                // В данном случае оставим пустым, а позже можно добавить функционал
                console.log("Enter нажата, добавьте вашу логику");
                event.preventDefault(); // Предотвращаем стандартное поведение (например, переход на новую строку)
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[900px] max-w-3xl px-6 py-8">
                <div className="flex items-center space-x-4">
                    <textarea
                        value={text}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} //  обработчик для нажатия клавиш
                        placeholder="Введите ваш запрос"
                        className="w-[900px] h-24 px-4 py-3 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                        className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
                        onClick={() => {
                            // Логика отправки запроса или действия при нажатии кнопки
                            console.log("Кнопка нажата. Запрос отправлен:", text);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Main;
