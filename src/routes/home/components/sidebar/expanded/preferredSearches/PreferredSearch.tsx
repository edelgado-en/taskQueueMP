
import { useState } from 'react';
import { TrashIcon, ZoomInIcon } from "@heroicons/react/outline";

import Select from "react-select";
import { STANDARD_DROPDOWN_STYLES } from "../../../../../../constants";

const options = [
    { value: 1, label: "Me" },
    { value: 2, label: "Super Alejandro" },
    { value: 3, label: "Rebeca Castillo" },
    { value: 4, label: "Sandra Manager" },
];

const searches = [
    { id: 1, name: 'Search Large Handling Flag', color: 'bg-rose-100' },
    { id: 2, name: 'Test Project Code', color: 'bg-purple-100'  },
    { id: 3, name: 'Scheduled by me', color: 'bg-indigo-100'  },
    { id: 4, name: 'JS test', color: 'bg-sky-100'  },
    { id: 5, name: 'Nalco only + Edition Later', color: 'bg-teal-100'  },
]

const PreferredSearch = () => {
    const [selectedOption, setSelectedOption] = useState<any>(options[0])

    const handleChange = (selectedOption: any) => {
        setSelectedOption(selectedOption);
    }

    return (
        <div className="h-full">
            <label className="block text-xs font-medium text-gray-700 mb-1">
            Owners
            </label>
            <Select
            maxMenuHeight={850}
            styles={STANDARD_DROPDOWN_STYLES}
            defaultValue={selectedOption}
            onChange={(option) => handleChange(option)}
            options={options}
            />
  
            <nav className="h-full py-7">
                <ul role="list" className="relative z-0 divide-y divide-gray-200">
                    {searches.map((search) => (
                        <li key={search.id} className={`bg-white ${search.color} my-2`}>
                            <div className="relative px-3 py-6 flex items-center space-x-3 hover:bg-gray-50
                                            focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                                <div className="basis-[70%] min-w-0">
                                    <a href="#" className="focus:outline-none">
                                        <span className="absolute inset-0" />
                                        <p className="text-xs font-medium text-gray-900">{search.name}</p>
                                        {/* <p className="text-xs text-gray-500 truncate">{search.name}</p> */}
                                    </a>
                                </div>
                                <div className="basis-[30%] text-right">
                                    <div className="text-xs">
                                        <ZoomInIcon className="inline-flex h-4 w-4 text-blue-500" />
                                        <TrashIcon className="inline-flex h-4 w-4 text-gray-500 ml-3" />
                                    </div>
                                
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="py-16"></div>
            </nav>
      </div>
    )
}

export default PreferredSearch;