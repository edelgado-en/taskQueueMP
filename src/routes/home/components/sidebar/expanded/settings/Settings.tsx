

import { useAppSelector, useAppDispatch } from "../../../../../../app/hooks";

import { selectRelativeTime, handleRelativeTimeChange,
    selectCompactRows, handleFatRowChange,
    selectIncludeUrls, handleIncludeUrlsChange,
    selectIncludeFiles, handleIncludeFilesChange } from './settingsSlice';  

import SwitchButton from "../../../../../../components/button/SwitchButton";


const Settings = () => {
    const dispatch = useAppDispatch();
    const relativeTime = useAppSelector(selectRelativeTime);
    const compactRows = useAppSelector(selectCompactRows);
    const includeUrls = useAppSelector(selectIncludeUrls);
    const includeFiles = useAppSelector(selectIncludeFiles);

    const handleTimeChange = () => {
        dispatch(handleRelativeTimeChange(!relativeTime));
    }

    const handleCompactRowChange = () => {
        dispatch(handleFatRowChange(!compactRows));
    }

    const handleUrlChange = () => {
        dispatch(handleIncludeUrlsChange(!includeUrls));
    }

    const handleFileChange = () => {
        dispatch(handleIncludeFilesChange(!includeFiles));
    }

    return (
        <div className= "space-y-8 divide-y divide-gray-300 sm:space-y-5 mt-5 pl-3">
            <div>
                <div className="uppercase mb-5 tracking-wide text-xs">Time</div>
                <SwitchButton 
                    checkedValue={relativeTime}
                    label={'Relative time'}
                    handleOnChange={handleTimeChange} />
            </div>
            <div>
                <div className="uppercase mb-5 tracking-wide text-xs mt-5">density</div>
                <SwitchButton 
                    checkedValue={compactRows}
                    label={'Compact rows'}
                    handleOnChange={handleCompactRowChange} />
            </div>
            <div>
                <div className="uppercase mb-5 tracking-wide text-xs mt-5">columns</div>
                <SwitchButton 
                    checkedValue={includeUrls}
                    label={'Include urls'}
                    handleOnChange={handleUrlChange} />
                <br />
                <SwitchButton 
                    checkedValue={includeFiles}
                    label={'Include files'}
                    handleOnChange={handleFileChange} />
            </div>
            
                {/* TODO: Add another setting to keep the sidebar open on page load */}
        </div>
    )
}

export default Settings;