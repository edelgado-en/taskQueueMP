import httpService from '../../../../services/httpService';

export const fetchTasks = (requestObject) => {
    return httpService.post('/tasks/filters?page=0&size=200&sort=id,asc', requestObject);
} 