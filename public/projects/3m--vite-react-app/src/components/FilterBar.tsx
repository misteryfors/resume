import React from 'react';
import '../styles/components/FilterBar.scss';

interface FilterBarProps {
    filter: string;
    setFilter: (filter: string) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter, searchTerm, setSearchTerm }) => {
    return (
        <div className="filter-bar">
            <button
                className={`filter-bar__button ${filter === 'all' ? 'filter-bar__button--active' : ''}`}
                onClick={() => setFilter('all')}
            >
                Все
            </button>
            <button
                className={`filter-bar__button ${filter === 'favorites' ? 'filter-bar__button--active' : ''}`}
                onClick={() => setFilter('favorites')}
            >
                Избранное
            </button>
            <input
                type="text"
                className="filter-bar__search"
                placeholder="Поиск по названию или описанию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default FilterBar;
