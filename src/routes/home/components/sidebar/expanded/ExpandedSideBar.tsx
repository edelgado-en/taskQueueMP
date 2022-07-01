import {
  LoginIcon,
  SearchIcon,
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
} from "@heroicons/react/solid";

import { selectActiveTab, setActiveTab, toggleExpanded, Tab } from "../sideBarSlice";
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";

import LSPDashboard from "./lsp/LspDashboard";
import UserStats from "./user/UserStats";
import Search from "./search/SearchFilters";

const ExpandedSideBar = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  const handleSetActiveTab = (tab: Tab) => {
    dispatch(setActiveTab(tab));
  };

  const handleSideBarExpanded = () => {
    dispatch(toggleExpanded());
  };

  return (
    <div className="fixed bg-gray-100 min-h-screen flex-col z-50 border-r-2 p-3 w-64 h-full">
      <div className="flex flex-row h-[4%]">
        <div className="basis-[90%]">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-5">
              <span
                onClick={() => handleSetActiveTab(Tab.Search)}
                className={`cursor-pointer whitespace-nowrap py-2 px-1 border-b-2
                              font-medium text-xs
                              ${
                                activeTab === Tab.Search
                                  ? "border-indigo-500 text-indigo-600"
                                  : "hover:text-gray-700 hover:border-gray-300"
                              }
                              `}
              >
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </span>

              <span
                onClick={() => handleSetActiveTab(Tab.Lsp)}
                className={`cursor-pointer whitespace-nowrap py-2 px-1 border-b-2
                             font-medium text-xs border-transparent
                              ${
                                activeTab === Tab.Lsp
                                  ? "border-indigo-500 text-indigo-600"
                                  : "hover:text-gray-700 hover:border-gray-300"
                              }
                             `}
              >
                <BriefcaseIcon className="h-5 w-5 text-gray-400" />
              </span>

              <span
                onClick={() => handleSetActiveTab(Tab.Users)}
                className={`cursor-pointer whitespace-nowrap py-2 px-1 border-b-2
                    font-medium text-xs border-transparent
                     ${
                       activeTab === Tab.Users
                         ? "border-indigo-500 text-indigo-600"
                         : "hover:text-gray-700 hover:border-gray-300"
                     }
                    `}
              >
                <UsersIcon className="h-5 w-5 text-gray-400" />
              </span>

              <span
                onClick={() => handleSetActiveTab(Tab.PreferredSearch)}
                className={`cursor-pointer whitespace-nowrap py-2 px-1 border-b-2
                    font-medium text-xs border-transparent
                     ${
                       activeTab === Tab.PreferredSearch
                         ? "border-indigo-500 text-indigo-600"
                         : "hover:text-gray-700 hover:border-gray-300"
                     }
                    `}
              >
                <StarIcon className="h-5 w-5 text-gray-400" />
              </span>
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
    </div>
  );
};

export default ExpandedSideBar;
