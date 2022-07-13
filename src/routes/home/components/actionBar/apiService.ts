import httpService from "../../../../services/httpService";

export const updateTaskStatistics = (requestBody: { pageId: number; queueMode: string; } []) => {
    return httpService.post('/statistics/pagestatuses', requestBody);
}