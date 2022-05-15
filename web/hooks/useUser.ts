import { useEffect, useState } from "react";
import axios from "../lib/axios";

const getCurrentUser = async () => {
  try {
    const result = await axios({
      url: "auth/me",
    });

    return result?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export function useUser() {
  const [currentUser, setCurrentUser] =
    useState<{ username: string } | null>(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { currentUser, setCurrentUser, getCurrentUser };
}
