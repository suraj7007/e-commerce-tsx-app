import axios, { AxiosResponse } from "axios";
import { initialStateType } from "../Services/cart-reducer";

export interface storeDatatype {
    id?: number;
    title: string;
    description: string;
    price: number;
    image: string;
    rating: { rate: number };
    category: string;
}

// export interface initialStateType {
//     id?: number;
//     totalPrice: number;
//     totalQuantity?: number;
//     cart: object[];
// }

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 5000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody),
    put: (url: string, body: {}) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

const StoreData = {
    getPosts: (): Promise<storeDatatype[]> => requests.get("products"),
    getAPost: (id: number): Promise<storeDatatype> => requests.get(`products/${id}`),
    createPost: (post: storeDatatype): Promise<storeDatatype> => requests.post("products", post),
    // deletePost: (id: number): Promise<void> => requests.delete(`product/${id}`),
    getCart: (): Promise<initialStateType[]> => requests.get("cart"),
    postCart: (cart: initialStateType): Promise<initialStateType[]> => requests.post("cart", cart),
    updateCart: (cart: initialStateType): Promise<initialStateType[]> => requests.put(`cart`, cart),
    deleteCart: (id: number): Promise<void> => requests.delete(`cart/${id}`),
};

export default StoreData;
