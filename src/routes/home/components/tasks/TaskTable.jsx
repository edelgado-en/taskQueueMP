import React, { useLayoutEffect, useState, useRef } from "react";

import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectTasks,
  selectSelectedTasks,
  setSelectedTasks,
  selectLoading,
  addSelectedTask,
  removeSelectedTask,
  expandTask,
  closeTask
} from "./tasksSlice";

import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowSmRightIcon,
  LockClosedIcon,
  PencilAltIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/solid";

import TaskActivity from "./activity/TaskActivity";
import TaskComment from "./comment/TaskComment";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const TaskTable = () => {
  const checkbox = useRef();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const selectedTasks = useAppSelector(selectSelectedTasks);
  const loading = useAppSelector(selectLoading);

  console.log(tasks);

  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  /* UseLayoutEffect runs synchronously immediately after React has performed all DOM mutations.
  Since I"m using useRef, I"m using this instead of useEffect */
  useLayoutEffect(() => {
    const isIndeterminate =
      selectedTasks.length > 0 && selectedTasks.length < tasks.length;

    setChecked(selectedTasks.length === tasks.length);
    setIndeterminate(isIndeterminate);

    if (checkbox && checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }

  }, [selectedTasks]);

  const toggleAll = () => {
    const newTasks = checked || indeterminate ? [] : tasks;

    dispatch(setSelectedTasks(newTasks));

    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  };

  const handleTaskCheckbox = (event, task) => {
    if (event.target.checked) {
      dispatch(addSelectedTask(task));
    } else {
      dispatch(removeSelectedTask(task));
    }
  };

  const handleExpandTask = (task) => {
    dispatch(expandTask(task));
  };

  const handleCloseTask = (task) => {
    dispatch(closeTask(task));
  };

  const handleOpenTask = (page) => {
    console.log(page);
  };

  return (
    <>
    {loading ?
      <div className="text-center pt-64">
          <svg role="status" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
      </div>
      :
      <table
      className="divide-y divide-gray-300 w-full"
      style={{ marginTop: "66px" }}
    >
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
            <input
              type="checkbox"
              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
              ref={checkbox}
              checked={checked}
              onChange={toggleAll}
            />
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-left text-xs font-semibold text-gray-900"
          >
            ID
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-left text-xs font-semibold text-gray-900"
          >
            Flags
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-center text-xs font-semibold text-gray-900"
          >
            Text
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-center text-xs font-semibold text-gray-900"
          >
            % Trans
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-left text-xs font-semibold text-gray-900"
          >
            Words
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-left text-xs font-semibold text-gray-900"
          >
            Files
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-left text-xs font-semibold text-gray-900"
          >
            Created
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-left text-xs font-semibold text-gray-900"
          >
            Updated
          </th>
          <th
            scope="col"
            className="px-3 py-1.5 text-left text-xs font-semibold text-gray-900"
          >
            Assigned
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
            <span className="sr-only">Edit</span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {tasks && tasks.map((task) => (
          <React.Fragment key={task.id}>
            <tr
              className={
                selectedTasks.includes(task)
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }
            >
              <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                {selectedTasks.includes(task) && (
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                )}
                <input
                  type="checkbox"
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                  value={task.id}
                  checked={selectedTasks.includes(task)}
                  onChange={(e) => handleTaskCheckbox(e, task)}
                />
              </td>
              <td
                className={classNames(
                  "whitespace-nowrap py-3 pr-3 text-xs font-medium",
                  selectedTasks.includes(task)
                    ? "text-indigo-600"
                    : "text-gray-900"
                )}
              >
                <span className="ml-1 font-medium text-indigo-600 truncate cursor-pointer">
                  {task.id}
                </span>
                <span
                  className="ml-1 flex-shrink-0 font-normal text-gray-500"
                  style={{ fontSize: "10px" }}
                >
                  HTML
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py1.5 text-xs text-gray-500">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <LockClosedIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <PencilAltIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <TrashIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                </div>
              </td>
              <td
                className={`whitespace-nowrap px-3 py1.5 text-xs text-gray-500 text-center ${
                  task.translationStatus === "new"
                    ? "bg-green-100 "
                    : task.translationStatus === "in progress"
                    ? "bg-blue-100"
                    : ""
                }`}
              >
                <span className="px-1.5 inline-flex text-xs leading-5 text-gray-500">
                  {task.translationStatus}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500 text-center">
                <div className="text-xs">{task.overallPercentageTextTranslated}%</div>
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500">
                <div className="text-xs">5,678</div>
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs ">
                <CheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500">
                <span className="text-xs">04-29 08:58 AM</span>
                <span className="ml-2">(TS)</span>
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500">
                <span className="text-xs">04-29 08:58 AM</span>
                <span className="ml-2">(AP)</span>
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500">
                <span className="text-xs">04-29 08:58 AM</span>
                <div className="text-xs inline-block ml-1">
                  <span className="font-semibold bg-sky-100  px-1">CT1</span>{" "}
                  <ArrowSmRightIcon className="h-3 w-3 inline-block" />{" "}
                  <span>edelgado</span>{" "}
                  <ArrowSmRightIcon className="h-3 w-3 inline-block" />{" "}
                  <span>adeberry</span>
                </div>
              </td>
              <td>
                {task.isExpanded ? (
                  <ChevronUpIcon
                    onClick={() => handleCloseTask(task)}
                    className="h-4 w-4 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <ChevronDownIcon
                    onClick={() => handleExpandTask(task)}
                    className="h-4 w-4 text-gray-400 cursor-pointer"
                  />
                )}
              </td>
            </tr>
            {task.isExpanded && (
              <tr>
                <td colSpan="11">
                  <div className="flex bg-gray-100 py-16 px-7">
                    <div className="flex-1">
                      <div className="px-7 w-5/6">
                        <textarea
                          rows={3}
                          name="comment"
                          id="comment"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Add your comment..."
                          defaultValue={""}
                        />
                        <div className="mt-2 mb-4 flex justify-end">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Post
                          </button>
                        </div>
                        <TaskComment />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="pr-10">
                        <TaskActivity />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    }
    
 {/*     */}
    </>
  );
};

export default TaskTable;
