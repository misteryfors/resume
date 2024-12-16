import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import useProductsStore from '../store/productsStore';
import { Product } from '../types/Product';
import '../styles/components/ProductCard.scss';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { deleteProduct, toggleFavorite } = useProductsStore();
    const navigate = useNavigate();

    const handleCardClick = (e: MouseEvent) => {
        if (
            (e.target as HTMLElement).tagName === 'BUTTON' ||
            (e.target as HTMLElement).tagName === 'svg'
        )
            return;
        navigate(`/products/${product.id}`);
    };

    const handleEditClick = (e: MouseEvent) => {
        e.stopPropagation(); // предотвращаем клик на карточке
        navigate(`/products/edit/${product.id}`);
    };

    return (
        <div className="product-card" onClick={handleCardClick}>
            <h3 className="product-card__title">{product.title}</h3>
            <p className="product-card__description">
                {product.description.length > 100
                    ? `${product.description.slice(0, 100)}...`
                    : product.description}
            </p>
            <p className="product-card__price">Цена: {product.price ? product.price + "руб.":"Не указанна"}</p>
            <div className="product-card__actions">
                <button
                    className={`product-card__button ${
                        product.isFavorite ? 'product-card__button--favorite' : ''
                    }`}
                    onClick={(e) => {
                        e.stopPropagation(); // предотвращаем клик на карточке
                        toggleFavorite(product.id);
                    }}
                >
                    {product.isFavorite ? '❤️' : '🤍'}
                </button>
                <button
                    className="product-card__button product-card__button--delete"
                    onClick={(e) => {
                        e.stopPropagation(); // предотвращаем клик на карточке
                        deleteProduct(product.id);
                    }}
                >
                    🗑️
                </button>
                <button
                    className="product-card__button product-card__button--edit"
                    onClick={handleEditClick}
                >
                    ✏️
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
