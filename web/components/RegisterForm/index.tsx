import { useState } from "react";
import axios from "axios";

function RegisterForm(): React.ReactElement {
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

  function onRegister() {
    axios({
      baseURL: "http://localhost:5000",
      url: "auth/register",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: registerUser,
      withCredentials: true,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }

  return (
    <div className="register-modal">
      <label htmlFor="email">email</label>
      <input type="text" name="email" onChange={onChangeRegisterUser} />

      <label htmlFor="username">username</label>
      <input type="text" name="username" onChange={onChangeRegisterUser} />

      <label htmlFor="password">password</label>
      <input type="password" name="password" onChange={onChangeRegisterUser} />

      <label htmlFor="confirmPassword">confirmPassword</label>
      <input
        type="password"
        name="confirmPassword"
        onChange={onChangeRegisterUser}
      />

      <button onClick={onRegister}>Register</button>
    </div>
  );
}

export default RegisterForm;
