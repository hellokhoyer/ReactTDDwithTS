import {
  markAllPacked,
  markAllUnpacked,
  removeAll,
  resetToInitial,
} from "../store/itemsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Button from "./Button";

const ButtonGroup = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items.items);
  const hasItems = items.length > 0;

  return (
    <div className="button-group">
      <Button
        variant="secondary"
        type="button"
        disabled={!hasItems}
        onClick={() => dispatch(markAllPacked())}
      >
        Mark all as complete
      </Button>
      <Button
        variant="secondary"
        type="button"
        disabled={!hasItems}
        onClick={() => dispatch(markAllUnpacked())}
      >
        Mark all as incomplete
      </Button>
      <Button
        variant="secondary"
        type="button"
        onClick={() => dispatch(resetToInitial())}
      >
        Reset to initial
      </Button>
      <Button
        variant="secondary"
        type="button"
        disabled={!hasItems}
        onClick={() => dispatch(removeAll())}
      >
        Remove All Items
      </Button>
    </div>
  );
};

export default ButtonGroup;
