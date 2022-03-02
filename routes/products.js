const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    conn.query("SELECT * FROM products;", (error, result, fields) => {
      if (error) {
        res.status(500).send({ error: error });
      }
      return res.status(200).send({ result });
    });
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "INSERT INTO products (name, preco) VALUES (?, ?)",
      [req.body.name, req.body.preco],
      (error, results, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error, reponse: null });
        }
        res.status(201).send({
          message: "Product inserted successfully!",
          insertId: results.insertId
        });
      }
    );
  });
});

router.get("/:id", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    conn.query(
      "SELECT * FROM products WHERE id=?;",
      [req.params.id],
      (error, result, fields) => {
        if (error) {
          res.status(500).send({ error: error });
        }
        return res.status(200).send({ result });
      }
    );
  });
});

router.patch("/", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "UPDATE products SET name=?, preco=?, WHERE id=?",
      [req.body.name, req.body.preco, req.body.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        res.status(201).send({ message: "Product updated successfully!" });
      }
    );
  });
});

router.delete("/", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "DELETE FRROM product WHERE id=?",
      [req.body.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          res.status(202).send({ message: "Product deleted successfully!" });
        } 
      }
    );
  });
});

module.exports = router;
