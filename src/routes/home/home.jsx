import ActionBar from "./components/actionBar/ActionBar";
import TaskTable from "./components/tasks/TaskTable";

import SideBar from "./components/sidebar/sidebar";

import { useAppSelector } from "../../app/hooks";

import { selectIsExpanded } from "./components/sidebar/sideBarSlice";

import { fetchTasks } from "./components/tasks/tasksSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";

import Pagination from "react-js-pagination";

const Home = () => {
  const isExpanded = useAppSelector(selectIsExpanded);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestObject = {
      "filters" : [
          {
              "field": "seoMode",
              "fieldValueRelationship": "=",
              "value": "0"        
          }
      ],
      page: 0,
      size: 200,
      sort: ["id, asc"]
    }

    dispatch(fetchTasks(requestObject));
  }, []);

  const handlePageChange = (page) => {

  }

  return (
    <>
      <div style={{ marginTop: "65px" }}></div>
      <div className="flex">
        <SideBar />
        <div className="w-full">
          <div className="mt-1" style={{ marginLeft: isExpanded ? "257px" : "57px" }}>
            <ActionBar />
            <TaskTable />
            <div className="bg-white p-4 sm:px-6 border-2 border-gray-150 rounded mt-6">
              <div className="flex space-x-3">
                 <div className='tpm-pagination-container'>
                    <Pagination
                        innerClass="pagination pagination-custom"
                        activePage={1}
                        hideDisabled
                        itemClass="page-item page-item-custom"
                        linkClass="page-link page-link-custom"
                        itemsCountPerPage={200}
                        totalItemsCount={50000}
                        pageRangeDisplayed={4}
                        onChange={handlePageChange}
                        />
                  </div>
                
              </div>
            </div>
            <div className="p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
