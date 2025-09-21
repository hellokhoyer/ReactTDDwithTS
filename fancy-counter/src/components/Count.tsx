type CountProps = {
  value: number;
  isAtLimit?: boolean;
};

const Count = ({ value, isAtLimit = false }: CountProps) => (
  <output
    className="count"
    aria-live="polite"
    aria-atomic="true"
    aria-label={
      isAtLimit
        ? `Count ${value}, upper limit reached`
        : `Count ${value}`
    }
  >
    {value}
  </output>
);

export default Count;
