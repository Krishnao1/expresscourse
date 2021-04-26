const apiKey = (req, res, next) => {
  const api_key = "12345";
  console.log(req.query.api_key);
  if (req.query.api_key && req.query.api_key === api_key) {
    console.log("key match");
  } else {
    res.json({ massage: "not allowed" });
  }
  next();
};

module.exports = apiKey;
