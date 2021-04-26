const express = require("express");
const app = express();
const productRouter = require("./routes/product");
const mainRouter = require("./routes/index");
const ErrorHandler = require("./errors/ErrorHandler");

// app.get("/", (req, res) => {
//   res.send("<h1> express </h1>");
// });
app.set("view engine", "ejs");

//////global level middleware ////////
// app.use(apiKey);

app.use(express.static("public"));
app.use(express.json());

// app.use("/en", mainRouter);
app.use(productRouter);
app.use(mainRouter);
////////tranfer in router=>index.js

// app.get("/", (req, res) => {
//   //   console.log(path.resolve(__dirname + "/index.thml"));
//   //   res.sendFile(path.resolve(__dirname + "/index.html"));
//   res.render("index", {
//     title: "home page",
//   });
// });
// app.get("/about", (req, res) => {
//   //   console.log(path.resolve(__dirname + "/index.thml"));
//   //   res.sendFile(path.resolve(__dirname + "/about.html"));
//   res.render("about", { title: "about page" });
// });
// app.get("/download", (req, res) => {
//   res.download(path.resolve(__dirname + "/about.html"));
// });

////////// error handling//////////
app.use((err, req, res, next) => {
  //normal error handler/////
  // console.log("Error " + err.message);
  // res.status(422).json({ message: err.message });
  // // next();

  ///hum check kr rahi hai ki jo 'err' hai wo instance hai ki nhi ErrorHandler ki//
  if (err instanceof ErrorHandler) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  } else {
    res.status(500).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  }
});

const port = process.env.Port || 3000;
app.listen(port, () => {
  console.log(`server running ${port}`);
});
