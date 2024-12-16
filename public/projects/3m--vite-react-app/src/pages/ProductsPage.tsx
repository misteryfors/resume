import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import useProductsStore from '../store/productsStore';
import '../styles/pages/ProductsPage.scss';

const ProductsPage: React.FC = () => {
    const { products } = useProductsStore();
    const [filter, setFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 3;

    // Сброс страницы на первую при изменении фильтра или строки поиска
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, searchTerm]);

    const filteredProducts = products.filter((product) => {
        const matchesFavorite = filter === 'favorites' ? product.isFavorite : true;
        const matchesSearchTerm =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFavorite && matchesSearchTerm;
    });

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const displayedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handlePageChange = (page: number) => setCurrentPage(page);

    return (
        <section className="products-page">
            <h1 className="products-page__title">Список продуктов</h1>
            <FilterBar
                filter={filter}
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <div className="products-page__grid">
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="products-page__pagination">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`products-page__pagination-button ${
                            currentPage === index + 1 ? 'products-page__pagination-button--active' : ''
                        }`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default ProductsPage;
