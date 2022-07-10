
import Pagination from "react-js-pagination";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Select from 'react-select';
import { STANDARD_DROPDOWN_STYLES, PAGE_SIZE_OPTIONS } from "../../constants";
import { 
    selectLoading,
    selectTotalTasks,
    selectActivePage,
    selectPageSize,
    setPageSize,
    setActivePage,
    fetchTasks
} from "../../routes/home/components/tasks/tasksSlice";

const PaginationContainer = () => {
    const loading = useAppSelector(selectLoading);
    const activePage = useAppSelector(selectActivePage);
    const totalTasks = useAppSelector(selectTotalTasks);
    const pageSize = useAppSelector(selectPageSize);

    const dispatch = useAppDispatch();

    const handlePageChange = (page) => {
        dispatch(setActivePage(page));

        dispatch(fetchTasks())
    }

    const handlePageSizeChange = (size) => {
        dispatch(setPageSize(size));

        dispatch(fetchTasks())
    }

    return (
        <>
            { loading || totalTasks < pageSize.value ? 
                <div></div>
            : (
                <div className="bg-white p-4 sm:px-6 border-2 border-gray-150 rounded mt-6">
                    <div className="flex justify-end">
                        <div className="w-28">
                            <Select 
                                maxMenuHeight={160}
                                styles={STANDARD_DROPDOWN_STYLES}
                                menuPlacement={'top'}
                                value={pageSize}
                                onChange={handlePageSizeChange}
                                options={PAGE_SIZE_OPTIONS}
                            />
                        </div>
                        <div className="mr-10 mt-1">
                            <Pagination
                                innerClass="pagination pagination-custom"
                                activePage={activePage}
                                hideDisabled
                                itemClass="page-item page-item-custom"
                                linkClass="page-link page-link-custom"
                                itemsCountPerPage={pageSize.value}
                                totalItemsCount={totalTasks}
                                pageRangeDisplayed={4}
                                onChange={handlePageChange}
                                />
                        </div>
                    
                    </div>
                </div>
            )}
        </>
    )
}

export default PaginationContainer;