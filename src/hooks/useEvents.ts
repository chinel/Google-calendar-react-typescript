import { useContext } from "react";
import { Context } from "../context/Events";

export default function useEvents() {
  const value = useContext(Context);
  if (value == null) {
    throw new Error("useEvents must be used within the EventsProvider");
  }

  return value;
}
