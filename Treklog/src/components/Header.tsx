import Counter from "./Counter";
import Logo from "./Logo";

type Props = {};

export default function Header({}: Props) {
  return (
    <header>
      <Logo />
      <Counter />
    </header>
  );
}
