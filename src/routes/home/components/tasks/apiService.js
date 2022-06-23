import httpService from '../../../../services/httpService';

export const fetchTasks = (request) => {
    return httpService.post(`/tasks/filters?page=${request.activePage - 1}&size=${request.pageSize}&sort=id,asc`, request);
} 