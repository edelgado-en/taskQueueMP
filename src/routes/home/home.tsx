import ActionBar from "./components/actionBar/ActionBar";
import TaskTable from "./components/tasks/TaskTable";
import SideBar from "./components/sidebar/sidebar";
import Pagination from "../../components/pagination/pagination";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectIsExpanded } from "./components/sidebar/sideBarSlice";
import { fetchTasks, selectPageSize, selectActivePage } from "./components/tasks/tasksSlice";
import { selectFilters } from "./components/sidebar/expanded/search/searchSlice";

import { useEffect } from "react";

const Home = () => {
  const isExpanded = useAppSelector(selectIsExpanded);
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
    
    //read from searchSlice

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
