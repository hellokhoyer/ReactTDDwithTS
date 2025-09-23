import type { PropsWithChildren } from "react";

export default function H1({ children }: PropsWithChildren) {
  return <h1 className="first-heading">{children}</h1>;
}
