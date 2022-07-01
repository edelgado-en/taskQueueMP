import SlimSideBar from "./slim/SlimSideBar";
import ExpandedSideBar from "./expanded/ExpandedSideBar";
import { useAppSelector } from "../../../../app/hooks";
import { selectIsExpanded } from "./sideBarSlice";

const SideBar = () => {
  const isExpanded = useAppSelector(selectIsExpanded);

  return isExpanded ? <ExpandedSideBar /> : <SlimSideBar />;
};

export default SideBar;
