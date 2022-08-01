import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { selectSelectedTasks, selectTotalTasks,
         selectActionLoading } from "../tasks/tasksSlice";

import DeletTasksModal from './DeleteTasksModal';
import UpdateTasksModal from './UpdateTasksModal';
import AssignTasksModal from './AssignLSPModal';

import { setModal, selectModal, ModalType } from '../../../../components/modal/modalSlice';

import {
  TranslateIcon,
  EyeIcon,
  CheckIcon
} from "@heroicons/react/solid";

import {
  DocumentIcon,
} from "@heroicons/react/outline";

interface IProps {
  words: number;
  tasks: number;
  children: React.ReactNode;
}

interface IDropdownItem {
  label: string;
  handleAction: () => void;
}

interface IActionBar {
  handleOpenTasks: () => void;
}

const StatsCard = ({ words, tasks, children } : IProps) => {
  return (
    <div className="inline-flex w-48 hover:bg-gray-100">
      <div
        className="flex-shrink-0 flex items-center justify-center w-10
                                text-gray text-xs font-medium rounded-l-md">
        {children}
      </div>
    
      <div className="flex-1 flex items-center justify-betweenbg-white truncate">
        <div className="flex-1 px-2 py-2 text-xs truncate">
          <div className="text-gray-900 font-medium text-xs">
            {words.toLocaleString('en-US')} Words
          </div>
          <div className="text-gray-400 text-xs">
            {tasks} Tasks
          </div>
          
        </div>
      </div>
    </div>
  )
}

const DropdownItem = ({ label, handleAction } : IDropdownItem) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a href="#"
          onClick={handleAction}
          className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`}>
          {label}
        </a>
      )}
    </Menu.Item>
  )
}

const ActionBar = ({ handleOpenTasks }: IActionBar) => {
  const selectedTasks = useAppSelector(selectSelectedTasks);
  const totalTasks = useAppSelector(selectTotalTasks);
  const modal = useAppSelector(selectModal);

  const dispatch = useAppDispatch();

  const handleNewSegments = () => {
    console.log('new segments');
  }

  const handleAssignToLSP = () => {
    dispatch(setModal({ name: ModalType.AssignTasks, isOpen: true }));
  }

  const handleAssignToInternalReviewer = () => {
    console.log('assign to internal reviewer');
  }

  const handleDeleteTasks = () => {
    dispatch(setModal({ name: ModalType.DeleteTasks, isOpen: true}));
  }

  const handleUpdateTasks = async () => {
    dispatch(setModal({ name: ModalType.UpdateTaskStatistics, isOpen: true}));
  }

  return (
    <>
      { modal.name === ModalType.AssignTasks && modal.isOpen && <AssignTasksModal /> }
      { modal.name === ModalType.DeleteTasks && modal.isOpen && <DeletTasksModal /> }
      { modal.name === ModalType.UpdateTaskStatistics && modal.isOpen && <UpdateTasksModal /> }
    
      <div className="shadow md:px-3
                      fixed z-10 bg-white border-solid border-b-2
                      border-gray-200 px-2 w-full flex flex-row"
            style={{ marginTop: "-66px", height: '51px' }}>
        
        <div className="md:basis-[20%] sm:basis-[30%] mt-2.5">
          <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button disabled={selectedTasks.length == 0} className="inline-flex items-center px-2.5 py-1.5 border
                    border-transparent text-xs font-medium rounded text-white
                  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-blue-500">
                  Actions
                  <ChevronDownIcon className="-mr-1 ml-1 h-4 w-4" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute left-5 mt-2 w-56
                                      rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                                      divide-y divide-gray-100 focus:outline-none z-20">
                  <div className="py-1">
                    <DropdownItem label="Open Tasks" handleAction={handleOpenTasks} />
                    <DropdownItem label="New Segments" handleAction={handleNewSegments} />
                  </div>

                  <div className="py-1">
                    <DropdownItem label="Assign to LSP" handleAction={handleAssignToLSP} />
                    <DropdownItem label="Assign to Internal Reviewer" handleAction={handleAssignToInternalReviewer} />
                  
                  </div>
                  
                  <div className="py-1">
                    <DropdownItem label="Delete Tasks" handleAction={handleDeleteTasks} />
                    <DropdownItem label="Update Tasks" handleAction={handleUpdateTasks} />
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          
            <span className="text-sm mr-2 ml-3">{totalTasks.toLocaleString('en-US')} Tasks</span>
            
            {selectedTasks.length > 0 && (
              <>
                <span className="text-sm font-medium text-gray-500">
                  [ {selectedTasks.length} ]
                </span>
              </>
            )}
        </div>
        <div className="md:basis-[80%] sm:basis-[70%]">
          {selectedTasks.length > 0 && (
            <>
              <StatsCard words={5678} tasks={15}>
                <DocumentIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400" />
              </StatsCard>
              
              <StatsCard words={12678} tasks={12}>
                <TranslateIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />
              </StatsCard>
              
              <StatsCard words={678} tasks={5}>
                <EyeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" />
              </StatsCard>

              <StatsCard words={14678} tasks={1}>
                <CheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              </StatsCard>

            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ActionBar;
