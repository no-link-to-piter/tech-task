import React, { useState } from "react";
import { CSSTransition } from 'react-transition-group';
import clsx from "clsx";

import { DropdownElement } from "components/common/DropdownElement";
import { CloseIcon, DropdownArrowIcon, SearchIcon } from "icons";
import { FilterCalls, SortTypes } from "consts";

import "./style.sass";


type Props = {
    isCallsDropdown: boolean;
    callsDropdownRef: React.MutableRefObject<HTMLDivElement | null>,
    callFilter: string;
    setCallFilter: (value: string) => void;
    setIsCallsDropdown: (value: boolean) => void;
}

const Sorters = ({
    isCallsDropdown,
    callsDropdownRef,
    callFilter,
    setCallFilter,
    setIsCallsDropdown,
}: Props) => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const isActiveDropdown = (value: string) => value === SortTypes.ALL_CALLS && callFilter !== FilterCalls.ALL;

    const getCallFilterText = (value: string) => {
        switch(value) {
            case FilterCalls.ALL:
                return "Все звонки";
            case FilterCalls.INCOMING:
                return "Входящие звонки";
            case FilterCalls.OUTGOING:
                return "Исходящие звонки";
            default:
                return null;

        }
    }

    const getSorterText = (value: string) => {
        switch(value) {
            case SortTypes.ALL_TYPES:
                return "Все типы";
            case SortTypes.ALL_WORKERS:
                return "Все сотрудники";
            case SortTypes.ALL_CALLS:
                return getCallFilterText(callFilter);
            case SortTypes.ALL_SOURCES:
                return "Все источники";
            case SortTypes.ALL_GRADES:
                return "Все оценки";
            case SortTypes.ALL_MISTAKES:
                return "Все ошибки";
            default:
                return null;

        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const handleChange = (e: React.ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        setSearchValue(target.value);
    }

    const handleClear = () => {
        setSearchValue("")
    }

    const callChildren = Object.keys(FilterCalls).map(item => {
        const text = getCallFilterText(item);
        return (
            <div 
                role="presentation"
                key={item}
                onClick={() => setCallFilter(item)}
                className={clsx("dropdown-element--item", item === callFilter && "is-active")}>
                    {text}
            </div>
        )
    })

    const children = Object.keys(SortTypes).map(item => {
        const isCalls = item === SortTypes.ALL_CALLS;
        const text = getSorterText(item);
        const isActive = isActiveDropdown(item);
        return (
            <>
                <button 
                    type="button"
                    key={item}
                    onClick={() => {
                        if (isCalls) {
                            setIsCallsDropdown(!isCallsDropdown)
                        }
                    }}
                    className={clsx("sorters--content__btn", isActive && "is-active")}>
                        {text}
                        <DropdownArrowIcon/>
                        {
                            isCalls
                            &&
                            <CSSTransition
                                in={isCallsDropdown}
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
                                        ref={callsDropdownRef}>
                                        <DropdownElement
                                            children={callChildren}/>
                                    </div>
                            </CSSTransition>
                            ||
                            null
                        }
                </button>
            </>
        )
    });

    return (
        <div className="sorters">
            <form 
                className={clsx("sorters--search", searchValue && "is-active", isFocus && "is-focus")}
                onSubmit={handleSubmit}>
                <SearchIcon/>
                <input 
                    type="text" 
                    name="search"
                    placeholder="Поиск по звонкам"
                    value={searchValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}/>
                <button
                    type="button"
                    onClick={handleClear}
                    className="sorters--search__close">
                        <CloseIcon/>
                </button>
            </form>
            <div className="sorters--content">
                {children}
            </div>
        </div>
    )
}

export { Sorters }