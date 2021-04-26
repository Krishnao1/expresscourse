const ErrorHandler = require("../errors/ErrorHandler");
const router = require("express").Router();

let product = [];

///page data
router.get("/products", (req, res) => {
  res.render("product", { title: "product page" });
});

/////add data/////
router.post("/api/product/add", (req, res, next) => {
  const { name, price } = req.body;
  if (name && price) {
    // console.log(name, price);
    product.push({
      id: new Date().getTime().toString(),
      name,
      price,
    });
    return res.status(202).json({ message: "all good" });
  } else {
    // throw new Error("name and price field required");  //norma error handler
    next(ErrorHandler.validationError("name and price required"));
  }
});
///get data///
router.get("/api/products", (req, res) => {
  res.json(product);
});

router.delete("/api/products/:productId", (req, res) => {
  // console.log(req.params.productId);
  product = product.filter((prod) => req.params.productId !== prod.id);
  res.json({ status: "ok" });
});

module.exports = router;
