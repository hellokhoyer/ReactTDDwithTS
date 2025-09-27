import AddItemForm from "./AddItemForm";
import ButtonGroup from "./ButtonGroup";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="sidebar">
      <AddItemForm />
      <ButtonGroup />
    </div>
  );
};
export default Sidebar;
