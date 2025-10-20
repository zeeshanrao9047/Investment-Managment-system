import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css';               // Core CSS
import 'primeicons/primeicons.css';                             // Icons
createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster />
  </>
);
