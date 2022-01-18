import { useState } from "react";
import axios from "axios";

import Modal from "../Modal";

function LoginForm({ onClose, onSuccess }: any): React.ReactElement {
  const [loginUser, setLoginUser] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  function onChangeLoginUser(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginUser((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
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
        withCredentials: true,
      });

      onSuccess && onSuccess(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      title={"Login"}
      footer={
        <>
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
          <button
            onClick={onLogin}
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Login
          </button>
        </>
      }
    >
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
      </div>
    </Modal>
  );
}

export default LoginForm;
