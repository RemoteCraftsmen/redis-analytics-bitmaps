import globalAxios from 'axios';
import config from '@/config';

const { apiUrl } = config;

const axios = globalAxios.create({
    baseURL: apiUrl
});

export default axios;
