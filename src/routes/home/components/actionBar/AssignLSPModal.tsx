import { useEffect, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import ModalFrame from "../../../../components/modal/ModalFrame";
import { selectModal, setModal, ModalType } from '../../../../components/modal/modalSlice';
import { fetchTasks } from '../tasks/tasksSlice';
import { selectSelectedTasks,  } from "../tasks/tasksSlice";
import { selectContractors } from '../../formInfoSlice';
import Select from "react-select";
import { STANDARD_DROPDOWN_STYLES } from "../../../../constants";
import { toast } from 'react-toastify';
import * as api from './apiService';

interface DropdownOption {
    value: number;
    label: string;
}

const AssignModal = () => {
    const modal = useAppSelector(selectModal);
    const selectedTasks = useAppSelector(selectSelectedTasks);
    let contractors = useAppSelector(selectContractors);
    
    const dispatch = useAppDispatch();
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [adjustedContractors, setAdjustedContractors] = useState<DropdownOption[]>([]);
    const [selectedLSP, setSelectedLSP] = useState<DropdownOption>(contractors[0]);

    const isOpen = modal.name === ModalType.AssignTasks && modal.isOpen;

    useEffect(() => {
        let lsps = [...contractors];
        lsps.unshift({ value: 0, label: "None" });

        setAdjustedContractors(lsps);
        setSelectedLSP(lsps[1]);

    }, []);

    const handleToggleModal = () => {
        dispatch(setModal({ name: ModalType.AssignTasks, isOpen: false}));
    }

    const handleChange = (option: any) => {
        setSelectedLSP(option);
    }

    const handleAssignTasks = async () => {
        setLoading(true);

        const ids = selectedTasks.map(function(task) {
            return { id: task.id };
        });

        const contractor = {
            id: selectedLSP.value,
            companyName: selectedLSP.label === "None" ? null : selectedLSP.label
        }

        const requestObject = {
            contractor,
            priority: null, //Original TM does not support priority. Check with business if this is needed later on.
            tasks: ids
        }
    
        try {
          await api.assignContractor(requestObject);
    
          setLoading(false);
          dispatch(setModal({ name: ModalType.AssignTasks, isOpen: false}));
          dispatch(fetchTasks());

          toast.success('Tasks assigned successfully');
      
        } catch (e) {
            dispatch(setModal({ name: ModalType.AssignTasks, isOpen: false}));
            toast.error('Unable to assign tasks');
            setLoading(false);
        } 
      }

    return (
        <ModalFrame isModalOpen={isOpen} cancelButtonRef={cancelButtonRef}>
            <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Assignment for Translation
                    </Dialog.Title>
                    <div className="my-3">
                        <p className="my-3 mt-6 text-sm">
                            Select an LSP for assigning the {selectedTasks.length} selected Task(s):
                        </p>
                        <div className="w-9/12">
                            <Select
                                maxMenuHeight={850}
                                styles={STANDARD_DROPDOWN_STYLES}
                                value={selectedLSP}
                                onChange={(option) => handleChange(option)}
                                options={adjustedContractors}
                            />
                        </div>
                        <div className="my-6 mt-10">
                            <p className="text-gray-500 text-sm">
                                Tasks flagged as "Error Page" will be changed to "Error Page Reviewed".
                            </p>
                            <p className="text-gray-500 text-sm">
                                Active Tasks will be automatically flagged as Special Edit for LSP access.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                    disabled={loading}
                    ref={cancelButtonRef}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2
                             bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2
                               focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleAssignTasks}>
                    {loading ? 'assigning...' : 'Assign'}
                </button>

                {!loading && 
                <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300
                                shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={handleToggleModal}
                    ref={cancelButtonRef}>
                    Cancel
                </button>}
            </div>
        </ModalFrame>
    )
}

export default AssignModal;