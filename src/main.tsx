import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/App";
import CriminalRecordApp from "@/examples/criminal-record-app";
import CampusFasoApp from "@/examples/campus-faso-app";
import NationalityCertificateApp from "@/examples/nationality-certificate-app";
import "@/styles/globals.css";

const pathname = window.location.pathname;
const RootApp = pathname.startsWith("/exemple-casier")
  ? CriminalRecordApp
  : pathname.startsWith("/exemple-campusfaso")
    ? CampusFasoApp
    : pathname.startsWith("/exemple-certificat-nationalite")
      ? NationalityCertificateApp
      : App;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);
