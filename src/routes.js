import { main } from './index.jsx';
import modal from "./modal.jsx";

export const REQUEST_TYPE = {
    POST: "post",
    GET: "get",
    DELETE: "delete",
    UPDATE: "update"
}

export const routes = [
    {
        route: "/",
        callback: main,
    },
];

export const apiRoutes = [
    {
        type: REQUEST_TYPE.GET,
        route: "/modal/podcast",
        callback: () => modal.searchModal,
    },
    {
        type: REQUEST_TYPE.DELETE,
        route: "/delete-modal",
        callback: () => {return ;},
    }
];