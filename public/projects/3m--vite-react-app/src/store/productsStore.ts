import { create } from 'zustand';
import { Product } from '../types/Product';

interface ProductsState {
    products: Product[];
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    toggleFavorite: (id: string) => void;
    updateProduct: (updatedProduct: Product) => void; // Добавлено определение функции
}


const defaultProducts: Product[] = [
    { id: '1', title: 'Продукт 1', description: 'Описание продукта 1', isFavorite: false, price: 100 },
    { id: '2', title: 'Продукт 2', description: 'Описание продукта 2', isFavorite: false },
    { id: '3', title: 'Продукт 3', description: 'Описание продукта 3', isFavorite: false, price: 200 },
    { id: '4', title: 'Продукт 4', description: 'Описание продукта 4', isFavorite: false },
    { id: '5', title: 'Продукт 5', description: 'Описание продукта 5', isFavorite: false },
    { id: '6', title: 'Продукт 6', description: 'Описание продукта 6', isFavorite: false },
    { id: '7', title: 'Продукт 7', description: 'Описание продукта 7', isFavorite: false },
    { id: '8', title: 'Продукт 8', description: 'Описание продукта 8', isFavorite: false },
    { id: '9', title: 'Продукт 9', description: 'Описание продукта 9', isFavorite: false },
    { id: '10', title: 'Продукт 10', description: 'Описание продукта 10', isFavorite: false },
    { id: '11', title: 'Продукт 11', description: 'Описание продукта 11', isFavorite: false },
    { id: '12', title: 'Продукт 12', description: 'Описание продукта 12', isFavorite: false },
];


const useProductsStore = create<ProductsState>((set) => ({
    products: defaultProducts,
    addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
    deleteProduct: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        })),
    updateProduct: (updatedProduct: Product) => // Указан тип для параметра
        set((state) => ({
            products: state.products.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            ),
        })),
    toggleFavorite: (id) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === id
                    ? { ...product, isFavorite: !product.isFavorite }
                    : product
            ),
        })),
}));


export default useProductsStore;
