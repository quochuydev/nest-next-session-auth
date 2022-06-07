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

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <Head />
      <Checkout />
      <Product />
      <Cart />
      <CategoryFilters />
      <Landing />
      <Hero />
      <Order />

      <div
        style={{
          background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container mx-auto py-20">
          <h2 className="text-4xl font-bold mb-2 text-white">
            Smart Health Monitoring Wristwatch
          </h2>
          <h3 className="text-2xl mb-8 text-gray-200">
            Monitor your health vitals smartly anywhere you go
          </h3>
          <button className="bg-white font-bold py-4 px-8 rounded-full shadow-lg uppercase">
            Pre Order
          </button>
        </div>
      </div>

      <section className="container mx-auto py-10">
        <h2 className="text-center font-bold text-4xl">Features</h2>
      </section>

      <section style={{ backgroundColor: "#667eea" }}>
        <div className="container mx-auto text-center py-10">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Limited in Stock
          </h2>
          <h3 className="text-xl my-4 text-white">
            Get yourself the Smart Health Monitoring Wristwatch
          </h3>
          <button className="bg-white font-bold py-2 px-4 mb-4 rounded-full shadow-lg uppercase">
            Pre Order
          </button>
        </div>
      </section>

      <ProductList />
      <Footer />
    </div>
  );
};

export default Home;
