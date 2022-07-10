

import { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

/* TODO: Refactor this file */

const AutoJobSettings = () => {
    const [availableToHire, setAvailableToHire] = useState(true)
    const [privateAccount, setPrivateAccount] = useState(false)
    const [allowCommenting, setAllowCommenting] = useState(true)
    const [allowMentions, setAllowMentions] = useState(true)

    return (
        <div className="pt-6 divide-y divide-gray-200">
        <div className="px-6 sm:px-6">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">Auto Job Settings</h2>
            <p className="mt-1 text-sm text-gray-500">
              Add short description for auto job settings.
            </p>
          </div>
          <ul role="list" className="mt-2 divide-y divide-gray-200">
            <Switch.Group as="li" className="py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                  Project Statistics
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                  Calculates multiple Translation-Project specific statistics, which are displayed in the Translation-Project-Manager (TPM) page
                </Switch.Description>
              </div>
              <Switch
                checked={availableToHire}
                onChange={setAvailableToHire}
                className={classNames(
                  availableToHire ? 'bg-blue-500' : 'bg-gray-200',
                  'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    availableToHire ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>

            <Switch.Group as="li" className="py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                  Activity Statistics
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                      Calculates Daily statistics based on the Status-Activity records for each Translation-Project 
                      Runs once daily
                      <div>
                       (currently scheduled for 4:00 AM EST)
                      </div>
                </Switch.Description>
              </div>
              <Switch
                checked={privateAccount}
                onChange={setPrivateAccount}
                className={classNames(
                  privateAccount ? 'bg-blue-500' : 'bg-gray-200',
                  'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    privateAccount ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group as="li" className="py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                  Auto-Parse
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                  Parses newly created Pages, and updates Page's translation-status and statistics 
                  (Runs 24/7)
                </Switch.Description>
              </div>
              <Switch
                checked={allowCommenting}
                onChange={setAllowCommenting}
                className={classNames(
                  allowCommenting ? 'bg-blue-500' : 'bg-gray-200',
                  'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    allowCommenting ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group as="li" className="py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                  Auto-Parse (On-hold)
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                  Runs multiple times per day (currently schedules for 3 times a day)
                  <div>
                      Auto-Flag for Deletion identifies pages qualified for deletion, based on rules provided by the Business 
                  </div>
                  <div>
                      Runs multiple times per day (currently scheduled to run twice a day)
                  </div>
                </Switch.Description>
              </div>
              <Switch
                checked={false}
                onChange={setAllowMentions}
                className={classNames(
                  false ? 'bg-blue-500' : 'bg-gray-200',
                  'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    false ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group as="li" className="py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                  Auto Analysis
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                  Analyzes the content of Pages processed by the Auto-Parse, and determines if they are qualified for Translation's Auto-Assignment 
                      (Runs 24/7)
                </Switch.Description>
              </div>
              <Switch
                checked={allowMentions}
                onChange={setAllowMentions}
                className={classNames(
                  allowMentions ? 'bg-blue-500' : 'bg-gray-200',
                  'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    allowMentions ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group as="li" className="py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                  Auto Assign
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                      Assigns Pages to the Translation-Project's "default" LSP-Contractor, based on the results of the Auto-Analysis process
                      (Runs 24/7)
                </Switch.Description>
              </div>
              <Switch
                checked={allowMentions}
                onChange={setAllowMentions}
                className={classNames(
                  allowMentions ? 'bg-blue-500' : 'bg-gray-200',
                  'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    allowMentions ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>
            <Switch.Group as="li" className="py-4 flex items-center justify-between">
              <div className="flex flex-col">
                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                  Auto Delete
                </Switch.Label>
                <Switch.Description className="text-sm text-gray-500">
                      Deletes the Pages that were previously identified as qualified for deletion. 
                      Runs once daily (currently scheduled for 10:00 PM EST)
                </Switch.Description>
              </div>
              <Switch
                checked={allowMentions}
                onChange={setAllowMentions}
                className={classNames(
                  allowMentions ? 'bg-blue-500' : 'bg-gray-200',
                  'ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    allowMentions ? 'translate-x-5' : 'translate-x-0',
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
            </Switch.Group>
          </ul>
        </div>
        <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
          <button
            type="button"
            className="bg-white border border-gray-300 rounded-md shadow-sm
                         py-2 px-4 inline-flex justify-center text-sm font-medium
                          text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2
                           focus:ring-offset-2 focus:ring-sky-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-5 bg-blue-500 border border-transparent rounded-md shadow-sm
                      py-2 px-4 inline-flex justify-center text-sm font-medium
                    text-white hover:bg-sky-800 focus:outline-none focus:ring-2
                      focus:ring-offset-2 focus:ring-sky-500"
          >
            Save
          </button>
        </div>
      </div>
    )
}

export default AutoJobSettings;