import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function useAppContext() {
  return useContext(AppContext);
}
