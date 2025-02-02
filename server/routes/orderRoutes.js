const express = require("express");
const router = express.Router();

let orders = []; 


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
        message: "Order added successfully",
        order: newOrder
    });
});

module.exports = router;
