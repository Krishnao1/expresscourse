const App = () => {
  const [product, setProduct] = React.useState([]);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [data, setData] = React.useState("");

  React.useEffect(() => {
    fetch("/api/products").then((res) =>
      res.json().then((data) => {
        // console.log(data);
        setProduct(data);
      })
    );
  }, [data]);

  const formhandle = (e) => {
    e.preventDefault();
    if (name && price) {
      fetch("/api/product/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, price }),
      })
        .then((res) => res.json())
        .then((result) => setData(result));
    } else {
      return;
    }
    setName("");
    setPrice("");
  };

  const deleteProduct = (prodid) => {
    fetch(`/api/products/${prodid}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        // console.log(result);
      });
  };

  return (
    <div>
      <h1> hello from react </h1>

      <form onClick={formhandle}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Product name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            price
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {" "}
          Submit{" "}
        </button>
      </form>

      <ul>
        {product.map((prod) => (
          <div
            key={prod.id}
            style={{
              display: "flex",
              marginBottom: "5px",
            }}
          >
            <li>
              {" "}
              {prod.name} price - ${prod.price}{" "}
            </li>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => deleteProduct(prod.id)}
            >
              {" "}
              delete{" "}
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
