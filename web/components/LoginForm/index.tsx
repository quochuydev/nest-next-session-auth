import { useState } from "react";
import axios from "axios";

function LoginForm({ onSuccess }: any): React.ReactElement {
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
  );
}

export default LoginForm;
