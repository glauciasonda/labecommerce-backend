
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL, 
    password TEXT NOT NULL, 
    create_at TEXT NOT NULL
);


INSERT INTO users 
VALUES 
    /*("02593568917", "Gláucia Cristina Sonda", "glauciasonda@gmail.com", "senha1", datime());*/
    ("01708018964", "Anderson Antonio", "anderson@tabernaiberica.com.br", "senha2", datetime("now", "localtime")),
    ("14923508025", "Tomás Sonda Antonio", "tomas@tabernaiberica.com.br", "senha3", datetime("now", "localtime"));


CREATE Table products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL, 
    price REAL NOT NULL, 
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT 
);

INSERT INTO products 
    VALUES 
        ("76198", "Combate de Robôs",                       179.99,     "Marvel",       "null",     "https://legobrasil.vteximg.com.br/arquivos/ids/173688-1000-600/lego_76198_combate_de_robos_homem_aranha_e_doutor_octopus_01.jpg?v=637584159225070000"), 
        ("76209", "Martelo do Thor",                        969.99,     "Marvel",       "null",     "https://legobrasil.vteximg.com.br/arquivos/ids/179540-2000-1200/76209_Lego_Super_Heroes_Marvel_Martelo_de_Thor_01.jpg?v=637929067548430000" ),
        ("10783", "Homem Aranha no Laboratório de Doc Ock", 249.99,     "Marvel",       "null",     "https://legobrasil.vteximg.com.br/arquivos/ids/177570-1000-600/10783_Prod.jpg?v=637782981063570000"),
        ("76408", "Largo Grimmauld",                        1199.99,    "Harry Potter", "null",     "https://legobrasil.vteximg.com.br/arquivos/ids/180016-1000-600/76408_Lego_Harry_Potter_Largo_Grimmauld_n_12_01.jpg?v=637969456409230000"), 
        ("76400", "Carruagem e Testrálio de Hogwarts",      199.99,     "Harry Potter", "null",     "https://legobrasil.vteximg.com.br/arquivos/ids/180431-1000-600/76400_Lego_Harry_Potter_Carruagem_e_Testralio_de_Hogwarts_01.jpg?v=637976600125630000"),
        ("60337", "Trem de Passageiro Expresso",            1999.99,    "City",         "null",     "https://legobrasil.vteximg.com.br/arquivos/ids/181119-1000-600/60337_Lego_City_Trem_de_Passageiros_Expresso_01.jpg?v=637995628106230000"),
        ("60330", "Hospital",                               1349.99,    "City",         "null",     "https://legobrasil.vteximg.com.br/arquivos/ids/177379-2000-1200/60330_Prod.jpg?v=637782881850400000");
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    buyer_id TEXT NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL, 
    created_at TEXT NOT NULL,
    delivered_at TEXT,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

INSERT INTO purchases 
VALUES 
   // (001, "02593568917", 2549.96,  1, datetime("now", "localtime"), null);

 INSERT INTO purchases_products
 VALUES
    ("001", "76400", 1),
    ("001", "76408", 1),
    ("001", "76209", 1),
    ("001", "10783", 1);

select datetime("now", "localtime");   

UPDATE purchases
SET paid = 1, 
    delivered_at = datetime("now", "localtime")
WHERE purchases.id = "001";

CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL, 
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id) 
);

INSERT INTO purchases_products 
VALUES 
    ("001", "002", 1),
    ("001", "003", 2),
    ("001", "001", 1),
    ("002", "006", 1), 
    ("003", "006", 2),
    ("003", "002", 2),  
    ("003", "005", 3),
    ("004", "003", 1);

SELECT * 
FROM purchases_products pp 
INNER JOIN purchases pu ON pu.id = pp.purchase_id
INNER JOIN products  pr ON pr.id = pp.purchase_id;      