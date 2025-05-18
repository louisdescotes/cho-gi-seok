import Nav from "./nav";

export default function Header() {
  return (
    <header className="fixed top-0 h-screen  w-full flex items-center justify-center">
      <a href="/" className="z-50 absolute top-6 flex  items-center h-20 gap-2">
        <p className="frame">조기석</p>
        <p className="frameSize">Cho Gi-Seok</p>
      </a>
      <Nav />
    </header>
  );
}
