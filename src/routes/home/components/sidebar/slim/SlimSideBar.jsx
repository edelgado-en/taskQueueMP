import {
  LogoutIcon,
  SearchIcon,
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
  DocumentIcon,
  CogIcon
} from "@heroicons/react/solid";

import {
  ChartSquareBarIcon
} from "@heroicons/react/outline";

import { setActiveTab } from "../sideBarSlice";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectSidebarOpen, handleSidebarOpenChange } from "../../sidebar/expanded/settings/settingsSlice";
import { Tab } from '../sideBarSlice'
import ReactTooltip from "react-tooltip";

const SlimSideBar = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector(selectSidebarOpen);
  

  const handleSideBarExpanded = (tab) => {
    dispatch(handleSidebarOpenChange(!sidebarOpen));
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
        onClick={() => handleSideBarExpanded(Tab.Search)} /* TODO: This needs to remember your choice and open that tab */
      />

      <SearchIcon
        data-for="sidebar"
        data-tip="Search"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded(Tab.Search)}
      />

      <BriefcaseIcon
        data-for="sidebar"
        data-tip="Contractors"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded(Tab.Lsp)}
      />

      <UsersIcon
        data-for="sidebar"
        data-tip="Users"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded(Tab.Users)}
      />

      <StarIcon
        data-for="sidebar"
        data-tip="Preferred Searches"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded(Tab.PreferredSearch)}
      />

      <DocumentIcon
        data-for="sidebar"
        data-tip="New Text"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded(Tab.Search)}
      />

      <ChartSquareBarIcon
        data-for="sidebar"
        data-tip="Dashboard"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded(Tab.Search)}
      />

      <CogIcon
        data-for="sidebar"
        data-tip="Settings"
        data-iscapture="true"
        className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer mt-6"
        onClick={() => handleSideBarExpanded(Tab.Settings)}
      />
    </div>
  );
};

export default SlimSideBar;
