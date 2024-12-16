import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductsStore from '../store/productsStore';
import '../styles/pages/CreateProductPage.scss';

const CreateProductPage: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<number | undefined>(undefined);
    const { addProduct } = useProductsStore();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description) {
            alert('Все поля обязательны');
            return;
        }
        addProduct({
            id: Date.now().toString(),
            title,
            description,
            isFavorite: false, // Значение по умолчанию
            price, // Учитываем, что price является необязательным
        });
        navigate('/products');
    };


    return (
        <form className="create-product-page" onSubmit={handleSubmit}>
            <label className="create-product-page__label">
                Название:
                <input
                    type="text"
                    className="create-product-page__input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label className="create-product-page__label">
                Описание:
                <textarea
                    className="create-product-page__textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label className="create-product-page__label">
                Цена:
                <input
                    type="number"
                    className="create-product-page__input"
                    value={price || ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="Необязательное поле"
                />
            </label>
            <button type="submit" className="create-product-page__button">
                Добавить
            </button>
        </form>
    );
};

export default CreateProductPage;
