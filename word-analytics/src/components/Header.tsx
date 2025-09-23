import Background from "./Background";
import H1 from "./H1";

export default function Header() {
  return (
    <header>
      <Background />

      <H1>
        Word<span className="first-heading--thin">Analytics</span>
      </H1>
    </header>
  );
}
