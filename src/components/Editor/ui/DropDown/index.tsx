import { default as ContainerDropDown } from "./DropDown";
import Item from "./Item";

type CompondComponent = typeof ContainerDropDown & {
  Item: typeof Item
};

const DropDown = ContainerDropDown as CompondComponent;

DropDown.Item = Item;

export default DropDown;