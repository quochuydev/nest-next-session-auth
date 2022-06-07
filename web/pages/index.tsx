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
import Blog from "../components/Blog";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Head />
      <Product />
      <Cart />
      <ProductList />
      <ProductList />
      <Blog />
      <Checkout />
      {/* <CategoryFilters /> */}
      <Order />
      {/* <Landing /> */}
      <Newsletter />
      {/* <Hero /> */}
      <Footer />
    </div>
  );
};

export default Home;
