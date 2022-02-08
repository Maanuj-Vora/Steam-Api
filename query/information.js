const express = require("express");
const router = express.Router();
const helper = require('../helper')
var mySQLQueryPromise = require('../utils/db-pool-utility').mySQLQueryPromise;

router.get("/", async (req, res) => {
    try {
        const query_results = await query([req.query.id]);
        helper.sendJsonResponse(req, res, query_results)
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

query = (params) => {
    return mySQLQueryPromise(`select * from Steam where steam_appid = ?`, params)
};

module.exports = router;