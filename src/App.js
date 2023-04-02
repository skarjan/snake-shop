import { useEffect, useState } from "react";
import storeService from "./services/storeService";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="btn navbar-brand">avdveen.nl</button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="btn nav-link" href="https://www.avdveen.nl/">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Header = () => {
  return (
    <>

    </>
  );
};

const List = ({ genreValue, bookList }) => {
  if (bookList.length === 0) {
    return null;
  }
  return (
    <>
      <h4>Why not read:</h4>
      <ol>
        {bookList.map((book) => (
          <li key={book.rank}>
            {book.title
              .split(" ")
              .map(
                (word) =>
                  word[0].toUpperCase() + word.substring(1).toLowerCase()
              )
              .join(" ")}
          </li>
        ))}
      </ol>
    </>
  );
};
function App() {
  const [productList, setProducts] = useState([]);

  useEffect(() => {
    storeService.getResponse().then((list) => {
      setProducts(list)
      console.log(list)
    });
  }, []);

 
 
  return (
    <div className="container">
      <Navbar />
      <div className="row">
        <div className="row">
          <div className="col-2">
            <h5>Filters</h5>
            {productList.map(p=>p.Brand)}
            <select className="form-control">
              {productList.map((p) => (
                <option key={p.ProductID}>
                  {p.Brand}
                </option>
              ))}
            </select>
          </div>
          <div className="col-10">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col"></th>
                  <th scope="col">Product</th>
                  <th scope="col">Prijs</th>
                  <th scope="col">Aantal</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, i) => (
                  <tr key={product.ProductID}>
                    <td>{i + 1}</td>
                    <td>
                      <img className="product-picture" src={product.ProductPictures[0].Url}></img>
                    </td>

                    <td>{product.MainDescription}</td>
                    <td>€{
                      product.ProductPrices[0].Price
                    }</td>
                    <td>0 -+</td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
