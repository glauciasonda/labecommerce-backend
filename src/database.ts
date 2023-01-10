import { TProduct, TPurchase, TUser } from "./types";

export const users: TUser[] = [
    {
        id: "001", 
        email: "glauciasonda@gmail.com", 
        password: "teste123"
    },
    {
        id: "002", 
        email: "anderson@tabernaiberica.com.br", 
        password: "golf123"
    }
]

export const products: TProduct[] = [
    {
        id: "001", 
        name: "Vinho A", 
        price: 150, 
        category: "Tinto"
    },
    {
        id: "002", 
        name: "Vinho B", 
        price: 200, 
        category: "Branco"
    }
    
]

export const purchases: TPurchase[] = [
    {
        userId: users[0].id, 
        productId: products[0].id, 
        quantify: 2, 
        totalPrice: 300
    },
    {
        userId: users[1].id, 
        productId: products[1].id, 
        quantify: 3, 
        totalPrice: 600
    }
]