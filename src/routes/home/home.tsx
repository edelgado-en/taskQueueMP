import ActionBar from "./components/actionBar/ActionBar";
import TaskTable from "./components/tasks/TaskTable";
import SideBar from "./components/sidebar/sidebar";
import Pagination from "../../components/pagination/pagination";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
//import { selectIsExpanded } from "./components/sidebar/sideBarSlice";
import { selectSidebarOpen } from "./components/sidebar/expanded/settings/settingsSlice";

import { fetchTasks, selectPageSize, selectActivePage } from "./components/tasks/tasksSlice";
import { selectFilters } from "./components/sidebar/expanded/search/searchSlice";
import { useEffect } from "react";

const Home = () => {
  const isExpanded = useAppSelector(selectSidebarOpen);
  const pageSize = useAppSelector(selectPageSize);
  const activePage = useAppSelector(selectActivePage);

  const { 
    selectedStatus,
    selectedAssignmentStatus,
    selectedTranslationType,
    selectedFlag,
    selectedTATStatus,
    selectedContentType,
    selectedPriority,
    selectedInternalReviewer,
    selectedRequestedBy,
    startQueueDate,
    endQueueDate

  } = useAppSelector(selectFilters);

  const dispatch = useAppDispatch();

  useEffect(() => {
    
    //TODO: move this to a common location for all the fetching because the filters always come from the same place
    //so you only need to build the requestObject once and you can call it from multiple places.
    const requestObject = {
      assignmentStatusIdSelected: selectedAssignmentStatus.value,
      translationStatusIdSelected: selectedStatus.value,
      contentTypeIdSelected: selectedContentType.value,
      translationTypeIdSelected: selectedTranslationType.value,
      seoMode: false,
      pageSize: pageSize.value,
      activePage
    }

    dispatch(fetchTasks(requestObject));

  }, []);

  return (
    <>
      <div style={{ marginTop: '50px' }}></div>
      {/* TODO: when switching queues, only load this AFTER you have successfully set all the corresponding values in the localStorage
      so that the API calls can work correctly. */}
      <div className="flex">
        <SideBar />
        <div className="w-full">
          <div className="mt-1" style={{ marginLeft: isExpanded ? "257px" : "57px" }}>
            <ActionBar />
            <TaskTable />
            <Pagination />
            <div className="p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
