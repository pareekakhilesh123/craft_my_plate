const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const ordersFilePath = path.join(__dirname, "../db/order.json");

let orders = [];
try {
    const data = fs.readFileSync(ordersFilePath, "utf-8");
    orders = JSON.parse(data);
} catch (error) {
    orders = []; 
}


router.get("/orders", (req, res) => {
    res.json(orders);
});


router.post("/orders", (req, res) => {
    const newOrder = {
        id: orders.length + 1,
        userId: req.body.userId,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        status: req.body.status || "Pending"
    };

    orders.push(newOrder); 
    res.status(201).json({
        message: "Order added successfully ",
        order: newOrder
    });
});

module.exports = router;
