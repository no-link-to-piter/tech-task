import React from "react";
import { CSSTransition } from 'react-transition-group';
import clsx from "clsx";

import { CalendarIcon, DropdownArrowIcon, PlusIcon } from "icons";
import { DropdownElement } from "components/common/DropdownElement";
import { FilterDates } from "consts";

import "./style.sass";

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

    const handlePrevClick = () => {
        const keys = Object.keys(FilterDates);
        const curInd = keys.indexOf(dateType);
        if (curInd > 0) {
            setDateRange(keys[curInd - 1])
        } else {
            setDateRange(keys[keys.length - 2])
        }
    }

    const handleNextClick = () => {
        const keys = Object.keys(FilterDates);
        const curInd = keys.indexOf(dateType);
        if (curInd < keys.length - 2) {
            setDateRange(keys[curInd + 1])
        } else {
            setDateRange(keys[0])
        }
    }

    const children = Object.keys(FilterDates).map(item => {
        const content = getDropdownItemContent(item);
        if (content) {
            return (
                <div
                    role="presentation" 
                    key={item}
                    className={clsx("dropdown-element--item", dateType === item && "is-active")}
                    onClick={() => setDateRange(item)}>
                        {content}
                </div>
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
                    className="filters--calendar__btn is-prev"
                    onClick={handlePrevClick}>
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
                    className="filters--calendar__btn is-next"
                    onClick={handleNextClick}>
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