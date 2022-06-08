import { useEffect, useState } from "react";
import axios from "../lib/axios";

export function useUser() {
  const [currentUser, setCurrentUser] =
    useState<{ username: string } | null>(null);

  async function logout() {
    await axios({
      url: "auth/logout",
      method: "post",
    });

    setCurrentUser(null);
  }

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

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { currentUser, setCurrentUser, logout };
}
