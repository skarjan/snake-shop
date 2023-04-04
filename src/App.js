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

const Products = ({ filterSettings, products, filtered }) => {
  console.log(filtered)
  if (filterSettings.useFilter) {
    return (
      <>
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

            {filtered.map((product, i) => (
              <tr key={product.ProductID}>
                <td>{i + 1}</td>
                <td>
                  <img className="product-picture" src={product.ProductPictures[0].Url}></img>
                </td>

                <td>{product.MainDescription}</td>
                <td>€{
                  product.ProductPrices[0].Price
                }</td>
                <td>- 0 +</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }

  return (
    <>
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
          {products.map((product, i) => (
            <tr key={product.ProductID}>
              <td>{i + 1}</td>
              <td>
                <img className="product-picture" src={product.ProductPictures[0].Url}></img>
              </td>

              <td>{product.MainDescription}</td>
              <td>€{
                product.ProductPrices[0].Price
              }</td>
              <td>- 0 +</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

function App() {
  const [productList, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [productBrands, setProductBrands] = useState([])
  const [filter, setFilter] = useState({
    useFilter: false,
    filterType: null,
    filterValue: null
  });
  useEffect(() => {
    document.title = "Snakeshop"
  }, [])

  useEffect(() => {
    storeService.getResponse().then((list) => {
      setProducts(list)
      setFilteredProducts(list)
      const productBrands = list.map((p) => p.Brand)
      const allUniqueBrands = [...new Set(productBrands)]
      const uniqueBrands = allUniqueBrands.filter((b) => b !== null)
      setProductBrands(uniqueBrands)
    });
  }, []);

  const handleBrandChange = (event) => {
    const newFilterType = event.nativeEvent.srcElement.id
    let filterSettings = {}
    if (event.target.value !== "all") {
      filterSettings = {
        useFilter: true,
        filterType: newFilterType,
        filterValue: event.target.value
      }
      const filteredProducts = [...(productList.filter((product) =>
        product[filterSettings.filterType] === filterSettings.filterValue
      ))]
      setFilteredProducts(filteredProducts)
    } else {
      filterSettings = {
        useFilter: false,
        filterType: null,
        filterValue: null
      }
    }
    setFilter(filterSettings)

  }



  return (
    <div className="container">
      <Navbar />
      <div className="row">
        <div className="row">
          <div className="col-2">
            <h5>Filters</h5>
            <h6>Fabrikant</h6>
            <select id={"Brand"} defaultValue={"all"} onChange={handleBrandChange} className="form-control">
              <option value={"all"}>Alles</option>
              {productBrands.map((p) => (
                <option key={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className="col-10">
            <Products filterSettings={filter} products={productList} filtered={filteredProducts} />
          </div>
        </div>
      </div>
    </div>

  );
}

export default App;
