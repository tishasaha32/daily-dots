import Cookies from "js-cookie";
import { auth } from "@/app/firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    Cookies.set("authToken", token, { expires: 1 });
    return result.user;
  } catch (error) {
    console.error("Sign-in failed:", error);
  }
};
