import React from "react";
import { CSSTransition } from 'react-transition-group';

import { CalendarIcon, DropdownArrowIcon, PlusIcon } from "icons";
import { DropdownElement } from "components/common/DropdownElement";
import { FilterDates } from "consts";

import "./style.sass";
import clsx from "clsx";

type Props = {
    dateType: string;
    isDateDropdown: boolean;
    setIsDateDropdown: (value: boolean) => void;
    dateDropdownRef: React.MutableRefObject<HTMLDivElement | null>,
    setDateRange: (value: string) => void;
}

const Filters = ({
    dateType,
    isDateDropdown,
    setIsDateDropdown,
    dateDropdownRef,
    setDateRange
}: Props) => {

    const getDropdownItemContent = (value: string) => {
        switch(value) {
            case FilterDates.DAYS:
                return "3 дня";
            case FilterDates.WEEK:
                return "Неделя";
            case FilterDates.MONTH:
                return "Месяц";
            case FilterDates.YEAR:
                return "Год";
            default: 
                return null;
        }
    }

    const keys = Object.keys(FilterDates);

    const children = keys.map(item => {
        const content = getDropdownItemContent(item);
        if (content) {
            return (
                <button
                    type="button" 
                    key={item}
                    className={clsx("dropdown-element--item", dateType === item && "is-active")}
                    onClick={() => setDateRange(item)}>
                        {content}
                </button>
            )
        }
        return null;
    });

    const text = getDropdownItemContent(dateType);

    return (
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
                <button 
                    type="button"
                    className="filters--calendar__text"
                    onClick={() => setIsDateDropdown(!isDateDropdown)}>
                        <CalendarIcon/>
                        {text}
                </button>
                <button
                    type="button"
                    className="filters--calendar__btn is-next">
                        <DropdownArrowIcon/>
                </button>
                <CSSTransition
                    in={isDateDropdown}
                    timeout={200}
                    classNames={{
                        appear: 'dropdown-element appear',
                        appearActive: 'dropdown-element appear-active',
                        appearDone: 'dropdown-element appear-done',
                        enter: 'dropdown-element enter',
                        enterActive: 'dropdown-element enter-active',
                        enterDone: 'dropdown-element enter-done',
                        exit: 'dropdown-element exit',
                        exitActive: 'dropdown-element exit-active',
                        exitDone: 'dropdown-element exit-done',
                    }}
                    unmountOnExit
                    >
                        <div 
                            className="dropdown-element"
                            ref={dateDropdownRef}>
                            <DropdownElement 
                                children={children}/>
                        </div>
                    </CSSTransition>
            </div>
        </div>
    )
}

export { Filters }