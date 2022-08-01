import httpService from '../../services/httpService';

export const getContractors = () => {
    return httpService.get('/transcontractors');
}