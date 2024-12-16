export interface Product {
    id: string;
    title: string;
    description: string;
    isFavorite: boolean;
    price?: number;  // необязательное поле
}
