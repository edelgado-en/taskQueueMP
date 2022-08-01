import { useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import ModalFrame from "../../../../components/modal/ModalFrame";
import { selectModal, setModal, ModalType } from '../../../../components/modal/modalSlice';
import { fetchTasks } from '../tasks/tasksSlice';
import { ExclamationIcon, CheckIcon } from '@heroicons/react/solid';
import { selectSelectedTasks,  } from "../tasks/tasksSlice";
import { toast } from 'react-toastify';
import * as api from './apiService';

const DeleteTasksModal = () => {
    const modal = useAppSelector(selectModal);
    const selectedTasks = useAppSelector(selectSelectedTasks);
    const dispatch = useAppDispatch();
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [fullyDeleted, setFullyDeleted] = useState(false);
    const [deleteCompleted, setDeleteCompleted] = useState(false);
    const [completedMessage, setCompletedMessage] = useState('');

    const isOpen = modal.name === ModalType.DeleteTasks && modal.isOpen;

    const handleToggleModal = () => {
        setDeleteCompleted(false);
        setFullyDeleted(false);
        dispatch(setModal({ name: ModalType.DeleteTasks, isOpen: false}));
    }

    const handleDeleteTasks = async () => {
        setLoading(true);

        const ids = selectedTasks.map((task: { id: number; }) => task.id).join(',');
    
        const requestObject = {
          filters: [{ field: "id", fieldValueRelationship: "in", value: ids }]
        }
    
        try {
          const { data } = await api.deleteTasks(requestObject);
        
          setFullyDeleted(data.length === selectedTasks.length);

          setCompletedMessage(data.length + " out of the " + selectedTasks.length + " task(s) have been successfully flagged for subsequent deletion.");
          setLoading(false);
          setDeleteCompleted(true);
        
          //only fetch tasks if at least one task was updated
          if (data.length > 0) {
              dispatch(fetchTasks());
          }

        } catch (e) {
          toast.error('Unable to delete tasks');
          setLoading(false);
        }
    }

    return (
        <ModalFrame isModalOpen={isOpen} cancelButtonRef={cancelButtonRef}>
            <div className="sm:flex sm:items-start">
                <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12
                                 rounded-full bg-${fullyDeleted ? 'green' : 'red'}-100 sm:mx-0 sm:h-10 sm:w-10`}>
                    {fullyDeleted && <CheckIcon className="h-6 w-6 text-green-600" />}

                    {!fullyDeleted && <ExclamationIcon className={`h-6 w-6 text-red-600`} />}                    
                
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {fullyDeleted ? 'Successful' : 'Delete Tasks'}
                    </Dialog.Title>
                    {!deleteCompleted &&
                        <div className="mt-2">
                            <p>
                                Are you sure you want to delete {selectedTasks.length} tasks? 
                            </p>
                            <p className="mt-2 text-gray-500 text-sm">
                                The selected tasks will be "flagged" for subsequent deletion via the Auto-Delete Job.
                                You may recover these tasks by using the Action "Undo Flag for Deletion Task" if needed.
                            </p>
                        </div>
                    }

                    {deleteCompleted &&
                        <div className="mt-6">
                            <p>
                                {completedMessage}
                            </p>
                            <p className="my-6 text-gray-500 text-sm">
                                To delete pages queued by the job API, use the API dashboard.
                            </p>
                        </div>
                    }

                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {!deleteCompleted && 
                    <button
                        disabled={loading}
                        ref={cancelButtonRef}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2
                                bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2
                                focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleDeleteTasks}>
                        {loading ? 'deleting...' : 'Delete Tasks'}
                    </button>
                }   

                {!loading && 
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300
                                shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={handleToggleModal}
                    ref={cancelButtonRef}>
                    {deleteCompleted ? 'Close' : 'Cancel'}
                </button>}
            </div>
        </ModalFrame>
    )
}

export default DeleteTasksModal;