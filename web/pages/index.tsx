import type { NextPage } from "next";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Product from "../components/Product";
import CategoryFilters from "../components/CategoryFilters";
import Head from "../components/Head";
import Checkout from "../components/Checkout";
import Thankyou from "../components/Thankyou";
import Hero from "../components/Hero";
import Order from "../components/Order";
import Landing from "../components/Landing";
import Newsletter from "../components/Newsletter";
import Blogs from "../components/Blogs";
import Blog from "../components/Blog";
import axios from "axios";

export async function getServerSideProps(context: any) {
  const result = await axios({
    url: "api.web.product.getList",
    method: "post",
  });

  return {
    props: {
      products: result.data?.items || [],
    },
  };
}

const Home: NextPage = ({ products }: any) => {
  return (
    <div>
      {/* {JSON.stringify(products)} */}
      {/* <Header /> */}
      <Head />
      <Product product={products[0]} />
      <Cart />
      <ProductList />
      <ProductList {...{ products }} />
      <Checkout />
      {/* <CategoryFilters /> */}
      <Order />
      {/* <Landing /> */}
      <Newsletter />
      {/* <Hero /> */}
      <Blogs />
      <Blogs posts={[]} />
      <Blog />
      <Footer />
    </div>
  );
};

export default Home;
