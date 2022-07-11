

import { useState } from 'react';
import { Switch } from '@headlessui/react';

const JobSetting = ({ title, description, checkedValue, handleOnChange } : any) => {
  return (
    <Switch.Group as="li" className="py-4 flex items-center justify-between">
      <div className="flex flex-col">
        <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
          {title}
        </Switch.Label>
        <Switch.Description className="text-sm text-gray-500">
          {description}
        </Switch.Description>
      </div>
      <Switch
        checked={checkedValue}
        onChange={handleOnChange}
        className={`${checkedValue ? 'bg-blue-500' : 'bg-gray-200'}
                    ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2
                    border-transparent rounded-full cursor-pointer transition-colors
                    ease-in-out duration-200 focus:outline-none focus:ring-2
                    focus:ring-offset-2 focus:ring-sky-500`}
      >
        <span
          aria-hidden="true"
          className={`${checkedValue ? 'translate-x-5' : 'translate-x-0'}
                      inline-block h-5 w-5 rounded-full bg-white shadow
                      transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </Switch.Group> 
  )
}

const AutoJobSettings = () => {
    const [projectStatistics, setProjectStatistics] = useState(true)
    const [activityStatistics, setActivityStatistics] = useState(false)
    const [autoParse, setAutoParse] = useState(true)
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
            <JobSetting 
                title={'Project Statistics'}
                description={`Calculates multiple Translation-Project specific statistics,
                              which are displayed in the Translation-Project-Manager (TPM) page.`}
                checkedValue={projectStatistics}
                handleOnChange={() => setProjectStatistics(!projectStatistics)}
            />

            <JobSetting 
                title={'Activity Statistics'}
                description={` Calculates Daily statistics based on the Status-Activity records for each Translation-Project. Runs once daily.
                               (Currently scheduled for 4:00 AM EST)`}
                checkedValue={activityStatistics}
                handleOnChange={() => setActivityStatistics(!activityStatistics)}
            />

            <JobSetting 
                title={'Auto-Parse'}
                description={`Parses newly created Pages, and updates Page's translation-status and statistics 
                              (Runs 24/7)`}
                checkedValue={autoParse}
                handleOnChange={() => setAutoParse(!autoParse)}
            />
            
            <JobSetting 
                title={'Auto-Parse (On-hold)'}
                description={` Runs multiple times per day (currently schedules for 3 times a day).
                            Auto-Flag for Deletion identifies pages qualified for deletion, based on rules provided by the Business.
                            Runs multiple times per day (currently scheduled to run twice a day)`}
                checkedValue={false}
                handleOnChange={() => setAllowMentions(!false)}
            />

            <JobSetting 
                title={'Auto Analysis'}
                description={` Analyzes the content of Pages processed by the Auto-Parse,
                               and determines if they are qualified for Translation's Auto-Assignment. (Runs 24/7)`}
                checkedValue={allowMentions}
                handleOnChange={() => setAllowMentions(!allowMentions)}
            />

            <JobSetting 
                title={' Auto Assign'}
                description={`Assigns Pages to the Translation-Project's "default" LSP-Contractor,
                 based on the results of the Auto-Analysis process. (Runs 24/7)`}
                checkedValue={allowMentions}
                handleOnChange={() => setAllowMentions(!allowMentions)}
            />

            <JobSetting 
                title={' Auto Delete'}
                description={`Deletes the Pages that were previously identified as qualified for deletion. 
                Runs once daily (currently scheduled for 10:00 PM EST)`}
                checkedValue={allowMentions}
                handleOnChange={() => setAllowMentions(!allowMentions)}
            />
          
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