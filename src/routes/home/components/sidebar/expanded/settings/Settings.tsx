
import { Switch } from '@headlessui/react'

import { useAppSelector, useAppDispatch } from "../../../../../../app/hooks";

import { selectRelativeTime, handleRelativeTimeChange,
    selectCompactRows, handleFatRowChange } from './settingsSlice';  

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const Settings = () => {
    const dispatch = useAppDispatch();
    const relativeTime = useAppSelector(selectRelativeTime);
    const compactRows = useAppSelector(selectCompactRows);

    const handleTimeChange = () => {
        dispatch(handleRelativeTimeChange(!relativeTime));
    }

    const handleCompactRowChange = () => {
        dispatch(handleFatRowChange(!compactRows));
    }

    return (
        <div className= "space-y-8 divide-y divide-gray-300 sm:space-y-5 mt-5 pl-3">
            <div>
                <div className="uppercase mb-5 tracking-wide text-sm">Time</div>
                <Switch.Group as="div" className="flex items-center">
                    <Switch
                        checked={relativeTime}
                        onChange={handleTimeChange}
                        className={classNames(
                            relativeTime ? 'bg-blue-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        )}
                    >
                        <span
                        aria-hidden="true"
                        className={classNames(
                            relativeTime ? 'translate-x-4' : 'translate-x-0',
                            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                        />
                    </Switch>
                    <Switch.Label as="span" className="ml-3 cursor-pointer">
                        <span className="text-sm text-gray-900">Relative time</span>
                        <span className="text-sm text-gray-500 ml-1">(22s, 5m)</span>
                    </Switch.Label>
                </Switch.Group>
            </div>

            <div>
                <div className="uppercase mb-5 tracking-wide text-sm mt-5">density</div>
                <Switch.Group as="div" className="flex items-center">
                    <Switch
                        checked={compactRows}
                        onChange={handleCompactRowChange}
                        className={classNames(
                            compactRows ? 'bg-blue-600' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-5 w-9 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        )}
                    >
                        <span
                        aria-hidden="true"
                        className={classNames(
                            compactRows ? 'translate-x-4' : 'translate-x-0',
                            'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                        />
                    </Switch>
                    <Switch.Label as="span" className="ml-3 cursor-pointer">
                        <span className="text-sm text-gray-900">Compact rows</span>
                    </Switch.Label>
                </Switch.Group>
            </div>
        </div>
    )
}

export default Settings;