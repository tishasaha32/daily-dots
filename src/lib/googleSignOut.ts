import Cookies from "js-cookie";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/config";

const handleSignOut = async () => {
  try {
    await signOut(auth);
    Cookies.remove("authToken");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export default handleSignOut;
