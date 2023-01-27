import express, {Request, Response}  from "express"
import cors from "cors"
import { db } from "./database/knex";
import { TProduct, TPurchaseDetail, TUser } from "./types";

// configurações dos middlewares
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})

app.get("/ping",  (req: Request, res: Response) => {
    try {
        res.status(200).send("Pong!")
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

/** 
 * 
 * Endpoints para a entidade Users:   
 * 
 * */

app.get("/users", async (req: Request, res: Response) => {
    try{

        const result = await db("users")
        
        res.status(200).send(result)

    } catch (error){
        console.log ("erro ao executar request getUsers: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/users", async(req: Request, res: Response) => {
    try{

        const { id, name, email, password } = req.body
        
        // Validações dos dados de entrada: 
        if(!id) {
            res.status(400)
            throw new Error ("id do usuário deve ser uma string. ") 
        }
        if(id.length !== 11){
            res.status(400)
            throw new Error("id  deve ser um CPF válido com 11 dígitos.")
        }

        if(!name) {
            res.status(400)
            throw new Error ("name  deve ser uma string ") 
        }

        if(!email) {
            res.status(400)
            throw new Error ("email  deve ser uma string. ") 
        }
        if(!email.match(/^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i)){
            res.status(400)
            throw new Error("email não é válido") 

        }

        if(!password) {
            res.status(400)
            throw new Error ("password  deve ser uma string. ") 
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
			throw new Error("password deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
		}

        const [ userIdExists ]: TUser[] | undefined[] = await db("users").where({id})
        if (userIdExists) {
            res.status(400)
            throw new Error ("id  já cadastrado")
        }

        const [ userEmailExists ]: TUser[] | undefined[] = await db("users").where({email})
        if (userEmailExists) {
            res.status(400)
            throw new Error ("email  já cadastrado")
        }

        const [ dateNow ]  =  await db.raw(`SELECT datetime("now", "localtime") as date`)
        const create_at = dateNow.date 

        const newUser: TUser = {
            id,
            name, 
            email,
            password,
            create_at
        }
        await db("users").insert(newUser)
        res.status(201).send("Usuário criado com sucesso!")

    } catch (error){
        console.log ("erro ao executar request postUser: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

/** 
 * 
 * Endpoints para a entidade Products:   
 * 
 * */

app.post("/products", async(req: Request, res: Response) => {
    try{
         const { id, name, category, description, image_url } = req.body
         const price: number = req.body.price as number

         if(!id) {
            res.status(400)
            throw new Error ("id deve ser uma string. ") 
        }
        if(!name) {
            res.status(400)
            throw new Error ("name deve ser uma string. ") 
        }
        if(price <= 0) {
            res.status(400)
            throw new Error ("price deve ser maior que zero. ") 
        }
        if(!category) {
            res.status(400)
            throw new Error ("category deve ser uma string. ") 
        }
        if(!description) {
            res.status(400)
            throw new Error ("description deve ser uma string. ") 
        }
        if(!image_url) {
            res.status(400)
            throw new Error ("image_url deve ser uma string. ") 
        }

        const [ productIdExists ]: TProduct[] | undefined[] = await db("products").where({id})
        if (productIdExists) {
            res.status(400)
            throw new Error ("id   já cadastrado")
        }

        const newProduct: TProduct = {
            id, 
            name, 
            price,
            category,
            description, 
            image_url
        }
        
        await db("products").insert(newProduct)
        res.status(201).send("Produto criado com sucesso!")

    } catch (error){
        console.log ("erro ao executar request postProduct: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.put("/products/:id", async(req: Request, res: Response) => {
    try{
          
        const id = req.params.id as string

        const newName = req.body.name as string 
        const newCategory = req.body.category as string 
        const newDescription = req.body.description as string 
        const newImage_url = req.body.image_url as string 
        const newPrice = req.body.price as number 

        const [ product ]: TProduct[] | undefined[]  =  await db("products").where({id})
        if (!product){
            res.send(400)
            throw new Error ("Produto não encontrado. ")
        } else {
            product.name = newName || product.name
            product.category = newCategory || product.category
            product.description = newDescription || product.description
            product.image_url = newImage_url || product.image_url
            product.price = newPrice || product.price
        }

        await db("products").update(product).where("id", "=", id)
        res.status(200).send("Produto alterado com sucesso! ")
        

    } catch (error){
        console.log ("erro ao executar request postProduct: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get("/products", async (req: Request, res: Response) => {
    try{

        const result = await db("products")
        res.status(200).send(result)

    } catch (error){
        console.log ("erro ao executar request getAllProducts: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
}) 

app.get("/products/search", async (req: Request, res: Response) => {
    try{

        const q = req.query.q as string
        const result = await db("products").where("name", "LIKE", `%${q}%`)
        res.status(200).send(result)

    } catch (error){
        console.log ("erro ao executar request getProductsByQuery: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

/** 
 * 
 * Endpoints para a entidade Purchases:   
 * 
 * */


app.get("/purchases", async (req: Request, res: Response) => {
    try{

        const result = await db("purchases")
        res.status(200).send(result)

    } catch (error){
        console.log ("erro ao executar request getUsers: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.get("/purchases/:id", async (req: Request, res: Response) => {
    try{

        const idPurchase = req.params.id as string

        const purchase = await db("purchases").where("id", "=", idPurchase)
        const user = await db("users").where("id", "=", purchase[0].buyer_id)
        const purchase_products = await db("purchases_products").where("purchase_id", "=", idPurchase)

        let listProducts: TProduct[] = []
        
        for (let i = 0; i< purchase_products.length; i++) {
            let item = await db("products").where("id", "=", purchase_products[i].product_id)
            listProducts.push(item[0]) 
        }

        let purchaseDetail: TPurchaseDetail = {
            purchaseId:   idPurchase, 
            totalPrice: purchase[0].total_price, 
            createAt:   purchase[0].created_at,
            isPaid:     purchase[0].paid === 0 ? false : true, 
            buyerId: user[0].id, 
            name: user[0].name,
            email: user[0].email,
            productsList: listProducts
        } 

        res.status(200).send(purchaseDetail)
    
    } catch (error){
        console.log ("erro ao executar request getPurchaseById: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

/*app.post("/purchases", async (req: Request, res: Response) => {
    try{
        const id = req.body.id as string
        const buyer = req.body.

        const [ user ]: TUser[] = await db("users").where("id", "=", user_id) 

        if (!user) {
            res.status(400)
            throw new Error("usuário não encontrado")

        } else {


        }


        
        res.status(200).send(user)

    } catch (error){
        console.log ("erro ao executar request getPurchaseById: ", error)
        
        if (res.statusCode === 200) {
            res.status(500)
        }
        
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})
*/

