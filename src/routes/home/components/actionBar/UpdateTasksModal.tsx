

import { useEffect, useRef, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import ModalFrame from "../../../../components/modal/ModalFrame";
import { selectModal, setModal, ModalType } from '../../../../components/modal/modalSlice';
import { fetchTasks } from '../tasks/tasksSlice';
import { selectSelectedTasks,  } from "../tasks/tasksSlice";
import { toast } from 'react-toastify';
import * as api from './apiService';

const UpdateTasksModal = () => {
    const modal = useAppSelector(selectModal);
    const selectedTasks = useAppSelector(selectSelectedTasks);
    const dispatch = useAppDispatch();
    const cancelButtonRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<{pageId: number; queueMode: string; updated: boolean}[]>([]);

    const isOpen = modal.name === ModalType.UpdateTaskStatistics && modal.isOpen;

    useEffect(() => {
        setResults([]);
    }, []);

    const handleToggleModal = () => {
        setResults([]);
        dispatch(setModal({ name: ModalType.UpdateTaskStatistics, isOpen: false}));
    }

    const handleUpdateTasks = async () => {
        setLoading(true);
    
        const requestObject = selectedTasks.map(t => {
            return {
              pageId: t.id,
              queueMode: t.seoPage ? 'SEO' : 'REGULAR'
            } 
        });
    
        try {
          const { data } = await api.updateTaskStatistics(requestObject);
    
          const results = data.map((d: {
              pageAspect: { pageId: number; queueMode: string; };
              updated: boolean;
             }) => {
            return {
              pageId: d.pageAspect.pageId,
              queueMode: d.pageAspect.queueMode,
              updated: d.updated
            }
          });

          setLoading(false);
          setResults(results);
          dispatch(fetchTasks());

        } catch (e) {
            toast.error('Unable to update tasks');
            setLoading(false);
        }
      }

    return (
        <ModalFrame isModalOpen={isOpen} cancelButtonRef={cancelButtonRef}>
            <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        Update Tasks
                    </Dialog.Title>
                    
                    {results.length === 0 && (
                        <div className="mt-2">
                            <p>
                                Are you sure you want to update {selectedTasks.length} tasks? 
                            </p>
                            <p className="mt-2 text-gray-500 text-sm">
                                This action might take several seconds to complete depending on how many tasks you selected.
                            </p>
                        </div>
                    )}

                    {results.length > 0 && (
                        <>
                        <div className="my-5">
                            Processing completed. Check results below:
                        </div>
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg max-h-96 ml-14">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap py-1.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            Id
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-1.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Result
                                        </th>
                                        <th
                                            scope="col"
                                            className="whitespace-nowrap px-2 py-1.5 text-left text-sm font-semibold text-gray-900"
                                        >
            
                                        </th>
                                        </tr>
                                    </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {results.map((result, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                                            {result.pageId}
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                                            {result.updated ? <span className="inline-flex rounded-full bg-green-100 px-2 text-xs
                                                                    font-semibold leading-5 text-green-800">
                                                        Success
                                                    </span> 
                                                : 
                                                <span className="inline-flex rounded-full bg-red-100 px-2 text-xs
                                                                    font-semibold leading-5 text-red-800">
                                                        Failed
                                                    </span>
                                            }
                                        </td>
                                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                                            {result.queueMode === 'SEO' &&
                                                <span className="inline-flex rounded-full px-2 text-xs
                                                                font-semibold leading-5">
                                                    SEO
                                                </span>
                                            }
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                        </>
                    )}
                    
                </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {results.length === 0 &&
                    <button
                        disabled={loading}
                        ref={cancelButtonRef}
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2
                                bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2
                                focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={handleUpdateTasks}>
                        {loading ? 'updating...' : 'Update Tasks'}
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
                    {results.length > 0 ? 'Close' : 'Cancel'}
                </button>}
            </div>
        </ModalFrame>
    )
}

export default UpdateTasksModal;