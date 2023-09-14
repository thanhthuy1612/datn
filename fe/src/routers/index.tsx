import Home from "../pages/Home";
import { IRouter } from "../interfaces/IRouter";

const publicRoutes: IRouter[] = [{ id: 1, path: "/", component: Home }];

const privateRoutes: IRouter[] = [];

export { publicRoutes, privateRoutes };
