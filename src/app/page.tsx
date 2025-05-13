"use client";

import MainText from "@/components/MainText";
import navStore from "@/utils/store";

export default function Home() {
  const setPage = navStore((state) => state.setPage);
  setPage("home");

  return (
    <main className="relative h-screen w-full">
      <div className="flex justify-center items-center h-full w-full max-w-xl mx-auto">
        <MainText korean="정보" align="">
          <p>
            Cho Gi-Seok est un photographe sud-coréen né en 1992 à Séoul. Il a
            débuté sa carrière en tant que graphiste et directeur artistique
            avant de se tourner vers la photographie.
          </p>
          <p>
            Son style photographique se caractérise par une fusion du
            surréalisme et de symboles culturels, créant des portraits vibrants
            où la nature et la technologie convergent. Il explore la beauté
            fondamentale et l'expérience humaine en constante évolution.
          </p>
          <p>
            Son travail a été salué pour sa capacité à synthétiser des forces
            opposées, mêlant tradition et modernité, croissance et destruction,
            vulnérabilité et joie. Ses photographies évoquent à la fois
            l'intimité de Ren Hang et l'énergie performative de Floria
            Sigismondi, à travers un hybride orné d'art et de mode.
          </p>
        </MainText>
      </div>
    </main>
  );
}
