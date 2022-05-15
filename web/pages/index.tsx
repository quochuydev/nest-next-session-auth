import type { NextPage } from "next";
import { useState, useEffect } from "react";

import axios from "../lib/axios";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Home: NextPage = () => {
  const [currentUser, setCurrentUser] =
    useState<{ username: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await axios({
          url: "auth/me",
        });

        setCurrentUser(result?.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCurrentUser();
  }, []);

  async function onLogout() {
    await axios({
      url: "auth/logout",
      method: "post",
    });

    setCurrentUser(null);
  }

  return (
    <div>
      <nav>
        <div className="container flex justify-between mx-auto items-center">
          <a href="#" className="font-bold text-4xl">
            QHD
          </a>
          <div className="hidden lg:block">
            <ul className="inline-flex">
              <li>
                <a href="#" className="font-bold px-4">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="font-bold px-4">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="font-bold px-4">
                  Contact
                </a>
              </li>
              <li>
                {!currentUser && (
                  <a
                    href="#"
                    className="font-bold px-4"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Login
                  </a>
                )}
              </li>
              <li>
                {!currentUser && (
                  <a
                    href="#"
                    className="font-bold px-4"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Register
                  </a>
                )}
              </li>
              <li>
                {currentUser && (
                  <a href="#" className="font-bold px-4" onClick={onLogout}>
                    Logout
                  </a>
                )}
              </li>
              {currentUser && <li>user: {currentUser?.username}</li>}
            </ul>
          </div>
        </div>
      </nav>

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

      <div className="grid grid-cols-2">
        <div className="">
          <img src="/NETFLIX1406.png" />
        </div>
        <div className="">
          <p>Tài khoản Netflix Premium for 1 User (1 Tháng)</p>
          <p>Tình trạng: Còn hàng</p>
          <p>Thể loại: App, Giải trí, Xem phim</p>
          <p>79.000đ</p>
          <p>179.000đ</p>
          <p>Thời hạn sử dụng</p>
          <button>1 Tháng</button>
          <button>3 Tháng</button>
          <button>6 Tháng</button>
          <button>1 ngày</button>
          <button>1 tuần</button>
        </div>
      </div>

      <footer>
        <div className="container mx-auto">
          <div className="flex flex-wrap mt-4">
            <div className="w-1/4">
              <h5 className="uppercase font-bold">Social</h5>
            </div>
            <div className="w-1/4">
              <h5 className="uppercase font-bold">Contact</h5>
              <p>Phone number: 0382986838</p>
              <p>Email: quochuy.dev@gmail.com</p>
            </div>
            <div className="w-1/4">
              <h5 className="uppercase font-bold">Services</h5>
            </div>
            <div className="w-1/4">
              <h5 className="uppercase font-bold">Map</h5>
            </div>
          </div>
        </div>
      </footer>

      {isLoginModalOpen && (
        <LoginForm
          onSuccess={(data: any) => setCurrentUser(data)}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterForm onClose={() => setIsRegisterModalOpen(false)} />
      )}
    </div>
  );
};

export default Home;
