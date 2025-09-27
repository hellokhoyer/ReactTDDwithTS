import { useAppSelector } from "../store/hooks";

const Counter = () => {
  const items = useAppSelector((state) => state.items.items);
  const totalCount = items.length;
  const packedCount = items.filter((item) => item.packed).length;

  if (totalCount === 0) {
    return <div>Add items to get started.</div>;
  }

  const packedPercentage = Math.round((packedCount / totalCount) * 100);

  return (
    <div>
      {packedCount} of {totalCount} items packed ({packedPercentage}%)
    </div>
  );
};

export default Counter;
