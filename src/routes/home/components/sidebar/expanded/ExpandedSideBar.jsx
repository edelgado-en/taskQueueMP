import {
  LoginIcon,
  SearchIcon,
  UsersIcon,
  BriefcaseIcon,
  StarIcon,
} from "@heroicons/react/solid";

import { selectActiveTab, setActiveTab, toggleExpanded } from "../sideBarSlice";
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";

import LSPDashboard from "./lsp/LspDashboard";
import UserStats from "./user/UserStats";
import Search from "./search/Search";

const ExpandedSideBar = () => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  const handleSetActiveTab = (tab) => {
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
                onClick={() => handleSetActiveTab("search")}
                className={`cursor-pointer whitespace-nowrap py-2 px-1 border-b-2
                              font-medium text-xs
                              ${
                                activeTab === "search"
                                  ? "border-indigo-500 text-indigo-600"
                                  : "hover:text-gray-700 hover:border-gray-300"
                              }
                              `}
              >
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </span>

              <span
                onClick={() => handleSetActiveTab("lsp")}
                className={`cursor-pointer whitespace-nowrap py-2 px-1 border-b-2
                             font-medium text-xs border-transparent
                              ${
                                activeTab === "lsp"
                                  ? "border-indigo-500 text-indigo-600"
                                  : "hover:text-gray-700 hover:border-gray-300"
                              }
                             `}
              >
                <BriefcaseIcon className="h-5 w-5 text-gray-400" />
              </span>

              <span
                onClick={() => handleSetActiveTab("users")}
                className={`cursor-pointer whitespace-nowrap py-2 px-1 border-b-2
                    font-medium text-xs border-transparent
                     ${
                       activeTab === "users"
                         ? "border-indigo-500 text-indigo-600"
                         : "hover:text-gray-700 hover:border-gray-300"
                     }
                    `}
              >
                <UsersIcon className="h-5 w-5 text-gray-400" />
              </span>

              <span
                onClick={() => handleSetActiveTab("preferred")}
                className={`cursor-pointer whitespace-nowrap py-2 px-1 border-b-2
                    font-medium text-xs border-transparent
                     ${
                       activeTab === "preferredSearches"
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

      {activeTab === "search" && <Search />}

      {activeTab === "lsp" && <LSPDashboard />}

      {activeTab === "users" && <UserStats />}
    </div>
  );
};

export default ExpandedSideBar;
