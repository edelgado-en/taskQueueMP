import httpService from '../../../../services/httpService';

//TODO: Once you build the new backend for this screen, you can convert this file to ts. The request will have a different format
export const fetchTasks = (request) => {
    //return httpService.post(`/tasks/filters?page=${request.activePage - 1}&size=${request.pageSize}&sort=id,asc`, request);
    return httpService.post(`/tasks/v2/search?page=${request.activePage}&size=${request.pageSize}&sort=id,asc`, request);
} 