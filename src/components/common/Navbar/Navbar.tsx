import React from "react";

import { DropdownArrowIcon, SearchIcon } from "icons";
import Avatar from "assets/images/avatar.png";

import "./style.sass";

const Navbar = () => (
    <div className="navbar">
        <div className="container">
            <p className="navbar__date">Среда, 13 окт</p>
            <div className="navbar--info">
                <p className="navbar--info__value">Новые звонки <span>20 из 30 шт</span></p>
                <div className="navbar--info__progress">
                    <div style={{width: "35%"}}/>
                </div>
            </div>
            <div className="navbar--info is-yellow">
                <p className="navbar--info__value">Качество разговоров <span>40%</span></p>
                <div className="navbar--info__progress">
                    <div style={{width: "30%"}}/>
                </div>
            </div>
            <div className="navbar--info is-red">
                <p className="navbar--info__value">Конверсия в заказ <span>67%</span></p>
                <div className="navbar--info__progress">
                    <div style={{width: "50%"}}/>
                </div>
            </div>
            <div className="navbar-content">
                <div className="navbar-content__search">
                    <SearchIcon/>
                </div>
                <div className="navbar-content--company">
                    <p className="navbar-content--company__name">ИП Сидорова Александра Михайловна</p>
                    <DropdownArrowIcon/>
                </div>
                <div className="navbar-content--user">
                    <img src={Avatar} alt="avatar" className="navbar-content--user__avatar" />
                    <DropdownArrowIcon/>
                </div>
            </div>
        </div>
    </div>
)

export { Navbar }