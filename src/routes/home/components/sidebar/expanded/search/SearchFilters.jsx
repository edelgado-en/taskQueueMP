import { useState } from "react";
import Select from "react-select";
import { STANDARD_DROPDOWN_STYLES } from "../../../../../../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { QuestionMarkCircleIcon, RefreshIcon } from "@heroicons/react/outline";
import PreferredSearchModal from '../preferredSearches/PreferredSearchModal';
import { setModal, ModalType } from '../../../../../../components/modal/modalSlice';
import { useAppSelector, useAppDispatch } from "../../../../../../app/hooks";
import { fetchTasks, setActivePage } from '../../../tasks/tasksSlice';

import {
  handleDropdownChange,
  handleStartDateChange,
  handleEndDateChange,
  handleIdChange,
  handleUrlsChange,
  handleExcludeUrlsChange,
  resetAllFields,
  selectFilters
} from "./searchSlice";
import ReactTooltip from "react-tooltip";

const Label = ({ name }) => {
  return (
    <label className="block text-xs font-medium text-gray-700 mt-2 mb-1 ">
      { name }
    </label>
  )
}

const Search = () => {
  const dispatch = useAppDispatch();
  
  let { 
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
    endQueueDate,
    pendingDeletionStatuses,
    selectedPendingDeletionStatus,
    selectedIds,
    selectedTaskUrlsPattern

  } = useAppSelector(selectFilters);

  const [showMore, setShowMore] = useState(false);

  const handleResetFormFields = () => {
    dispatch(resetAllFields());
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleOpenPreferredSearchModal = () => {
    dispatch(setModal({ name: ModalType.PreferredSearch, isOpen: true}));
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

  /**
   * TODO: Add time widget. Ask business about it.
   * TODO: Add "clear" icon/label to the date picker to make it easier to delete.
   * 
   * @param {*} type 
   * @param {*} date 
   */
  const handleDateChange = (type, date) => {
    date = date == null ? null : date.getTime();

    if (type === 'start') {
      dispatch(handleStartDateChange(date));

    } else {
      dispatch(handleEndDateChange(date));
    }
  }

  /**
   * The following formats are accepted:
   * "1,2,3" or "1" or "1-" or "-10"
   * 
   * This regex will prevent the user from saving anything else while typing or copy/pasting.
   * 
   * @param {*} event 
   */
  const handleSelectedIdsChange = event => {
    let clean = event.target.value.replace(/[^\d,-]/gm,'');
    clean = clean.replace(/^,+/m, '');
    clean = clean.replace(/,{2,}/g, ',');

    dispatch(handleIdChange(clean));
  }

  const handleSelectedUrlsChange = (e) => {
    const urlsPattern = e.target.value
                          .replace(/\,\s+|\,\,+/g, ",")
                          .replace(/\r|\n|\s\s+/g, "");

    dispatch(handleUrlsChange(urlsPattern));
  };

  const handleSearch = () => {
    dispatch(setActivePage(1));
    dispatch(fetchTasks())
  };

  const handleExcludeChange = (e) => {
    dispatch(handleExcludeUrlsChange(e.target.checked));
  };

  return (
    <>
      <PreferredSearchModal />

      <div className="mt-2 px-3 overflow-y-auto lg:h-[80%] md:h-[70%] sm:h-[60%]">
        <div>
          <div style={{ position: 'absolute', right: '0', marginRight: '15px', top: '70px' }}>
            <RefreshIcon onClick={handleResetFormFields}  className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
          
          <Label name="Translation Status" />
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedStatus}
            onChange={(option) => handleChange(option, "selectedStatus")}
            options={statuses}
          />

          <Label name="Assignment Status" />
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedAssignmentStatus}
            onChange={(option) => handleChange(option, "selectedAssignmentStatus")}
            options={assignmentStatuses}
          />

          <Label name="Translation Types" />
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedTranslationType}
            onChange={(option) => handleChange(option, "selectedTranslationType")}
            options={translationTypes}
          />

          <Label name="TAT Status" />
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedTATStatus}
            onChange={(option) => handleChange(option, "selectedTATStatus")}
            options={TATStatuses}
          />

          <Label name="Handling Flags"/>
          <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            value={selectedFlag}
            onChange={(option) => handleChange(option, "selectedFlag")}
            options={flags}
          />

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
            value={selectedIds}
            onChange={handleSelectedIdsChange}
            className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                       block w-full text-xs border-gray-300 rounded-md"
            placeholder="1,2,3... or 1-50  or 50-"
          />

          {/* Put this in a component */}
          <div>
            <div className="flex justify-between items-baseline">
              <div className="flex items-baseline">
                <label
                  htmlFor="urls"
                  className="block text-xs font-medium text-gray-700 mt-3"
                >
                  Task Urls
                </label>
                <ReactTooltip id="urls-tooltip" place="right">
                  <u><strong>Url Pattern Search Rules</strong></u><br />

                  1. ' OR ', ' AND ', and ' NOT ' must be capitalized, otherwise they will be<br />
                  considered as part of the url pattern searched for.<br />
                  2. ' OR ', ' AND ', and ' NOT ' must contain at least one space before and after as shown here<br />
                  3. A comma ',' or a space ' ' means the same thing as ' OR '<br />
                  4. Items can be grouped using '{"<"}' to start the group and '{">"}' to end the group.<br />
                  Typically url patterns separated by ' OR ' will be grouped together.<br /><br />

                  <u><strong>Url Pattern Search Examples</strong></u><br />
                  http://www.testdomain.com/scuba/scuba-wetsuits/shorty-wetsuit/<br />
                  http://www.testdomain.com/scuba/scuba-specialty-items/speargun/<br />
                  http://www.testdomain.com/scuba/scuba-wetsuits/dive-boots/<br />
                  http://www.testdomain.com/scuba/scuba-wetsuits/dive-gloves/<br />
                  http://www.testdomain.com/scuba-diving/dive-alert-plus-standard-signaling-device/<br /><br />

                  1. wetsuit<br />
                  http://www.testdomain.com/scuba/scuba-<b>wetsuit</b>s/shorty-<b>wetsuit</b>/<br /><br />
                  2. wetsuit AND shorty<br />
                  http://www.testdomain.com/scuba/scuba-<b>wetsuit</b>s/<b>shorty</b>-<b>wetsuit</b>/<br /><br />

                  3. boots OR gloves<br />
                  http://www.testdomain.com/scuba/scuba-wetsuits/dive-<b>boots</b>/<br />
                  http://www.testdomain.com/scuba/scuba-wetsuits/dive-<b>gloves</b>/<br /><br />

                  4. boots gloves<br />
                  http://www.testdomain.com/scuba/scuba-wetsuits/dive-<b>boots</b>/<br />
                  http://www.testdomain.com/scuba/scuba-wetsuits/dive-<b>gloves</b>/<br /><br />

                  5. {"<"}wetsuit AND gloves&gt OR &ltwetsuit AND boots{">"}<br />
                  http://www.testdomain.com/scuba/scuba-<b>wetsuit</b>s/dive-<b>boots</b>/<br />
                  http://www.testdomain.com/scuba/scuba-<b>wetsuit</b>s/dive-<b>gloves</b>/<br /><br />

                  6. dive NOT gloves NOT signaling<br />
                  http://www.testdomain.com/scuba/scuba-wetsuits/<b>dive</b>-boots/<br />
                </ReactTooltip>
                <QuestionMarkCircleIcon data-tip data-for="urls-tooltip" className="w-4 h-4 ml-1" />
              </div>
              <div className="flex">
                <label htmlFor="excludeUrls" className="text-xs text-gray-700 font-medium mr-1">exclude</label>
                <input type="checkbox" name="excludeUrls" onChange={handleExcludeChange} />
              </div>
            </div>
            <input
              type="text"
              name="urls"
              id="urls"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500
                       block w-full text-xs border-gray-300 rounded-md"
              placeholder="url1,url2,url3..."
              onChange={handleSelectedUrlsChange}
              value={selectedTaskUrlsPattern}
            />
          </div>

          <Label name="Queue Start Date" />
          <DatePicker
            selected={startQueueDate == null ? null : new Date(startQueueDate)}
            shouldCloseOnSelect={true}
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
              <Label name="Queue End Date"/>
              <DatePicker
                selected={endQueueDate == null ? null : new Date(endQueueDate)}
                shouldCloseOnSelect={true}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-xs
                         border-gray-300 rounded-md p-2"
                onChange={(date) => handleDateChange('end', date)}
              />

              <Label name="Content Type"/>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                value={selectedContentType}
                onChange={(option) =>
                  handleChange(option, "selectedContentType")
                }
                options={contentTypes}
              />

              <Label name="Priority"/>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                value={selectedPriority}
                onChange={(option) => handleChange(option, "selectedPriority")}
                options={priorities}
              />

              <Label name="Project Code"/>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                value={selectedProjectCode}
                onChange={(option) => handleChange(option, "selectedPriority")}
                options={projectCodes}
              />

              <Label name="Internal Reviewer"/>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                menuPlacement={'top'}
                value={selectedInternalReviewer}
                onChange={(option) =>
                  handleChange(option, "selectedInternalReviewer")
                }
                options={internalReviewers}
              />

              <Label name="Requested By"/>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                menuPlacement={'top'}
                value={selectedRequestedBy}
                onChange={(option) =>
                  handleChange(option, "selectedRequestedBy")
                }
                options={requestedBy}
              />

              <Label name="Pending Deletion"/>
              <Select
                maxMenuHeight={850}
                styles={STANDARD_DROPDOWN_STYLES}
                menuPlacement={'top'}
                value={selectedPendingDeletionStatus}
                onChange={(option) =>
                  handleChange(option, "selectedPendingDeletionStatus")
                }
                options={pendingDeletionStatuses}
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
                   bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Pref Search
        </button>
        <button
          onClick={handleSearch}
          type="button"
          className="inline-flex items-center px-4 py-1.5 border border-transparent
                     text-xs font-medium rounded shadow-sm text-white bg-blue-600
                    hover:bg-blue-700 focus:outline-none focus:ring-2
                     focus:ring-offset-2 focus:ring-blue-500"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Search;
