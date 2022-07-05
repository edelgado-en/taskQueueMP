import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'
import { useAppSelector, useAppDispatch } from "../../../../../../app/hooks";

import { selectIsModalOpen, toggleModal } from './preferredSearchSlice';

const Modal = () => {
  const isModalOpen = useAppSelector(selectIsModalOpen);
  const dispatch = useAppDispatch();

  const handleToggleModal = () => {
    dispatch(toggleModal(!isModalOpen));
  }

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={handleToggleModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6" style={{ marginTop: '-400px' }}>
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Add Preferred Search
                    </Dialog.Title>
                    
                    <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
                      <div className="space-y-6 sm:space-y-5">
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="first-name" className="block text-sm text-black-500 sm:mt-px sm:pt-2">
                            Name
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="first-name" className="block text-sm text-black-500 sm:mt-px sm:pt-2">
                            Comment
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="first-name"
                              id="first-name"
                              autoComplete="given-name"
                              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                          <label htmlFor="first-name" className="block text-sm text-black-500 sm:mt-px sm:pt-2">
                            Color
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="flex flex-row mt-2">
                              <div className="flex-1 w-6 h-7 bg-red-200 cursor-pointer">
                              </div>
                              <div className="flex-1 w-6 h-7 bg-orange-200 cursor-pointer">
                              </div>
                              <div className="flex-1 w-6 h-7 bg-amber-200 cursor-pointer">
                              </div>
                              <div className="flex-1 w-6 h-7 bg-lime-200 cursor-pointer">
                              </div>
                              <div className="flex-1 w-6 h-7 bg-emerald-200 cursor-pointer">
                              </div>
                              <div className="flex-1 w-6 h-7 bg-cyan-200 cursor-pointer">
                              </div>
                              <div className="flex-1 w-6 h-7 bg-blue-200 cursor-pointer">
                              </div>
                              <div className="flex-1 w-6 h-7 bg-violet-200 cursor-pointer">
                              </div>
                              <div className="flex-1 w-6 h-7 bg-pink-200 cursor-pointer">
                              </div>
                            </div>
                          </div>
                        </div>
                        <div style={{ paddingBottom: '1px' }}></div>
                      </div>

                    </div>
                    
                  </div>
                </div>
                <div className="mt-7 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={handleToggleModal}
                  >
                    Add Search
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={handleToggleModal}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal;