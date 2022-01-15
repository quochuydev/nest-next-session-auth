import axios from "axios";
import type { NextPage } from "next";
import { useState, useEffect } from "react";

import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Home: NextPage = ({ user }: any) => {
  const [currentUser, setCurrentUser] =
    useState<{ username: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    axios({
      baseURL: "http://localhost:5000",
      url: "auth/me",
      withCredentials: true,
    }).then((res) => setCurrentUser(res?.data));
  }, []);

  async function onLogout() {
    await axios({
      baseURL: "http://localhost:5000",
      url: "auth/logout",
      method: "post",
      withCredentials: true,
    });

    setCurrentUser(null);
  }

  return (
    <div>
      {isLoginModalOpen && (
        <LoginForm onSuccess={(data: any) => setCurrentUser(data)} />
      )}
      {isRegisterModalOpen && <RegisterForm />}

      <nav>
        <div className="container flex justify-between mx-auto">
          <a href="#" className="font-bold">
            SHMW
          </a>
          <div className="hidden lg:block">
            <ul className="inline-flex">
              <li>
                <a href="#" className="font-bold">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="font-bold">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="font-bold">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-bold"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Login
                </a>
                <a
                  href="#"
                  className="font-bold"
                  onClick={() => setIsRegisterModalOpen(true)}
                >
                  Register
                </a>
                <a href="#" className="font-bold" onClick={onLogout}>
                  Logout
                </a>
              </li>
              {currentUser && <li>user: {currentUser?.username}</li>}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mx-auto">
        <h2>Smart Health Monitoring Wristwatch</h2>
        <h3>Monitor your health vitals smartly anywhere you go</h3>
        <button>Pre Order</button>
      </div>

      <section className="container mx-auto">
        <h2 className="text-center font-bold">Features</h2>
      </section>

      <section style={{ backgroundColor: "#667eea" }}>
        <div className="container mx-auto">
          <h2>Limited in Stock</h2>
          <h3>Get yourself the Smart Health Monitoring Wristwatch</h3>
          <button>Pre Order</button>
        </div>
      </section>

      <footer>
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-1/4">Social</div>
            <div className="w-1/4">Contact</div>
            <div className="w-1/4">Services</div>
            <div className="w-1/4">Map</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
