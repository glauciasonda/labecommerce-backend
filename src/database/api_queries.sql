
SELECT * 
FROM users u
ORDER BY u.name ASC;

SELECT * 
FROM users
WHERE users.id = "01234567890";

SELECT * FROM products;

SELECT *
FROM products p
ORDER BY p.name ASC;

SELECT *
FROM products
WHERE products.price >= 500 
  AND products.price <= 2000;


SELECT *
FROM products
WHERE products.id = "004";

SELECT * 
FROM products 
WHERE products.name LIKE "%Bolas%";

SELECT * FROM purchases;

SELECT * 
FROM users 
INNER JOIN purchases ON purchases.buyer_id = users.id
WHERE users.id = "02593568917";

INSERT INTO users VALUES ("01234567890", "fulano@email.com", "senhaX");

INSERT INTO products VALUES ("006", "Bolas Titleist Pro V1x (caixa c/ 12)", 498.70, "Bolas");

DELETE FROM users 
WHERE users.id = "01234567890";

DELETE FROM products
WHERE products.id = "006";

UPDATE users
SET password = "novaSenha"
WHERE id = "01234567890";

UPDATE products
SET name = "Nova Descrição", 
    price = 0.10
WHERE products.id = "004";

DROP TABLE users;

SELECT datetime("now", "localtime")

