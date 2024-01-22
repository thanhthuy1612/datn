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
import DeleteNFT from "../components/NFT/Delete";
import ExpiredNFT from "../components/NFT/Expired";
import MyListNFT from "../components/NFT/My";
import Ship from "../components/NFT/Ship";
import DoingShip from "../components/NFT/DoingShip";
import View from "../components/NFT/View";
import Accept from "../components/NFT/Accept";
import DoneSell from "../components/NFT/DoneSell";
import ShareNFT from "../components/NFT/Share";
import ViewId from "../components/NFT/ViewId";

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
  { id: 11, path: "/nft/sell", component: ResellNFT },
  { id: 12, path: "/nft/expired", component: ExpiredNFT },
  { id: 13, path: "/nft/delete", component: DeleteNFT },
  { id: 14, path: "/nft/my", component: MyListNFT },
  { id: 15, path: "/cart", component: Cart },
  { id: 16, path: "/search", component: AccountSearch },
  { id: 17, path: "/nft/ship", component: Ship },
  { id: 18, path: "/nft/doing-ship", component: DoingShip },
  { id: 18, path: "/nft/view", component: View },
  { id: 19, path: "/nft/accept", component: Accept },
  { id: 20, path: "/nft/done", component: DoneSell },
  { id: 21, path: "/nft/share", component: ShareNFT },
  { id: 22, path: "/nft/view-id", component: ViewId },
];

const privateRoutes: IRouter[] = [];

export { publicRoutes, privateRoutes };
