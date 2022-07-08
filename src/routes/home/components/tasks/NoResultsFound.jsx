
import noResults from '../../../../../src/images/noResults.png';

const NoResultsFound = () => {

    const handleResetFilters = () => {
        
    }

    return (
        <div className="text-center pt-64">
             <div className="w-48 h-48 m-auto">
                    <img src={noResults}></img>
                </div>
                <div className="text-xl mt-2">
                    No results found
                </div>

                <div className="mt-4">
                    Try adjusting your search or filter to find what you are looking for.
                    <span onClick={handleResetFilters} className='cursor-pointer text-blue-500 font-medium ml-3'>Clear all  filters</span>
                </div>                
        </div>
    )
}

export default NoResultsFound;