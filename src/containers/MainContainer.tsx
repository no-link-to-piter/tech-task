import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, sub } from "date-fns";

import { Filters } from "components/Filters";
import { Sorters } from "components/Sorters";
import { RootState } from "store/reducers";
import { getCallList } from "store/actions";
import { FilterDates } from "consts";
import { CallParamsModel } from "store/types/call";
import { CallList } from "components/CallList";

const MainContainer = () => {

    const dispatch = useDispatch();

    const { callList } = useSelector((state: RootState) => state.call);

    const [filters, setFilters] = useState<CallParamsModel>({
        date_start: "2022-06-22",
        date_end: "2022-06-25",
    })

    const [isDateDrodown, setIsDateDropdown] = useState<boolean>(false);
    const [dateType, setDateType] = useState<string>(FilterDates.DAYS);

    const dateDropdownRef = useRef<HTMLDivElement | null>(null);

    const setDateRange = (value: string) => {
        setDateType(value);
        setIsDateDropdown(false)
        switch(value) {
            case FilterDates.DAYS:
                setFilters({
                    ...filters,
                    date_end: format(new Date(), "yyyy-MM-dd"),
                    date_start: format(sub(new Date(), { days: 3 }), "yyyy-MM-dd")
                })
                break;
            case FilterDates.WEEK:
                setFilters({
                    ...filters,
                    date_end: format(new Date(), "yyyy-MM-dd"),
                    date_start: format(sub(new Date(), { weeks: 1 }), "yyyy-MM-dd")
                })
                break;
            case FilterDates.MONTH:
                setFilters({
                    ...filters,
                    date_end: format(new Date(), "yyyy-MM-dd"),
                    date_start: format(sub(new Date(), { months: 1 }), "yyyy-MM-dd")
                })
                break;
            case FilterDates.YEAR:
                setFilters({
                    ...filters,
                    date_end: format(new Date(), "yyyy-MM-dd"),
                    date_start: format(sub(new Date(), { years: 1 }), "yyyy-MM-dd")
                })
                break;
            default: 
                break;
        }
    }
    
    /* eslint-disable */
    useEffect(() => {
        // @ts-ignore
        dispatch(getCallList(filters))
    }, [filters])

    useEffect(() => {
        
        const handleClickOutsideDropdown = (event: MouseEvent) => {
            if (isDateDrodown && dateDropdownRef && !dateDropdownRef.current?.contains(event.target as Node)) {
                setIsDateDropdown(false);
            };
        }
    
        document.addEventListener("mousedown", handleClickOutsideDropdown);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDropdown);
        };
    }, [dispatch, dateDropdownRef, isDateDrodown])

    return (
        <div className="container">
            <Filters
                dateType={dateType}
                isDateDropdown={isDateDrodown}
                setIsDateDropdown={setIsDateDropdown}
                dateDropdownRef={dateDropdownRef}
                setDateRange={setDateRange}/>
            <Sorters/>
            <CallList
                callList={callList}/>
        </div>
    )
}

export { MainContainer };