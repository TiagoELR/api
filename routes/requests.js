const { response } = require("express");
const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "SELECT requests.id, requests.quantity, products.id, products.name, products.price FROM requests INNER JOIN products ON products.id = requests.products_id",
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          quantity: result.length,
          requests: result.map((request) => {
            return {
              id: request.id,
              quantity: request.quantity,
              product: {
                products_id: request.products_id,
                name: request.name,
                price: request.price
              },
              request: {
                type: "GET",
                description: "Return a especific request",
                url: "http://localhost:8081/requests/" + request.id
              }
            };
          })
        };
        return res.status(200).send(response);
      }
    );
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "INSERT INTO requests (products_id, quantity) VALUES (?, ? )",
      [req.body.products_id, req.body.quantity],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Request inserted successfully",
          createdRequest: {
            id: result.insertId,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            request: {
              type: "GET",
              description: "Return all requests",
              url: "http://localhost:8081/requests/"
            }
          }
        };
        return res.status(201).send(response);
      }
    );
  });
});

router.get("/:id", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "SELECT * FROM requests WHERE id = ?;",
      [req.params.id],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res
            .status(404)
            .send({ message: "Request not found for this id!" });
        }
        const response = {
          request: {
            id: result[0].id,
            products_id: result[0].products_id,
            quantity: result[0].quantity,
            request: {
              type: "GET",
              description: "Return all requests",
              url: "http://localhost:8081/requests/"
            }
          }
        };
        return res.status(200).send(response);
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
      "UPDATE requests SET products_id=? ,quantity=?, WHERE id=?",
      [req.body.products_id, req.body.quantity, req.body.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Rquest updated successfully",
          updatedRequest: {
            id: req.body.id,
            products_id: req.body.products_id,
            quantity: req.body.quantity,
            request: {
              type: "GET",
              description: "Return all requests.",
              url: "http://127.0.0.1:8081/requests"
            }
          }
        };
        res.status(201).send(response);
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
      "DELETE FROM requests WHERE id=?",
      [req.body.id],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Request deleted successfully",
          request: {
            type: "POST",
            description: "Insert a request",
            url: "http://127.0.0.1:8081/requests",
            body: {
              products_id: "Nunber",
              quantity: "Number"
            }
          }
        };
        return res.status(202).send(response);
      }
    );
  });
});

module.exports = router;
