export type TUser = {
    id: string, 
    name: string, 
    email: string, 
    password: string, 
    create_at: string
}

export type TProduct = {
    id: string, 
    name: string, 
    price: number, 
    category: string, 
    description: string,
    image_url: string
}

export type TPurchase = {
    userId: string, 
    productId: string, 
    quantify: number, 
    totalPrice: number
}

export type TPurchaseDetail = {
    purchaseId: string, 
    totalPrice: number, 
    createAt: string,
    isPaid: boolean, 
    buyerId: string, 
    name: string,
    email: string,
    productsList: TProduct[]
}
