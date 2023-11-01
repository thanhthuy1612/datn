import Home from "../pages/home";
import { IRouter } from "../interfaces/IRouter";
import SettingLayout from "../layouts/SettingLayout";
import Profile from "../pages/setting/Profile";
import Collection from "../pages/setting/Collection";
import Notification from "../pages/setting/Notification";
import Client from "../pages/setting/Client";
import Pesonal from "../pages/profile";
import History from "../pages/history";
import MyNFT from "../pages/listNFT";
import CreateNFT from "../pages/CreateNFT";
import BuyNFT from "../components/NFT/Buy";
import ResellNFT from "../components/NFT/Resell";
import Cart from "../pages/cart";
import AccountSearch from "../pages/accountSearch";
import Expired from "../components/NFT/Expired";

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
  { id: 7, path: "/history", component: History },
  { id: 8, path: "/myNFT", component: MyNFT },
  { id: 9, path: "/createNFT", component: CreateNFT },
  { id: 10, path: "/nft/buy", component: BuyNFT },
  { id: 11, path: "/personal/nft/buy", component: BuyNFT },
  { id: 12, path: "/nft/resell", component: ResellNFT },
  { id: 13, path: "/personal/nft/resell", component: ResellNFT },
  { id: 14, path: "/myNFT/nft/resell", component: ResellNFT },
  { id: 15, path: "/myNFT/nft/buy", component: BuyNFT },
  { id: 16, path: "/myNFT/nft/expired", component: Expired },
  { id: 17, path: "/nft/expired", component: Expired },
  { id: 18, path: "/personal/nft/expired", component: Expired },
  { id: 19, path: "/cart", component: Cart },
  { id: 20, path: "/search", component: AccountSearch },
];

const privateRoutes: IRouter[] = [];

export { publicRoutes, privateRoutes };
