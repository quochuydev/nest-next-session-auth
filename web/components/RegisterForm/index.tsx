import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import axios from "../../lib/axios";
import Modal from "../Modal";

function RegisterForm({
  onClose,
  open,
  setOpen,
}: {
  onClose: any;
  open: any;
  setOpen: any;
}): React.ReactElement {
  const [registerUser, setRegisterUser] = useState<{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  function onChangeRegisterUser(event: React.ChangeEvent<HTMLInputElement>) {
    setRegisterUser((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  async function onRegister() {
    try {
      const result = await axios({
        url: "auth/register",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: registerUser,
      });

      console.log(result);
      onClose();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <ToastContainer />
      <Modal
        open={open}
        setOpen={setOpen}
        title={"Register"}
        footer={
          <>
            <button
              onClick={onRegister}
              className="text-white bg-indigo-600 active:bg-gray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            >
              Register
            </button>

            <button
              className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Close
            </button>

            {/* <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={onRegister}
            >
              Register
            </button> */}
          </>
        }
      >
        <div className="register-modal">
          <label htmlFor="email">email</label>
          <input
            type="text"
            name="email"
            onChange={onChangeRegisterUser}
            placeholder="email"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />

          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            onChange={onChangeRegisterUser}
            placeholder="username"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />

          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            onChange={onChangeRegisterUser}
            placeholder="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={onChangeRegisterUser}
            placeholder="confirmPassword"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          />
        </div>
      </Modal>
    </>
  );
}

export default RegisterForm;
