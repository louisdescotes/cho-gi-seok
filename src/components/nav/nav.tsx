"use client";

import navStore from "../../utils/store";
import "./style.css";

export default function Nav() {
  const page = navStore((state) => state.page);

  return (
    <nav className=" z-50 absolute bottom-6 justify-center flex items-center gap-42 w-full h-20">
      <a href="/" className="z-50 flex flex-col items-center gap-2">
        <p className={`${page === "home" ? "nav-actif" : ""} frame`}>집</p>
        <p className="frameSize">Home</p>
      </a>
      <a href="/collection" className="z-50 flex flex-col items-center gap-2">
        <p className={`${page === "collection" ? "nav-actif" : ""} frame`}>
          수집
        </p>
        <p className="frameSize">Collection</p>
      </a>
    </nav>
  );
}
