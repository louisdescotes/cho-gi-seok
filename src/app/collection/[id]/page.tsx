"use client";

import navStore from "@/utils/store";
import { useEffect } from "react";

export default function CollectionPage() {
  const setPage = navStore((state) => state.setPage);

  useEffect(() => {
    setPage("CollectionPage");
  }, [setPage]);

  return (
    <section>
      <main>Hello</main>
    </section>
  );
}
