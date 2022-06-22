import {
  LogoutIcon,
  SearchIcon,
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
  DocumentIcon,
} from "@heroicons/react/solid";

import { toggleExpanded, setActiveTab } from "../sideBarSlice";
import { useAppDispatch } from "../../../../../app/hooks";

import ReactTooltip from "react-tooltip";

const SlimSideBar = () => {
  const dispatch = useAppDispatch();

  const handleSideBarExpanded = (tab) => {
    dispatch(toggleExpanded());
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="fixed flex bg-gray-100 min-h-screen flex-col z-50 border-r-2 p-4 w-14">
      <ReactTooltip
        id="sidebar"
        place="right"
        type="dark"
        effect="solid"
        className="tooltip-general"
        multiline={true}
      />

      <LogoutIcon
        data-for="sidebar"
        data-tip="Expand"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer"
        onClick={() => handleSideBarExpanded("search")}
      />

      <SearchIcon
        data-for="sidebar"
        data-tip="Search"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded("search")}
      />

      <BriefcaseIcon
        data-for="sidebar"
        data-tip="Contractors"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded("lsp")}
      />

      <UsersIcon
        data-for="sidebar"
        data-tip="Users"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded("users")}
      />

      <StarIcon
        data-for="sidebar"
        data-tip="Preferred Searches"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded("preferred")}
      />

      <DocumentIcon
        data-for="sidebar"
        data-tip="New Text"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded("search")}
      />
    </div>
  );
};

export default SlimSideBar;
