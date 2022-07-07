import httpService from '../../../../services/httpService';

//TODO: Once you build the new backend for this screen, you can convert this file to ts. The type will be inferred from the called of fetchTasks
export const fetchTasks = (request) => {
    return httpService.post(`/tasks/v2/search?page=${request.activePage}&size=${request.pageSize}&sort=id,asc`, request);
} 