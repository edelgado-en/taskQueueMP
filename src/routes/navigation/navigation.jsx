import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from './mp-logo.png';
import { Outlet, Link } from "react-router-dom";
import Select from "react-select";
import { STANDARD_DROPDOWN_STYLES, PAGE_SIZE_OPTIONS } from "../../constants";

import { loadTextBenchSession } from '../../localstorage';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
  const tpmSession = loadTextBenchSession();

  const handlePageSizeChange = (size) => {

  }

  return (
    <>
      <Disclosure as="nav" className="bg-white shadow fixed w-full z-50">
        {({ open }) => (
          <>
            <div className="mx-auto pl-3 pr-2 sm:pr-6 lg:pr-6">
              <div className="relative flex justify-between" style={{ height: '50px' }}>
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2
                                     rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100
                                      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block w-auto"
                      style={{ height: '28px' }}
                      src={logo}
                      alt="mp-logo"
                    />
                    <div className="px-3 font-medium text-lg">Translation Manager</div>
                    <div className="px-1 py-1 rounded uppercase text-xs tracking-wide whitespace-nowrap
                                   font-semibold bg-sky-100 text-sky-500">
                                    Beta
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* <Link
                      to="/"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Tasks
                    </Link> */}
                    <div className="w-48 mt-2 ml-8">
                       {/*  <Select 
                            maxMenuHeight={160}
                            styles={STANDARD_DROPDOWN_STYLES}
                            value={1}
                            onChange={handlePageSizeChange}
                            options={PAGE_SIZE_OPTIONS}
                        /> */}
                        <div className="mt-1">
                          {tpmSession.project.name} - {tpmSession.project.sourceLanguage.code} - {tpmSession.project.targetLanguage.name}

                          {tpmSession.project.targetCountry
                             && tpmSession.project.targetCountry.name 
                                ? ` - ${tpmSession.project.targetCountry.name}` : ''}
                        </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <div className="w-12 text-center">
                          <div className="w-10" style={{ lineHeight: '36px',borderRadius: '50%', fontSize: '15px', background: '#686f7a', color: '#fff' }}>
                            ED
                          </div>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48
                                             rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            {/* This is for the hamburger buttom in smaller screen */}
            {/* <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              <Disclosure.Button
                as="a"
                href="#"
                className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                <Link to="/">
                    Home
                  </Link>
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                <Link to="/counter">
                    Counter
                  </Link>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel> */}
          </>
        )}
      </Disclosure>

      <Outlet />
    </>
  );
}

export default Navigation;
