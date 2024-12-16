import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProductsStore from '../store/productsStore';
import '../styles/pages/EditProductPage.scss';

const EditProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { products, updateProduct } = useProductsStore(); // Используем метод обновления продукта
    const navigate = useNavigate();

    const product = products.find((p) => p.id === id);

    const [title, setTitle] = useState<string>(product?.title || '');
    const [description, setDescription] = useState<string>(product?.description || '');
    const [price, setPrice] = useState<number | undefined>(product?.price);

    if (!product) {
        navigate('/products');
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description) {
            alert('Все поля обязательны');
            return;
        }

        // Обновляем продукт в хранилище
        updateProduct({
            ...product,
            title,
            description,
            price,
        });

        navigate('/products');
    };

    return (
        <form className="edit-product-page" onSubmit={handleSubmit}>
            <h2 className="edit-product-page__title">Редактирование продукта</h2>
            <label className="edit-product-page__label">
                Название:
                <input
                    className="edit-product-page__input"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label className="edit-product-page__label">
                Описание:
                <textarea
                    className="edit-product-page__textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label className="edit-product-page__label">
                Цена:
                <input
                    className="edit-product-page__input"
                    type="number"
                    value={price ?? ''}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
            </label>
            <button className="edit-product-page__button" type="submit">
                Сохранить изменения
            </button>
        </form>
    );
};

export default EditProductPage;
