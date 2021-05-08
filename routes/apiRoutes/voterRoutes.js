const express = require("express");
const router = express.Router();
const db = require("../../db/connection");

router.get('/voters', (req, res) => {
    const sql = `SELECT * FROM voters`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json(err);
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

router.get('/voter/:id', (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
    const params = [req.params.id];
    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json(err);
        }
        res.json({
            message: 'Success!',
            data: rows
        });
    });
});

module.exports = router;