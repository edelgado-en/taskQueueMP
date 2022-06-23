import ActionBar from "./components/actionBar/ActionBar";
import TaskTable from "./components/tasks/TaskTable";

import SideBar from "./components/sidebar/sidebar";

import { useAppSelector } from "../../app/hooks";

import { selectIsExpanded } from "./components/sidebar/sideBarSlice";

import { fetchTasks } from "./components/tasks/tasksSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";

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

  return (
    <>
      <div style={{ marginTop: "65px" }}></div>
      <div className="flex">
        <SideBar />
        <div className="w-full">
          <div className="mt-1" style={{ marginLeft: isExpanded ? "257px" : "57px" }}>
            <ActionBar />
            <TaskTable />
            {/* pagination here */}
            <div className="p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
