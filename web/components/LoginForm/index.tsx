import { useState } from "react";

import axios from "../../lib/axios";
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
        url: "auth/login",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginUser,
      });

      onSuccess(result.data);
      onClose();
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
        <label htmlFor="username" className="block text-gray font-bold">
          username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={onChangeLoginUser}
          placeholder="username"
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />

        <label htmlFor="password" className="block text-gray font-bold mt-5">
          password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={onChangeLoginUser}
          placeholder="password"
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
      </div>
    </Modal>
  );
}

export default LoginForm;
