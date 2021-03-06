import { useState } from "react";
import Select from "react-select";
import { STANDARD_DROPDOWN_STYLES } from "../../../../../../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  RefreshIcon
} from "@heroicons/react/outline";

import PreferredSearchModal from '../preferredSearches/PreferredSearchModal';
import { toggleModal } from '../preferredSearches/preferredSearchSlice';

import { useAppSelector, useAppDispatch } from "../../../../../../app/hooks";
import {
  handleDropdownChange,
  handleStartDateChange,
  handleEndDateChange,
  resetAllFields,
  selectFilters
} from "./searchSlice";

import { fetchTasks, setActivePage } from '../../../tasks/tasksSlice';

const Search = () => {
  const dispatch = useAppDispatch();
  
  const { 
    statuses,
    selectedStatus,
    assignmentStatuses,
    selectedAssignmentStatus,
    translationTypes,
    selectedTranslationType,
    flags,
    selectedFlag,
    TATStatuses,
    selectedTATStatus,
    contentTypes,
    selectedContentType,
    priorities,
    selectedPriority,
    projectCodes,
    selectedProjectCode,
    internalReviewers,
    selectedInternalReviewer,
    requestedBy,
    selectedRequestedBy,
    startQueueDate,
    endQueueDate

  } = useAppSelector(selectFilters);

  const [showMore, setShowMore] = useState(false);

  const handleResetFormFields = () => {
    dispatch(resetAllFields());
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleOpenPreferredSearchModal = () => {
    dispatch(toggleModal(true));
  }

  /**
   * Because of the nature of the dropdown, we need to have a handler for dropdown and a different
   * handler for regular text input fields.
   *
   * @param {*} option refers to the object coming from the Select dropdown in the form of: { value: int, label: string }
   * @param {*} name the name of the key:string refering to the dropdown. Look at defaultFormFields
   */
  const handleChange = (option, name) => {
    dispatch(handleDropdownChange({ option, name }));
  };

  const handleDateChange = (type, date) => {
    if (type === 'start') {
      dispatch(handleStartDateChange(date.getTime()));

    } else {
      dispatch(handleEndDateChange(date.getTime()));
    }
  }

  const handleSearch = () => {
    dispatch(setActivePage(1));

    dispatch(fetchTasks())

  };

/*   const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' }
  ] */

  return (
    <>
      <PreferredSearchModal />

      <div className="mt-2 px-3 overflow-y-auto lg:h-[80%] md:h-[70%] sm:h-[60%]">
        <div>
          <div style={{ position: 'absolute', right: '0', marginRight: '15px', top: '70px' }}>
            <RefreshIcon onClick={handleResetFormFields}  className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
          <label className="block text-xs font-medium text-gray-700 mb-1 mt-2">
            Translation Status
          </label>
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedStatus}
            onChange={(option) => handleChange(option, "selectedStatus")}
            options={statuses}
          />

          <label className="block text-xs font-medium text-gray-700 mt-2 mb-1">
            Assignment Status
          </label>
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedAssignmentStatus}
            onChange={(option) => handleChange(option, "selectedAssignmentStatus")}
            options={assignmentStatuses}
          />

          <label className="block text-xs font-medium text-gray-700 mt-2 mb-1">
            Translation Types
          </label>
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedTranslationType}
            onChange={(option) => handleChange(option, "selectedTranslationType")}
            options={translationTypes}
          />

          <label className="block text-xs font-medium text-gray-700 mt-2 mb-1">
            TAT Status
          </label>
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedTATStatus}
            onChange={(option) => handleChange(option, "selectedTATStatus")}
            options={TATStatuses}
          />

          <label className="block text-xs font-medium text-gray-700 mt-2 mb-1">
            Handling Flags
          </label>
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedFlag}
            onChange={(option) => handleChange(option, "selectedFlag")}
            options={flags}
          />
            {/* <Select
              isMulti
              name="colors"
              value={[]}
              options={colourOptions}
              className="basic-multi-select"
              classNamePrefix="select"
            /> */}


          <div className="w-full border-t border-gray-300 my-5" />

          <label
            htmlFor="ids"
            className={`block text-xs font-medium text-gray-700`}
          >
            Task Ids
          </label>
          <input
            type="text"
            name="ids"
            id="ids"
            className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                       block w-full text-xs border-gray-300 rounded-md"
            placeholder="1,2,3,4,5..."
          />

          {/* Put this in a component */}
          <label
            htmlFor="urls"
            className="block text-xs font-medium text-gray-700 mt-3"
          >
            Task Urls
          </label>
          <input
            type="text"
            name="urls"
            id="urls"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                       block w-full text-xs border-gray-300 rounded-md"
            placeholder="url1,url2,url3..."
          />

          <label className="block text-xs font-medium text-gray-700 mt-3">
            Queue Start Date
          </label>
          
          <DatePicker
            selected={startQueueDate == null ? null : new Date(startQueueDate)}
            showTimeSelect
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full
                       text-xs border-gray-300 rounded-md p-2"
            onChange={(date) => handleDateChange('start', date)}
          />

          {!showMore && (
            <div
              onClick={handleShowMore}
              className="cursor-pointer text-xs text-blue-400 mt-6"
            >
              Show More
            </div>
          )}

          {showMore ? (
            <>
              <label className="block text-xs font-medium text-gray-700 mt-3">
                Queue End Date
              </label>
              <DatePicker
                selected={endQueueDate == null ? null : new Date(endQueueDate)}
                showTimeSelect
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs
                         border-gray-300 rounded-md p-2"
                onChange={(date) => handleDateChange('end', date)}
              />

              <label className="block text-xs font-medium text-gray-700 mt-3">
                Content Type
              </label>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                value={selectedContentType}
                onChange={(option) =>
                  handleChange(option, "selectedContentType")
                }
                options={contentTypes}
              />

              <label className="block text-xs font-medium text-gray-700 mt-3">
                Priority
              </label>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                value={selectedPriority}
                onChange={(option) => handleChange(option, "selectedPriority")}
                options={priorities}
              />

              <label className="block text-xs font-medium text-gray-700 mt-3">
                Project Code
              </label>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                value={selectedProjectCode}
                onChange={(option) => handleChange(option, "selectedPriority")}
                options={projectCodes}
              />

              <label className="block text-xs font-medium text-gray-700 mt-3">
                Internal Reviewer
              </label>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                value={selectedInternalReviewer}
                onChange={(option) =>
                  handleChange(option, "selectedInternalReviewer")
                }
                options={internalReviewers}
              />

              <label className="block text-xs font-medium text-gray-700 mt-3">
                Requested By
              </label>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                value={selectedRequestedBy}
                onChange={(option) =>
                  handleChange(option, "selectedRequestedBy")
                }
                options={requestedBy}
              />
            </>
          ) : null}
        </div>
      </div>
      <div className="h-[15%] px-3.5 text-right py-4">
        <button
          onClick={handleOpenPreferredSearchModal}
          type="button"
          className="mr-3 inline-flex items-center px-2.5 py-1.5 border
                   border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700
                    bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Pref Search
        </button>
        <button
          onClick={handleSearch}
          type="button"
          className="inline-flex items-center px-4 py-1.5 border border-transparent
                     text-xs font-medium rounded shadow-sm text-white bg-blue-600
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
