import LottieHome from "../Lottie/LottieHome/LottieHome";
import HomeImage from "../Lottie/LottieHome/system-regular-41-home(svg).svg";

import LottieCategory from "../Lottie/LottieCategory/LottieCategory";
import CategoryImage from "../Lottie/LottieCategory/category(svg).svg";

export const NavContent = [
  {
    id: 1,
    name: "DashBoard",
    path: "/",
    Icon: LottieHome,
    image: HomeImage,
  },
  {
    id: 2,
    name: "Products",
    path: "/products",
    Icon: LottieCategory,
    image: CategoryImage,
  },
];
