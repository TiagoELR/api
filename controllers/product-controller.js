const mysql = require("../mysql").pool;

exports.getAllProducts = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ erro: err });
    }
    conn.query("SELECT * FROM products;", (error, result, fields) => {
      if (error) {
        res.status(500).send({ error: error });
      }
      const response = {
        quantity: result.length,
        products: result.map((prod) => {
          return {
            id: prod.id,
            name: prod.name,
            preco: prod.price,
            img: prod.img,
            request: {
              type: "GET",
              description: "Return a especific product.",
              url: "http://127.0.0.1:8081/products/" + prod.id
            }
          };
        })
      };
      return res.status(200).send(response);
    });
  });
};
exports.getProduct = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ err: err });
    }
    conn.query(
      "SELECT * FROM products WHERE id=?;",
      [req.params.id],
      (error, result, fields) => {
        conn.release();
        if (error) {
          res.status(500).send({ error: error });
        }
        if (result.length == 0) {
          return res
            .status(404)
            .send({ message: "Product for this id not Found." });
        }
        const response = {
          product: {
            id: result[0].id,
            name: result[0].name,
            price: result[0].price,
            img: result[0].img,
            request: {
              type: "GET",
              description: "Return all products.",
              url: "http://127.0.0.1:8081/products"
            }
          }
        };
        return res.status(200).send(response);
      }
    );
  });
};
exports.postProduct = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "INSERT INTO products (name, price, img) VALUES (?, ?, ?)",
      [req.body.name, req.body.price, req.file.path],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error, reponse: null });
        }
        const response = {
          message: "Product inserted successfully",
          product: {
            id: result.insertId,
            name: req.body.name,
            price: req.body.price,
            img: req.file.path,
            request: {
              type: "GET",
              description: "Return all products.",
              url: "http://127.0.0.1:8081/products"
            }
          }
        };
        res.status(201).send(response);
      }
    );
  });
};

exports.patchProduct = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "UPDATE products SET name=?, price=?, WHERE id=?",
      [req.body.name, req.body.preco, req.body.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Product updated successfully",
          updatedProduct: {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
            request: {
              type: "GET",
              description: "Return a especific product.",
              url: "http://127.0.0.1:8081/products" + req.body.id
            }
          }
        };
        res.status(201).send(response);
      }
    );
  });
};
exports.deleteProduct = (req, res, next) => {
  mysql.getConnection((err, conn) => {
    if (err) {
      return res.status(500).send({ error: err });
    }
    conn.query(
      "DELETE FROM products WHERE id=?",
      [req.body.id],
      (error, result, field) => {
        conn.release();
        if (error) {
          res.status(500).send({ error: error });
        }
        const response = {
          message: "Product deleted successfully",
          request: {
            type: "POST",
            description: "Insert a product",
            url: "http://127.0.0.1:8081/products",
            body: {
              name: "String",
              price: "Number"
            }
          }
        };
        res.status(202).send(response);
      }
    );
  });
};
