import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Select from "react-select";
import { STANDARD_DROPDOWN_STYLES } from "../../../../../../constants";
import { DropdownOption } from '../search/searchSlice';

const stats = [
  {
    name: "Total",
    stat: "71,897",
    previousStat: "70,946",
    change: "",
    changeType: "",
  },
  {
    name: "Past Due",
    stat: "25,567",
    previousStat: "56.14%",
    change: "2.02%",
    changeType: "decrease",
  },
  {
    name: "Due Today",
    stat: "18,000",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "decrease",
  },
  {
    name: "Due Tomorrow",
    stat: "9,789",
    previousStat: "28.62%",
    change: "4.05%",
    changeType: "increase",
  },
];

enum ChangeType {
  Increase = 'increase',
  Decrease = 'decrease'
}

//TODO: This must be get from the backend on intiial render because some database have different contractors. Create a new 
//endpoiint to fetch form related values, not just this list.
const options = [
  { value: 1, label: "ProTranslating" },
  { value: 2, label: "MLG International" },
];

interface WordStat {
  label: string;
  stat: number;
}

const WordStatRow = ({ label, stat }: WordStat) => {
  return (
    <tr>
            <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-500">
              {label}
            </td>
            <td className="whitespace-nowrap px-3 py-2 text-xs text-gray-500">
              {stat.toLocaleString('en-US')}
            </td>
          </tr>
  )

}


const LspDashboard = () => {
  //TODO: instead of using any use DropdownOption
  const [selectedOption, setSelectedOption] = useState<any>(options[0]);

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  }


  return (
    <div className="mt-3 overflow-y-auto lg:h-[80%] md:h-[70%] sm:h-[60%]">
      <label className="block text-xs font-medium text-gray-700 mb-1">
        LSP
      </label>
      <Select
        maxMenuHeight={850}
        styles={STANDARD_DROPDOWN_STYLES}
        defaultValue={selectedOption}
        onChange={(option) => handleChange(option)}
        options={options}
      />

      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 divide-x">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-3 cursor-pointer hover:bg-gray-100"
          >
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <div className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-xl font-semibold text-indigo-600">
                {item.stat}
                <span className="ml-2 text-sm text-gray-500">tasks</span>
              </div>

              {item.change.length > 0 && (
                <>
                  <div
                    className={`${item.changeType === ChangeType.Increase ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                               inline-flex items-baseline px-2.5 py-0.5 rounded-full text-xs font-medium md:mt-2 lg:mt-0`}>
                    {item.changeType === ChangeType.Increase ? (
                      <ArrowSmUpIcon
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-4 w-4 text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowSmDownIcon
                        className="-ml-1 mr-0.5 flex-shrink-0 self-center h-4 w-4 text-red-500"
                        aria-hidden="true"
                      />
                    )}

                    <span className="sr-only">
                      {item.changeType === ChangeType.Increase
                        ? "Increased"
                        : "Decreased"}{" "}
                      by
                    </span>
                    {item.change}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </dl>

      <table className="divide-y divide-gray-300 mt-7 w-full text-right">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className=""></th>
            <th
              scope="col"
              className="pr-3 py-1.5 text-xs font-semibold text-gray-900"
            >
              Unique Words
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          <WordStatRow label={'Total'} stat={1345}/>
          <WordStatRow label={'New'} stat={1216}/>
          <WordStatRow label={'Translated'} stat={2390}/>
          <WordStatRow label={'Reviewed'} stat={1115}/>
          <WordStatRow label={'Activated'} stat={1225}/>
        </tbody>
      </table>
      <div className="m-8"></div>
    </div>
  );
}

export default LspDashboard;
