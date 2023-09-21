import Home from "../pages/home";
import { IRouter } from "../interfaces/IRouter";
import SettingLayout from "../layouts/SettingLayout";
import Profile from "../pages/setting/Profile";
import Collection from "../pages/setting/Collection";
import Notification from "../pages/setting/Notification";
import Client from "../pages/setting/Client";
import Pesonal from "../pages/profile";

const publicRoutes: IRouter[] = [
  { id: 1, path: "/", component: Home },
  { id: 2, path: "/setting", component: Profile, layout: SettingLayout },
  { id: 3, path: "/collection", component: Collection, layout: SettingLayout },
  {
    id: 4,
    path: "/notification",
    component: Notification,
    layout: SettingLayout,
  },
  { id: 5, path: "/client", component: Client, layout: SettingLayout },
  { id: 6, path: "/personal", component: Pesonal },
];

const privateRoutes: IRouter[] = [];

export { publicRoutes, privateRoutes };
