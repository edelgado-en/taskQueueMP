import Dropdown from "../../../../components/dropdown.component";

import { useAppSelector } from "../../../../app/hooks";
import { selectSelectedTasks } from "../tasks/tasksSlice";

const ActionBar = () => {
  const selectedTasks = useAppSelector(selectSelectedTasks);

  return (
    <div
      className="shadow md:px-3
                            fixed z-10 bg-white border-solid border-b-2
                             border-gray-200 p-2 w-full flex flex-row"
      style={{ marginTop: "-66px" }}
    >
      <div className="md:basis-[20%] sm:basis-[30%]">
        <Dropdown />
        <span className="text-xs mr-2 ml-2">1,439 Tasks</span>
        {selectedTasks.length > 0 && (
          <>
            <span className="text-xs font-medium text-gray-500">
              [ {selectedTasks.length} ]
            </span>
          </>
        )}
      </div>
      <div className="basis-[80%]">
        {selectedTasks.length > 0 && (
          <>
            <div className="inline-flex shadow-sm rounded-md w-48">
              <div
                className="bg-pink-600 flex-shrink-0 flex items-center justify-center w-10
                                        text-white text-xs font-medium rounded-l-md"
              >
                New
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-2 py-2 text-xs truncate">
                  <span className="text-gray-900 font-medium hover:text-gray-600 text-xs">
                    12 Tasks
                  </span>
                  <span className="text-gray-500 font-medium ml-2 text-xs">
                    15,678 Words
                  </span>
                </div>
              </div>
            </div>

            <div className="inline-flex shadow-sm rounded-md w-48 ml-5">
              <div
                className="bg-pink-600 flex-shrink-0 flex items-center justify-center w-10
                                        text-white text-xs font-medium rounded-l-md"
              >
                TL
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-2 py-2 text-xs truncate">
                  <span className="text-gray-900 font-medium hover:text-gray-600 text-xs">
                    12 Tasks
                  </span>
                  <span className="text-gray-500 font-medium ml-2 text-xs">
                    15,678 Words
                  </span>
                </div>
              </div>
            </div>
            <div className="inline-flex shadow-sm rounded-md w-48 ml-5">
              <div
                className="bg-pink-600 flex-shrink-0 flex items-center justify-center w-10
                                        text-white text-xs font-medium rounded-l-md"
              >
                CP
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-2 py-2 text-xs truncate">
                  <span className="text-gray-900 font-medium hover:text-gray-600 text-xs">
                    12 Tasks
                  </span>
                  <span className="text-gray-500 font-medium ml-2 text-xs">
                    15,678 Words
                  </span>
                </div>
              </div>
            </div>
            <div className="inline-flex shadow-sm rounded-md w-48 lg:ml-5 md:ml-0 sm:ml-0 md:mt-3 lg:mt-0 xl:mt-0 2xl:mt-0">
              <div
                className="bg-pink-600 flex-shrink-0 flex items-center justify-center w-10
                                        text-white text-xs font-medium rounded-l-md"
              >
                AT
              </div>
              <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                <div className="flex-1 px-2 py-2 text-xs truncate">
                  <span className="text-gray-900 font-medium hover:text-gray-600 text-xs">
                    12 Tasks
                  </span>
                  <span className="text-gray-500 font-medium ml-2 text-xs">
                    15,678 Words
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActionBar;
