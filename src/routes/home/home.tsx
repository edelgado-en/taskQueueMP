import ActionBar from "./components/actionBar/ActionBar";
import TaskTable from "./components/tasks/TaskTable";
import SideBar from "./components/sidebar/sidebar";
import Pagination from "../../components/pagination/pagination";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectSidebarOpen } from "./components/sidebar/expanded/settings/settingsSlice";
import { getContractors } from './formInfoSlice';
import { fetchTasks, selectSelectedTasks } from "./components/tasks/tasksSlice";
import { useEffect } from "react";
import { Buffer } from "buffer";

const Home = () => {
  const isExpanded = useAppSelector(selectSidebarOpen);
  const selectedTasks = useAppSelector(selectSelectedTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContractors());
  
  }, []);

  useEffect(() => {
    dispatch(fetchTasks());

  }, []);

  const handleOpenTasks = () => {
    const taskIds = selectedTasks.map(t => t.id).join(",");
    const encodedTaskIds = Buffer.from(taskIds).toString("base64");
    const toolbarDisplayMode = 'f'; // default value
    const transparentOverlay = true;
    const currentPageId = Buffer.from(selectedTasks[0].id.toString()).toString("base64");
    window.location.href = `/tm/#!/text/${encodedTaskIds},${toolbarDisplayMode},${transparentOverlay},${currentPageId}`;
  };

  return (
    <>
      <div style={{ marginTop: '50px' }}></div>
      {/* TODO: when switching queues, only load this AFTER you have successfully set all the corresponding values in the localStorage
      so that the API calls can work correctly. */}
      <div className="flex">
        <SideBar />
        <div className="w-full">
          <div className="mt-1" style={{ marginLeft: isExpanded ? "257px" : "57px" }}>
            <ActionBar handleOpenTasks={handleOpenTasks} />
            <TaskTable handleOpenTasks={handleOpenTasks}/>
            <Pagination />
            <div className="p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
