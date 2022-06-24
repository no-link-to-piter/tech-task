import React from "react";

import { CalendarIcon, DropdownArrowIcon, PlusIcon } from "icons";

import "./style.sass";

const Filters = () => (
    <div className="filters">
        <div className="filters--balance">
            <p className="filters--balance__text">Баланс: <span>272 ₽</span></p>
            <button
                type="button"
                className="filters--balance__btn">
                    <PlusIcon/>
            </button>
        </div>
        <div className="filters--calendar">
            <button
                type="button"
                className="filters--calendar__btn is-prev">
                    <DropdownArrowIcon/>
            </button>
            <p className="filters--calendar__text">
                <CalendarIcon/>
                3 дня
            </p>
            <button
                type="button"
                className="filters--calendar__btn is-next">
                    <DropdownArrowIcon/>
            </button>
        </div>
    </div>
)

export { Filters }