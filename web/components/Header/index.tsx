import { useState } from "react";
import { useUser } from "../../hooks/useUser";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

export default function Header() {
  const { currentUser, setCurrentUser, logout } = useUser();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  return (
    <>
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
                  <a
                    href="#"
                    className="font-bold px-4"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                )}
              </li>
              {currentUser && <li>user: {currentUser?.username}</li>}
            </ul>
          </div>
        </div>
      </nav>

      {isLoginModalOpen && (
        <LoginForm
          onSuccess={(data: any) => setCurrentUser(data)}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      {isRegisterModalOpen && (
        <RegisterForm onClose={() => setIsRegisterModalOpen(false)} />
      )}
    </>
  );
}
