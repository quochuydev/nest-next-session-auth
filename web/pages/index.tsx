import type { NextPage } from "next";
import { useState } from "react";
import axios from "axios";

const Home: NextPage = () => {
  const [currentUser, setCurrentUser] =
    useState<{ username: string } | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [loginUser, setLoginUser] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [registerUser, setRegisterUser] = useState<{
    username: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    username: "",
    newPassword: "",
    confirmPassword: "",
  });

  function onChangeRegisterUser(event: React.ChangeEvent<HTMLInputElement>) {
    setRegisterUser((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function onChangeLoginUser(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginUser((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function onRegister() {
    axios({
      baseURL: "http://localhost:5000",
      url: "auth/register",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: registerUser,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  async function onLogin() {
    try {
      const result = await axios({
        baseURL: "http://localhost:5000",
        url: "auth/login",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginUser,
      });

      setCurrentUser(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {isLoginModalOpen && (
        <div className="login-modal">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={onChangeLoginUser}
          />

          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChangeLoginUser}
          />

          <button onClick={onLogin}>Login</button>
        </div>
      )}

      {isRegisterModalOpen && (
        <div className="register-modal">
          <label htmlFor="username">username</label>
          <input type="text" id="username" onChange={onChangeRegisterUser} />

          <label htmlFor="newPassword">newPassword</label>
          <input
            type="password"
            id="newPassword"
            onChange={onChangeRegisterUser}
          />

          <label htmlFor="confirmPassword">confirmPassword</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={onChangeRegisterUser}
          />

          <button onClick={onRegister}>Register</button>
        </div>
      )}

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
