import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import "./productsection.css";
import { useContext, useEffect, useState } from "react";
import Prod from "./prod";
import AddProduct from "./addprod";
import { AdminContext } from "../../context";
import { TailSpin } from "react-loader-spinner";
import { URL } from "../../constant/const";

function ProductSection() {
  const [products, setProducts] = useState();
  const { isAdmin } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);
  const [prodo, serProdo] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${URL}/products`)
      .then((response) => {
        response
          .json()
          .then((products) => {
            setProducts(products);
            serProdo(products);
            setError(null);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, []);

  const [searchVal, setSearchVal] = useState("");
  const [searchType, setSearchType] = useState("type");

  function handleSearch(e) {
    setSearchVal(e.target.value);
    if (e.target.value === "") {
      setProducts(prodo);
      return;
    }
    const filterBySearch = products.filter((item) => {
      if (searchType === "name") {
        if (
          item.prodname.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      }
      if (searchType === "duration") {
        if (
          item.prodduration.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      }
      if (searchType === "type") {
        if (
          item.prodtype.toLowerCase().includes(e.target.value.toLowerCase())
        ) {
          return item;
        }
      }
    });
    setProducts(filterBySearch);
  }
  function CreateCard(product) {
    return (
      <Prod
        id={product._id}
        name={product.prodname}
        image={product.prodimage}
        duration={product.prodduration}
        type={product.prodtype}
        price={product.prodprice}
        setProducts={setProducts}
      />
    );
  }
  return (
    <>
      <div>
        {!error && !isLoading && (
          <Form className="d-flex">
            <Form.Select
              className="me-2"
              onChange={(e) => {
                setSearchType(e.target.value);
              }}
              aria-label="Default select example"
            >
              <option value="type">--------------</option>
              <option value="name">Name</option>
              <option value="type">Type</option>
              <option value="duration">Duration</option>
            </Form.Select>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchVal}
              onChange={handleSearch}
            />
          </Form>
        )}
      </div>
      {isLoading && (
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TailSpin
            height="200"
            width="200"
            color="#800000"
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperStyle={{ margin: "auto" }}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
      {error && (
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://t4.ftcdn.net/jpg/05/92/91/99/360_F_592919939_IrEOZvIZuxDGZNsZlCfdOBBtEz8OoFkd.jpg"
            style={{ width: "300px" }}
          ></img>
        </div>
      )}

      {!isLoading && !error && (
        <Container className="contain">
          {!isLoading && !error && isAdmin && (
            <AddProduct products={products} setProducts={setProducts} />
          )}
          {products?.map(CreateCard)}
        </Container>
      )}
    </>
  );
}

export default ProductSection;
