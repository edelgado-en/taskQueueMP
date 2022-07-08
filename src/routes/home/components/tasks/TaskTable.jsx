import React, { useLayoutEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";

import  {
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
   selectRelativeTime,
   selectCompactRows,
   selectIncludeUrls,
   selectIncludeFiles
} from "../sidebar/expanded/settings/settingsSlice";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowSmRightIcon,
  LockClosedIcon,
  PencilAltIcon,
  TrashIcon,
  CheckIcon,
  TranslateIcon,
  EyeIcon,
  ReplyIcon,
  HandIcon,
  ThumbUpIcon
} from "@heroicons/react/solid";

import {
  DocumentIcon,
  DownloadIcon,
  GlobeAltIcon
} from "@heroicons/react/outline";

import ReactTimeAgo from 'react-time-ago'
import TaskActivity from "./activity/TaskActivity";
import TaskComment from "./comment/TaskComment";
import Spinner from '../../../../components/spinner/Spinner';
import NoResultsFound from './NoResultsFound';

const TableHeader = ({ name }) => {
  return (
    <th
      scope="col"
      className="px-3 py-1.5 text-left text-xs font-semibold text-gray-900">
      {name}
    </th>
  )
}

const TaskTable = () => {
  const checkbox = useRef();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const selectedTasks = useAppSelector(selectSelectedTasks);
  const loading = useAppSelector(selectLoading);
  const relativeTime = useAppSelector(selectRelativeTime);
  const compactRows = useAppSelector(selectCompactRows);
  const includeUrls = useAppSelector(selectIncludeUrls);
  const includeFiles = useAppSelector(selectIncludeFiles);

console.log(tasks)

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

  return (
    <>
    { loading && <div className="text-center pt-64"><Spinner /></div> }

    { (!loading && tasks.length == 0 ) && <NoResultsFound /> }

    { (!loading && tasks.length > 0) && 
      <table className="divide-y divide-gray-300 w-full" style={{ marginTop: "66px" }}>
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="relative sm:w-16 sm:px-8">
              <input
                type="checkbox"
                className="absolute left-3 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                ref={checkbox}
                checked={checked}
                onChange={toggleAll}
              /> 
            </th>
            
            <th scope="col" className="py-1.5 text-left text-xs font-semibold text-gray-900">
              ID
            </th>

            <TableHeader name="Flags" />
            
            {includeUrls && 
              <TableHeader name="Url" />
            }

            <TableHeader name="Words" />
            <TableHeader name="% Trans" />
            <TableHeader name="Text" />

            {includeFiles &&
              <TableHeader name="Files" />
            }

            <TableHeader name="Created" />
            <TableHeader name="Updated" />
            <TableHeader name="Assigned" />
  
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only"></span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
        
        {tasks && tasks.map((task) => (
          <React.Fragment key={task.id}>
            <tr className={selectedTasks.includes(task) ? "bg-gray-100" : "hover:bg-gray-100"}>
              <td className="relative sm:w-16 sm:px-1">
                {selectedTasks.includes(task) && (
                  <div className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" />
                )}
                
                <input
                  type="checkbox"
                  className="absolute left-3 top-1/2 -mt-2 h-4 w-4 rounded
                           border-gray-300 text-blue-600 focus:ring-blue-500"
                  value={task.id}
                  checked={selectedTasks.includes(task)}
                  onChange={(e) => handleTaskCheckbox(e, task)}
                />
                <div
                  className="ml-8 mt-1 flex-shrink-0 font-semibold text-gray-500"
                  style={{ fontSize: "9px" }}>
                  {task.queueTypeFlagText}
                </div>
              
              </td>
              
              <td className={`whitespace-nowrap text-xs font-medium
                           ${!compactRows ? 'py-3' : ''}
                           ${selectedTasks.includes(task) ? 'text-blue-600' : 'text-gray-900'}`}>
                <span className="font-medium text-sky-600 truncate cursor-pointer">
                  {task.id}
                </span>
              </td>

              <td className="whitespace-nowrap px-3 py1.5 text-xs text-gray-500">
                <div className="flex items-center text-sm text-gray-500">
                  
                  {task.onHold && <LockClosedIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-rose-400" />}

                  {task.specialEdit && <PencilAltIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />}

                  {task.errorPage && <ReplyIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-rose-400" />}

                  {task.errorPageReviewed && <ReplyIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />}
                  
                  {task.pendingDeletion && <TrashIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />}

                  {task.pendingReview && <HandIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-rose-400" />}
                  
                  {task.underReview && <EyeIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-rose-400" />}

                  {task.assignmentReady && <ThumbUpIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />}

                </div>
              </td>
              
              {includeUrls && 
                <td className="whitespace-nowrap px-1 py-1.5 text-xs text-black-500">
                  <span style={{ display: 'inline-block', position: 'relative', top: '4px' }}>
                    {task.savedByContent ? 
                      <DownloadIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 cursor-pointer" />
                      :
                      <GlobeAltIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 cursor-pointer" />
                    }
                  </span>
                  <input type="text"
                       value={task.url} 
                       onChange={() => {}}
                       style={{ width: '650px', fontSize: '12px', border: 'none', padding: '0px' }}/>
                </td>
              }
              
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-black-500">
                <div className="text-xs">{task.totalWords.toLocaleString('en-US')}</div>
              </td>

              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-black-500 text-left">
                <div className="text-xs">{task.percentageTextTranslated}%</div>
              </td>
              
              <td className={`whitespace-nowrap px-3 py-1.5 text-xs text-black-500 text-left`}>
                <span className="px-1 inline-flex text-xs leading-5 text-black-500">
                  {task.textTranslationStatus === "Active" && <CheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />}
                  {task.textTranslationStatus === "Translated" && <TranslateIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />}
                  {task.textTranslationStatus === "Cont. Proofed" && <EyeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />}
                  {task.textTranslationStatus === "New" && <DocumentIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400" />}
                  {task.textTranslationStatus === "N/A" && <span>NA</span>}
                </span>
              </td>
              
              {includeFiles &&
                <td className="whitespace-nowrap px-3 py-1.5 text-xs text-black-500 text-left">
                  <span className="px-1 inline-flex text-xs leading-5 text-gray-500">
                    {task.fileTranslationStatus === "Active" && <CheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />}
                    {task.fileTranslationStatus === "Translated" && <TranslateIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />}
                    {task.fileTranslationStatus === "Cont. Proofed" && <EyeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />}
                    {task.fileTranslationStatus === "New" && <DocumentIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400" />}
                    {task.fileTranslationStatus === "N/A" && <span>NA</span>}
                    </span>
                </td>
              }

              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-black-500">
                {relativeTime ? 
                  <ReactTimeAgo date={new Date(task.receiptDate)} locale="en-US" timeStyle="twitter" />
                  :
                  <span className="text-xs">{task.receiptDate}</span>
                }

                {task.queuedBy.length > 0 && <span className="ml-2">({task.queuedBy})</span>}
              </td>

              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-black-500">
                {task.lastUpdatedDate && 
                  relativeTime ?
                  <ReactTimeAgo date={new Date(task.lastUpdatedDate)} locale="en-US" timeStyle="twitter" />
                  :
                  <span className="text-xs">{task.lastUpdatedDateShort}</span>
                }

                {task.autoParsed && <span className="ml-2">(AP)</span>}
              </td>
              
              <td className="whitespace-nowrap px-3 py-1.5 text-xs text-black-500">
                { task.assignedDate &&
                  relativeTime ?
                  <ReactTimeAgo date={new Date(task.assignedDate)} locale="en-US" timeStyle="twitter" />
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
                  
                  {task.assignedTranslatorInitials &&
                    <>
                      <ArrowSmRightIcon className="h-3 w-3 inline-block" />{" "}
                      <span className="text-xs">{task.assignedTranslatorInitials}</span>{" "}
                    </>
                  
                  }

                  {task.assignedInternalReviewerInitials &&
                    <>
                      <ArrowSmRightIcon className="h-3 w-3 inline-block" />{" "}
                      <span>{task.assignedInternalReviewerInitials}</span>
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
                  {/* TODO: move this to another component */}
                  <div className="flex bg-gray-100 py-16 px-7">
                    <div className="flex-1">
                      <div className="px-7 w-5/6">
                        <textarea
                          rows={3}
                          name="comment"
                          id="comment"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full
                                     sm:text-sm border-gray-300 rounded-md"
                          placeholder="Add your comment..."
                          defaultValue={""}
                        />
                        <div className="mt-2 mb-6 flex justify-end">
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-1.5 border border-transparent
                                      text-xs font-medium rounded shadow-sm text-white bg-blue-600
                                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
