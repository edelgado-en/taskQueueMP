import SlimSideBar from "./slim/SlimSideBar";
import ExpandedSideBar from "./expanded/ExpandedSideBar";
import { useAppSelector } from "../../../../app/hooks";

import { selectSidebarOpen } from "../sidebar/expanded/settings/settingsSlice";

const SideBar = () => {
  const isExpanded = useAppSelector(selectSidebarOpen);

  return isExpanded ? <ExpandedSideBar /> : <SlimSideBar />;
};

export default SideBar;
