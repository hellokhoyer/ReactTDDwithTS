import type { PropsWithChildren } from "react";

export default function H2({ children }: PropsWithChildren) {
  return <h2 className="second-heading">{children}</h2>;
}
