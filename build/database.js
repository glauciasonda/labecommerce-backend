"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
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
];
exports.products = [
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
];
exports.purchases = [
    {
        userId: exports.users[0].id,
        productId: exports.products[0].id,
        quantify: 2,
        totalPrice: 300
    },
    {
        userId: exports.users[1].id,
        productId: exports.products[1].id,
        quantify: 3,
        totalPrice: 600
    }
];
//# sourceMappingURL=database.js.map