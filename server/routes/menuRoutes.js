const express = require('express');
const router = express.Router();

const menu = require('../db/menu.json');

router.get('/menu', (req, res) => {
    res.status(200).json({
        status: "success",
        data: menu,
    });

    res.status(401).json({
        status: "data not found"
    });

});

module.exports = router;
