const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../utils/inputCheck");

router.get("/candidates", (req, res) => {
  const sql = `
      SELECT candidates.*, parties.name AS party_name
      FROM candidates
      LEFT JOIN parties
      ON candidates.party_id = parties.id
    `;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({
      message: "Success!",
      data: rows,
    });
  });
});

router.get("/candidate/:id", (req, res) => {
  const sql = `
      SELECT candidates.*, parties.name AS party_name
      FROM candidates
      LEFT JOIN parties
      ON candidates.party_id = parties.id
      WHERE candidates.id = ${req.params.id}
    `;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json(err);
      return;
    }
    res.json({
      message: "Success!",
      data: rows,
    });
  });
});

router.put("/candidate/:id", (req, res) => {
  const errors = inputCheck(req.body, "party_id");
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE candidates SET party_id = ? 
                 WHERE id = ?`;
  const params = [req.body.party_id, req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "success",
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

router.delete("/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Party not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});

module.exports = router;