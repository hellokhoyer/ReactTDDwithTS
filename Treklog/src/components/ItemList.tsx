import type { PackingItem } from "../store/itemsSlice";
import { toggleItem } from "../store/itemsSlice";
import EmptyView from "./EmptyView";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type ItemProps = {
  item: PackingItem;
  onToggle: () => void;
};

const Item = ({ item, onToggle }: ItemProps) => {
  return (
    <li className="item">
      <label>
        <input type="checkbox" checked={item.packed} onChange={onToggle} />
        {item.name}
      </label>
    </li>
  );
};

const ItemList = () => {
  const items = useAppSelector((state) => state.items.items);
  const dispatch = useAppDispatch();

  return (
    <section className="item-list">
      {items.length === 0 ? (
        <EmptyView />
      ) : (
        <ul>
          {items.map((item) => (
            <Item
              key={item.id}
              item={item}
              onToggle={() => dispatch(toggleItem(item.id))}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ItemList;
