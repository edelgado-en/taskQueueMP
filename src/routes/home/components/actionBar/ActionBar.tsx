import Dropdown from "../../../../components/actiondropdown/dropdown.component";
import { useAppSelector } from "../../../../app/hooks";
import { selectSelectedTasks, selectTotalTasks } from "../tasks/tasksSlice";

import {
  TranslateIcon,
  EyeIcon,
  CheckIcon
} from "@heroicons/react/solid";

import {
  DocumentIcon,
} from "@heroicons/react/outline";

const ActionBar = () => {
  const selectedTasks = useAppSelector(selectSelectedTasks);
  const totalTasks = useAppSelector(selectTotalTasks);

  return (
    <div
      className="shadow md:px-3
                 fixed z-10 bg-white border-solid border-b-2
                border-gray-200 px-2 w-full flex flex-row"
      style={{ marginTop: "-66px", height: '51px' }}
    >
      <div className="md:basis-[20%] sm:basis-[30%] mt-2.5">
        <Dropdown />
        <span className="text-sm mr-2 ml-3">{totalTasks.toLocaleString('en-US')} Tasks</span>
        {selectedTasks.length > 0 && (
          <>
            <span className="text-sm font-medium text-gray-500">
              [ {selectedTasks.length} ]
            </span>
          </>
        )}
      </div>
      <div className="md:basis-[80%] sm:basis-[70%]">
        {selectedTasks.length > 0 && (
          <>
            <div className="inline-flex w-48 hover:bg-gray-100">
              <div
                className="flex-shrink-0 flex items-center justify-center w-10
                                        text-gray text-xs font-medium rounded-l-md"
              >
                 <DocumentIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 flex items-center justify-betweenbg-white truncate">
                <div className="flex-1 px-2 py-2 text-xs truncate">
                  <div className="text-gray-900 font-medium text-xs">
                    15,678 Words
                  </div>
                  <div className="text-gray-400 text-xs">
                    12 Tasks
                  </div>
                  
                </div>
              </div>
            </div>
            
            <div className="inline-flex w-48 hover:bg-gray-100">
              <div
                className="flex-shrink-0 flex items-center justify-center w-10
                                        text-gray text-xs font-medium rounded-l-md"
              >
                <TranslateIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1 flex items-center justify-betweenbg-white truncate">
                <div className="flex-1 px-2 py-2 text-xs truncate">
                  <div className="text-gray-900 font-medium text-xs">
                    15,678 Words
                  </div>
                  <div className="text-gray-400 text-xs">
                    12 Tasks
                  </div>
                  
                </div>
              </div>
            </div>
            
            <div className="inline-flex w-48 hover:bg-gray-100">
              <div
                className="flex-shrink-0 flex items-center justify-center w-10
                                        text-gray text-xs font-medium rounded-l-md"
              >
                <EyeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex-1 flex items-center justify-betweenbg-white truncate">
                <div className="flex-1 px-2 py-2 text-xs truncate">
                  <div className="text-gray-900 font-medium text-xs">
                    15,678 Words
                  </div>
                  <div className="text-gray-400 text-xs">
                    12 Tasks
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="inline-flex w-48 hover:bg-gray-100">
              <div
                className="flex-shrink-0 flex items-center justify-center w-10
                                        text-gray text-xs font-medium rounded-l-md"
              >
                <CheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex-1 flex items-center justify-betweenbg-white truncate">
                <div className="flex-1 px-2 py-2 text-xs truncate">
                  <div className="text-gray-900 font-medium text-xs">
                    15,678 Words
                  </div>
                  <div className="text-gray-400 text-xs">
                    12 Tasks
                  </div>
                  
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
