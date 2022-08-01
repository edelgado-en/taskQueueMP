import { useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { useAppSelector, useAppDispatch } from "../../../../../../app/hooks";
import { selectModal, setModal, ModalType } from '../../../../../../components/modal/modalSlice';
import ModalFrame from  '../../../../../../components/modal/ModalFrame';

const Modal = () => {
  const modal = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const cancelButtonRef = useRef(null);

  const isOpen = modal.name === ModalType.PreferredSearch && modal.isOpen;

  const handleToggleModal = () => {
    dispatch(setModal({ name: ModalType.PreferredSearch, isOpen: false}));
  }

  return (
    <ModalFrame isModalOpen={isOpen} cancelButtonRef={cancelButtonRef}>
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
                      className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500
                                  sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
                      className="max-w-lg block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500
                                sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
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
            className="w-full inline-flex justify-center rounded-md border
                        border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base
                        font-medium text-white hover:bg-blue-700 focus:outline-none
                          focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
            onClick={handleToggleModal}
          >
            Add Search
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border
                    border-gray-300 shadow-sm px-4 py-2 bg-white text-base
                    font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            onClick={handleToggleModal}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
        </div>
    </ModalFrame>  
  )
}

export default Modal;