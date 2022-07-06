
import { Switch } from '@headlessui/react'

interface IProps {
    checkedValue: boolean;
    label: string;
    handleOnChange: () => void;
}

const ToggleButton = ({checkedValue, label, handleOnChange} :IProps) => {

    return (
        <Switch.Group as="div" className="flex items-center">
            <Switch
                checked={checkedValue}
                onChange={handleOnChange}
                className={`${checkedValue ? 'bg-blue-600' : 'bg-gray-200'}
                relative inline-flex flex-shrink-0 h-4 w-8
                border-2 border-transparent rounded-full cursor-pointer
                transition-colors ease-in-out duration-200 focus:outline-none
                focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
                <span
                    aria-hidden="true"
                    className={`${checkedValue ? 'translate-x-4' : 'translated-x-0'}
                    pointer-events-none inline-block h-3 w-3 rounded-full
                    bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
            </Switch>
            <Switch.Label as="span" className="ml-3 cursor-pointer">
                <span className="text-sm text-gray-900">{label}</span>
            </Switch.Label>
        </Switch.Group>
    )
}

export default ToggleButton;