const apiKeyMiddleware = require("../middlewares/apiKey");
const router = require("express").Router();
////free from middleware
router.get("/", (req, res) => {
  res.render("index", {
    title: "home page",
  });
});
////request level middleware///
router.get("/api/product", apiKeyMiddleware, (req, res) => {
  res.json([
    {
      id: 1234,
      name: "chrome",
    },
    {
      id: 12345,
      name: "firefox",
    },
  ]);
});

//////route level middleware
// router.use(apiKeyMiddleware);

router.get("/about", (req, res) => {
  res.render("about", { title: "about page" });
});

router.get("/download", (req, res) => {
  res.download(path.resolve(__dirname + "/about.html"));
});

module.exports = router;
