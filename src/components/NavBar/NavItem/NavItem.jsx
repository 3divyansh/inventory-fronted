import React, { useState } from "react";
import "./NavItem.css";
import LottieHome from "../../Lottie/LottieHome/LottieHome";
import { NavLink } from "react-router-dom";

function NavItem({ name, Icon, path, image, handleNav }) {
  const [isplay, setIsPlay] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const iconStyle =
    "xl:w-[25px] xl:h-[25px] md:w-[22px] md:h-[22x] w-[25px] h-[25px]";

  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        setIsPlay(isActive);
      }}
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      onClick={() => {
        handleNav();
      }}
    >
      <div className="item_wraper xl-p-[1.5rem] md:p-[1rems] p-[1.5rem] flex items-center cursor-pointer">
        <div className="nav_item_icon">
          {!(isplay || isHover) ? (
            <img className={iconStyle} src={image} />
          ) : (
            <Icon
              isplay={isplay}
              isHover={isHover}
              style={{}}
              className={
                "xl:w-[25px] xl:h-[25px] md:w-[22px] md:h-[22x] w-[25px] h-[25px]"
              }
            />
          )}
        </div>
        <div
          className={
            "nav_item hover:underline xl:font-semibold md:font-semibold font-semibold tracking-normal transition-all ease-linear duration-300 " +
            (isplay || isHover ? "text-appColor-light" : "text-appColor-dark")
          }
        >
          {name}
        </div>
      </div>
    </NavLink>
  );
}

export default NavItem;
