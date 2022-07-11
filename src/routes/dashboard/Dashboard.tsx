

import { Link } from "react-router-dom";
import {
  CogIcon,
  ExclamationCircleIcon,
  DocumentTextIcon,
  UserIcon,
  UsersIcon,
  ServerIcon,
  CollectionIcon,
  BriefcaseIcon
} from '@heroicons/react/outline'

import ProjectOverview from './projectOverview/ProjectOverview';
import AutoJobSettings from './autoJobSettings/AutoJobSettings';

const navigation = [
  { name: 'Dashboard', href: '#', current: true }
]

const subNavigation = [
  { name: 'Project Overview', icon: DocumentTextIcon, current: true },
  { name: 'Pending Items', icon: ExclamationCircleIcon, current: false },
  { name: 'Customer Features', icon: UserIcon, current: false },
  { name: 'Project Settings', icon: CogIcon, current: false },
  { name: 'Job Features', icon: CollectionIcon, current: false },
  { name: 'Job Settings', icon: BriefcaseIcon, current: false },
  { name: 'LSP Management', icon: UsersIcon, current: false },
  { name: 'TServer Info', icon: ServerIcon, current: false },
]

const Dashboard = () => {
  return (
    <div>
      <div className="relative bg-sky-700 pb-32 overflow-hidden">
        <nav className="relative z-10 border-b border-teal-500 border-opacity-25 lg:bg-transparent lg:border-none">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                <div className="relative h-16 flex items-center justify-between lg:border-b lg:border-sky-800">
                    <div className="px-2 flex items-center lg:px-0">
                    <div className="hidden lg:block lg:ml-6 lg:space-x-4">
                        <div className="flex">
                        {navigation.map((item) => (
                            <a
                            key={item.name}
                            href={item.href}
                            className="rounded-md py-2 px-3 text-sm font-medium text-white bg-black bg-opacity-25"
                            >
                            {item.name}
                            </a>
                        ))}
                        
                        </div>
                        <Link to="/">
                        <div style={{ position: 'relative', top: '65px', left: '1050px' }}>
                            <button
                                type="button"
                                className="inline-flex items-center px-6 py-3 border
                                                border-gray-300 shadow-sm text-base font-medium rounded-md
                                                text-gray-700 bg-white hover:bg-gray-50 focus:outline-none
                                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            Go to Queue
                            </button>
                        </div>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </nav>
        <div className="absolute inset-x-0 left-1/2 transform -translate-x-1/2 w-full overflow-hidden lg:inset-y-0">
            <div className="absolute inset-0 flex">
                <div className="h-full w-1/2" style={{ backgroundColor: '#0a527b' }} />
                <div className="h-full w-1/2" style={{ backgroundColor: '#065d8c' }} />
            </div>
            <div className="relative flex justify-center">
                <svg
                    className="flex-shrink-0"
                    width={1750}
                    height={308}
                    viewBox="0 0 1750 308"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M284.161 308H1465.84L875.001 182.413 284.161 308z" fill="#0369a1" />
                    <path d="M1465.84 308L16.816 0H1750v308h-284.16z" fill="#065d8c" />
                    <path d="M1733.19 0L284.161 308H0V0h1733.19z" fill="#0a527b" />
                    <path d="M875.001 182.413L1733.19 0H16.816l858.185 182.413z" fill="#0a4f76" />
                </svg>
            </div>
        </div>
        
        <header className="relative py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            </div>
        </header>
      </div>

      <main className="relative -mt-32">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav className="space-y-1">
                  {subNavigation.map((item) => (
                    <span
                      key={item.name}
                      className={`${item.current 
                        ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                        : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'}
                        group border-l-4 px-3 py-2 flex items-center text-sm font-medium cursor-pointer`}
                    >
                      <item.icon
                        className={`${item.current 
                            ? 'text-teal-500 group-hover:text-teal-500'
                            : 'text-gray-400 group-hover:text-gray-500'}
                            flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                      />
                      <span className="truncate">{item.name}</span>
                    </span>
                  ))}
                </nav>
              </aside>

              <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                <ProjectOverview />
                <AutoJobSettings />
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard;