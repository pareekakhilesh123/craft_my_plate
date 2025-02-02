const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const ordersFilePath = path.join(__dirname, "../db/order.json");
 
const readOrders = () => {
    try {
        const data = fs.readFileSync(ordersFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

 
const writeOrders = (orders) => {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), "utf-8");
};
 
router.get("/orders", (req, res) => {
    const orders = readOrders();
    res.json(orders);
});

 
router.post("/orders", (req, res) => {
    const orders = readOrders();

    const newOrder = {
        id: orders.length + 1,  
        userId: req.body.userId,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        status: req.body.status || "Pending"
    };

    orders.push(newOrder);
    writeOrders(orders);  

    res.status(201).json({
        message: "Order added successfully",
        order: newOrder
    });
});

module.exports = router;
