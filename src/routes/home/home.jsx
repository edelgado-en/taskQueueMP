import ActionBar from "./components/actionBar/ActionBar";
import TaskTable from "./components/tasks/TaskTable";

import SideBar from "./components/sidebar/sidebar";

import { useAppSelector } from "../../app/hooks";

import { selectIsExpanded } from "./components/sidebar/sideBarSlice";

const Home = () => {
  const isExpanded = useAppSelector(selectIsExpanded);

  return (
    <>
      <div style={{ marginTop: "65px" }}></div>
      <div className="flex">
        <SideBar />
        <div className="w-full">
          <div
            className="mt-1"
            style={{ marginLeft: isExpanded ? "257px" : "57px" }}
          >
            <ActionBar />
            <TaskTable />
            <div className="p-5"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
