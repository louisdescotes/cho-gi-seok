"use client";

import navStore from "@/utils/store";

export default function Collection() {
  const setPage = navStore((state) => state.setPage);
  setPage("collection");

  return <main>Hello</main>;
}
