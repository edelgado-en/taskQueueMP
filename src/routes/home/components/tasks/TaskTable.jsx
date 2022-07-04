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

import { selectRelativeTime } from "../sidebar/expanded/settings/settingsSlice";

import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowSmRightIcon,
  LockClosedIcon,
  PencilAltIcon,
  TrashIcon,
  CheckIcon,
  TranslateIcon,
  EyeIcon,
  ReplyIcon
} from "@heroicons/react/solid";

import ReactTimeAgo from 'react-time-ago'

import TaskActivity from "./activity/TaskActivity";
import TaskComment from "./comment/TaskComment";
import Spinner from '../../../../components/spinner/Spinner';

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const TaskTable = () => {
  const checkbox = useRef();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const selectedTasks = useAppSelector(selectSelectedTasks);
  const loading = useAppSelector(selectLoading);
  const relativeTime = useAppSelector(selectRelativeTime);

  //console.log(tasks);

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

  }, [selectedTasks, tasks]);

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
    { loading && <div className="text-center pt-64"><Spinner /></div> }

    { (!loading && tasks.length == 0 ) && <div className="text-center pt-64">TODO: Add component for No tasks found message</div> }

    { (!loading && tasks.length > 0) && 
      <table className="divide-y divide-gray-300 w-full" style={{ marginTop: "66px" }}>
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
                <span
                  className="ml-4 flex-shrink-0 font-semibold text-gray-500"
                  style={{ fontSize: "10px" }}
                >
                  {task.queueTypeFlagText}
                </span>
              </td>
              <td
                className={classNames(
                  "whitespace-nowrap py-3 pr-3 text-xs font-medium",
                  selectedTasks.includes(task)
                    ? "text-indigo-600"
                    : "text-gray-900"
                )}
              >
                <span className="ml-1 font-medium text-sky-600 truncate cursor-pointer">
                  {task.id}
                </span>
                
              </td>
              <td className="whitespace-nowrap px-3 py1.5 text-xs text-gray-500">
                <div className="flex items-center text-sm text-gray-500">
                  
                  {task.onHold && <LockClosedIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-rose-500" />}

                  {task.specialEdit && <PencilAltIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />}

                  {task.errorPage && <ReplyIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-rose-400" />}
                  
{/*                   <CalendarIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <TrashIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" /> */}
                </div>
              </td>
              <td
                className={`whitespace-nowrap px-3 py1.5 text-xs text-gray-500 text-center`}
              >
                <span className="px-1.5 inline-flex text-xs leading-5 text-gray-500">
                  {task.textTranslationStatus === "Active" && <CheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />}
                  {task.textTranslationStatus === "Translated" && <TranslateIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />}
                  {task.textTranslationStatus === "Cont. Proofed" && <EyeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />}
                  {task.textTranslationStatus === "New" && <span style={{ background: '#64748b', padding: '1px 3px', borderRadius: '2px', color: 'white', fontSize: '8px' }}>NEW</span>}
                  {task.textTranslationStatus === "N/A" && <span>NA</span>}
                  
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500 text-center">
                <div className="text-xs">{task.percentageTextTranslated}%</div>
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500">
                <div className="text-xs">{task.totalWords.toLocaleString('en-US')}</div>
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs ">
                <CheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500">
                {relativeTime ? 
                  <ReactTimeAgo date={task.receiptDate} locale="en-US" timeStyle="twitter" />
                  :
                  <span className="text-xs">{task.receiptDate}</span>
                }

                {task.queuedBy.length > 0 && <span className="ml-2">({task.queuedBy})</span>}
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500">
                {task.lastUpdatedDate && 
                  relativeTime ?
                  <ReactTimeAgo date={task.lastUpdatedDate} locale="en-US" timeStyle="twitter" />
                  :
                  <span className="text-xs">{task.lastUpdatedDateShort}</span>
                }

                {task.autoParsed && <span className="ml-2">(AP)</span>}
              </td>
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-gray-500">
                { task.assignedDate &&
                  relativeTime ?
                  <ReactTimeAgo date={task.lastUpdatedDate} locale="en-US" timeStyle="twitter" />
                  :
                  <span className="text-xs">{task.assignedDateShort}</span>
                }

                <div className="text-xs inline-block ml-1">
                  {task.assignedContractor ?
                      <>
                        <span className="font-semibold bg-sky-100  px-1">{task.assignedContractor}</span>{" "}
                      </>
                      :
                      <span className="hidden px-1">PTS</span>
                  }
                  {task.assignedTranslator &&
                    <>
                      <ArrowSmRightIcon className="h-3 w-3 inline-block" />{" "}
                      <span>{task.assignedTranslator}</span>{" "}
                    </>
                  
                  }
                  {task.assignedInternalReviewer &&
                    <>
                      <ArrowSmRightIcon className="h-3 w-3 inline-block" />{" "}
                      <span>{task.assignedInternalReviewer}</span>
                    </>
                  }
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
    </>
  );
};

export default TaskTable;
