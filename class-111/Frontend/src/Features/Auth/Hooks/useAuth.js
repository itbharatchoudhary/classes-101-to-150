import { useContext } from "react";
import { AuthContext } from "../Context/Auth.Context";

/*
======================================================
CUSTOM AUTH HOOK
======================================================
Cleaner way to access auth state anywhere
*/

export function useAuth() {
  return useContext(AuthContext);
}