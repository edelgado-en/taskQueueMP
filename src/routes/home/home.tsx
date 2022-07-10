import ActionBar from "./components/actionBar/ActionBar";
import TaskTable from "./components/tasks/TaskTable";
import SideBar from "./components/sidebar/sidebar";
import Pagination from "../../components/pagination/pagination";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectSidebarOpen } from "./components/sidebar/expanded/settings/settingsSlice";
import { fetchTasks } from "./components/tasks/tasksSlice";
import { useEffect } from "react";

const Home = () => {
  const isExpanded = useAppSelector(selectSidebarOpen);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());

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
