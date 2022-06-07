import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

import Layout from "../../../components/Layout";
import config from "../../../utils/config";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `${config.server}/api/orders`,
    })
      .then(function (response) {
        console.log(response.data?.items);
        setOrders(response.data?.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      <nav>
        {orders.map((e, i) => (
          <ul key={i}>
            <li>{e._id}</li>
            <li>{JSON.stringify(e.customer)}</li>
            <li>
              {e?.line_items.map((item, index) => (
                <ul key={index}>
                  <li>[{index + 1}]</li>
                  <li>
                    {item.productId} {item.title}
                  </li>
                  <li>
                    {item.price} X {item.quantity} = {item.amount}
                  </li>
                </ul>
              ))}
            </li>
            <li>{e.amount}</li>
            <li>{moment(e.createdAt).format("DD-MM-YYYY HH:mm:ss")}</li>
          </ul>
        ))}
      </nav>
    </Layout>
  );
}
