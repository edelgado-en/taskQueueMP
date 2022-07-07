import {
  LoginIcon,
  SearchIcon,
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
  CogIcon
} from "@heroicons/react/solid";

import { selectActiveTab, setActiveTab, Tab } from "../sideBarSlice";
import { selectSidebarOpen, handleSidebarOpenChange } from "./settings/settingsSlice";
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";

import LSPDashboard from "./lsp/LspDashboard";
import UserStats from "./user/UserStats";
import Search from "./search/SearchFilters";
import Settings from "./settings/Settings";

interface IHeaderTab {
  handleOnClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}

const HeaderTab = ({ handleOnClick, isActive, children }: IHeaderTab) => {
  return (
    <span
      onClick={handleOnClick}
      className={`cursor-pointer whitespace-nowrap py-2 border-b-2 font-medium text-xs
                    ${
                      isActive
                        ? "border-blue-500 text-blue-600"
                        : "hover:text-gray-700 hover:border-gray-300"
                    }
                    `}
    >
      {children}
    </span>
  )
}

const ExpandedSideBar = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);
  const sidebarOpen = useAppSelector(selectSidebarOpen);

  const handleSetActiveTab = (tab: Tab) => {
    dispatch(setActiveTab(tab));
  };

  const handleSideBarExpanded = () => {
    dispatch(handleSidebarOpenChange(!sidebarOpen));
  };

  return (
    <div className="fixed bg-gray-100 min-h-screen flex-col z-50 border-r-2 p-3 w-64 h-full">
      <div className="flex flex-row h-[4%]">
        <div className="basis-[90%]">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-5">
              
              <HeaderTab handleOnClick={() => handleSetActiveTab(Tab.Search)}
                         isActive={activeTab === Tab.Search}>
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </HeaderTab>

              <HeaderTab handleOnClick={() => handleSetActiveTab(Tab.Lsp)}
                         isActive={activeTab === Tab.Lsp}>
                <BriefcaseIcon className="h-5 w-5 text-gray-400" />
              </HeaderTab>

              <HeaderTab handleOnClick={() => handleSetActiveTab(Tab.Users)}
                         isActive={activeTab === Tab.Users}>
                <UsersIcon className="h-5 w-5 text-gray-400" />
              </HeaderTab>

              <HeaderTab handleOnClick={() => handleSetActiveTab(Tab.PreferredSearch)}
                         isActive={activeTab === Tab.PreferredSearch}>
                <StarIcon className="h-5 w-5 text-gray-400" />
              </HeaderTab>

              <HeaderTab handleOnClick={() => handleSetActiveTab(Tab.Settings)}
                         isActive={activeTab === Tab.Settings}>
                 <CogIcon className="h-5 w-5 text-gray-400" />
              </HeaderTab>
            </nav>
          </div>
        </div>

        <div className="basis-[10%] pt-1">
          <LoginIcon
            className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer"
            onClick={handleSideBarExpanded}
          />
        </div>

      </div>

      {activeTab === Tab.Search && <Search />}

      {activeTab === Tab.Lsp && <LSPDashboard />}

      {activeTab === Tab.Users && <UserStats />}

      {activeTab === Tab.Settings && <Settings />}

    </div>
  );
};

export default ExpandedSideBar;
