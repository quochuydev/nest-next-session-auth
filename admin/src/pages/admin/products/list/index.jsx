import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Layout from "../../../../components/Layout";
import config from "../../../../utils/config";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios({
      method: "get",
      url: `${config.server}/api/products`,
    })
      .then(function (response) {
        console.log(response.data?.items);
        setProducts(response.data?.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = (id) => {
    axios({
      method: "delete",
      url: `${config.server}/api/products/${id}`,
    })
      .then(function (response) {
        alert("success");
      })
      .catch(function (error) {
        console.log(error);
        alert("failed");
      });
  };

  return (
    <Layout>
      <nav>
        {products.map((e, i) => (
          <ul key={i}>
            <li>[{i}]</li>
            <li>{e._id}</li>
            <li>{e.title}</li>
            <li>{e.price}</li>
            <li>{e.sku}</li>
            <li>{moment(e.createdAt).format("DD-MM-YYYY HH:mm:ss")}</li>
            <li>
              <button onClick={() => removeProduct(e._id)}>Remove</button>
            </li>
          </ul>
        ))}
      </nav>
    </Layout>
  );
}
