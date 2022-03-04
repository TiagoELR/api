const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const bcrypt = require("bcrypt");

router.post("/", (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "SELECT * FROM users WHERE email = ?",
      [req.body.email],
      (error, result) => {
        if (error) {
          return res.status(500).send({ error: err });
        }
        if (result.length > 0) {
          return res.status(409).send({ message: "User already exist" });
        } else {
          bcrypt.hash(req.body.password, 10, (bcryptErr, hash) => {
            console.log(bcryptErr);
            if (bcryptErr) {
              return res.status(500).send({ error: bcryptErr });
            }
            conn.query(
              "INSERT INTO users (email, password) VALUES (?, ?)",
              [req.body.email, hash],
              (error, result) => {
                conn.release();
                if (error) {
                  return res.status(500).send({ error: error });
                }
                const response = {
                  message: "User created successfully",
                  userCreated: {
                    id: result.insertId,
                    email: req.body.email
                  }
                };
                return res.status(201).send(response);
              }
            );
          });
        }
      }
    );
  });
});

module.exports = router;
