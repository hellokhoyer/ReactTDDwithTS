import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant, className, ...rest }: ButtonProps) => {
  const classes = [
    "btn",
    variant === "secondary" ? "btn--secondary" : null,
    className ?? null,
  ]
    .filter((value): value is string => typeof value === "string" && value.length > 0)
    .join(" ");

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
};

export default Button;
