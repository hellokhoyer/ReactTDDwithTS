import { ResetIcon } from "@radix-ui/react-icons";
import type { MouseEventHandler } from "react";

type ResetButtonProps = {
  onReset: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

const ResetButton = ({ onReset, disabled = false }: ResetButtonProps) => (
  <button
    type="button"
    className="reset-btn"
    onClick={onReset}
    aria-label="Reset counter"
    title="Reset counter"
    disabled={disabled}
  >
    <ResetIcon className="reset-btn-icon" />
  </button>
);

export default ResetButton;
