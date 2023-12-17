import * as Endpoints from '../Entities/Endpoint'
import Axios from '../Utils/Axios'

const API = Axios.getInstance;

export const getOnBoardUsers = () =>
    API(Endpoints.API_ENDPOINT)
        .get(Endpoints.GET_ON_BOARD_USERS)
        .then(response => response)
        .catch(err => ({ err }))