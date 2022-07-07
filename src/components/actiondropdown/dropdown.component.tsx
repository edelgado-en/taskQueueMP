import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'

interface IDropdownItem {
  label: string;
  handleAction: () => void;
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

const Dropdown = () => {

  const handleOpenTasks = () => {
    console.log('open tasks');
  }

  const handleNewSegments = () => {
    console.log('new segments');
  }

  const handleAssignToLSP = () => {
    console.log('assign to LSP');
  }

  const handleAssignToInternalReviewer = () => {
    console.log('assign to internal reviewer');
  }

  const handleDeleteTasks = () => {
    console.log('delete tasks');
  }

  const handleUpdateTasks = () => {
    console.log('update tasks');
  }


  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center px-2.5 py-1.5 border
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
  )
}

export default Dropdown;