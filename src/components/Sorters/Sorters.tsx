import React, { useState } from "react";

import { CloseIcon, DropdownArrowIcon, SearchIcon } from "icons";
import { SortTypes } from "consts";

import "./style.sass";
import clsx from "clsx";

const Sorters = () => {

    const [searchValue, setSearchValue] = useState<string>("");
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const getSorterText = (value: string) => {
        switch(value) {
            case SortTypes.ALL_TYPES:
                return "Все типы";
            case SortTypes.ALL_WORKERS:
                return "Все сотрудники";
            case SortTypes.ALL_CALLS:
                return "Все звонки";
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

    const keys = Object.keys(SortTypes);

    const children = keys.map(item => {
        const text = getSorterText(item);
        return (
            <button 
                type="button"
                className="sorters--content__btn">
                    {text}
                    <DropdownArrowIcon/>
            </button>
        )
    })

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