"use client";

import navStore from "../../utils/store";
import "./style.css";

export default function Nav() {
  const page = navStore((state) => state.page);

  console.log(page);
  return (
    <nav className="flex items-center gap-42 w-full h-fit">
      <a href="/" className="flex flex-col items-center gap-2">
        <p className={`${page === "home" ? "nav-actif" : ""} frame`}>집</p>
        <p className="frameSize">Home</p>
      </a>
      <a href="/collection" className="flex flex-col items-center gap-2">
        <p className={`${page === "collection" ? "nav-actif" : ""} frame`}>
          수집
        </p>
        <p className="frameSize">Collection</p>
      </a>
    </nav>
  );
}
