import httpService from "../../../../services/httpService";

export const updateTaskStatistics = (requestBody: {
    pageId: number;
    queueMode: string;
} []) => {
    return httpService.post('/statistics/pagestatuses', requestBody);
}

export const deleteTasks = (requestBody: { 
    filters: {
        field: string;
        fieldValueRelationship: string;
        value: string; 
    } []
}) => {
    return httpService.post('/tasks/delete', requestBody);
}

export const assignContractor = (requestBody: {
    contractor: { id: number; companyName: string | null };
    priority: number | null;
    tasks: { id: number }[];
}) => {
    return httpService.post('/tasks/assigncontractor', requestBody);
}