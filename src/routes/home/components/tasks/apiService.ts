import httpService from '../../../../services/httpService';

//TODO: Once you finish building the new backend for this screen,
// you canadd an interface for request.
//The requestObject will keep changing until we finish the endpoint search resource.
export const fetchTasks = (request: any) => {
    return httpService.post(`/tasks/v2/search?page=${request.activePage}&size=${request.pageSize}&sort=id,asc`, request);
} 