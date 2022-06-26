import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, sub } from "date-fns";

import { Filters } from "components/Filters";
import { Sorters } from "components/Sorters";
import { RootState } from "store/reducers";
import { getCallList } from "store/actions";
import { FilterCalls, FilterDates } from "consts";
import { CallParamsModel } from "store/types/call";
import { CallList } from "components/CallList";

const MainContainer = () => {

    const dispatch = useDispatch();

    const { callList } = useSelector((state: RootState) => state.call);

    const [filters, setFilters] = useState<CallParamsModel>({
        date_start: format(sub(new Date(), { days: 3 }), "yyyy-MM-dd"),
        date_end: format(new Date(), "yyyy-MM-dd"),
    })

    const [isDateDropdown, setIsDateDropdown] = useState<boolean>(false);
    const [isCallsDropdown, setIsCallsDropdown] = useState<boolean>(false);
    const [dateType, setDateType] = useState<string>(FilterDates.DAYS);

    const dateDropdownRef = useRef<HTMLDivElement | null>(null);
    const callsDropdownRef = useRef<HTMLDivElement | null>(null);

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

    const getCallFilter = () => {
        if (typeof filters.in_out !== "number") {
            return FilterCalls.ALL
        }
        if (filters.in_out) {
            return FilterCalls.INCOMING
        }
        return FilterCalls.OUTGOING
    }

    const setCallFilter = (value: string) => {
        if (value === FilterCalls.ALL) {
            setFilters({
                date_start: filters.date_start,
                date_end: filters.date_end
            })
        }
        if (value === FilterCalls.INCOMING) {
            setFilters({
                ...filters,
                in_out: 1
            })
        }
        if (value === FilterCalls.OUTGOING) {
            setFilters({
                ...filters,
                in_out: 0
            })
        }
    }
    
    /* eslint-disable */
    useEffect(() => {
        // @ts-ignore
        dispatch(getCallList(filters))
    }, [filters])

    useEffect(() => {
        
        const handleClickOutsideDropdown = (event: MouseEvent) => {
            if (isDateDropdown && dateDropdownRef && !dateDropdownRef.current?.contains(event.target as Node)) {
                setIsDateDropdown(false);
            };
            if (isCallsDropdown && callsDropdownRef && !callsDropdownRef.current?.contains(event.target as Node)) {
                setIsCallsDropdown(false);
            };
        }
    
        document.addEventListener("mousedown", handleClickOutsideDropdown);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideDropdown);
        };
    }, [
        dispatch, 
        dateDropdownRef, 
        isDateDropdown,
        callsDropdownRef,
        isCallsDropdown
    ]);

    const callFilter = getCallFilter();

    console.log(isCallsDropdown)

    return (
        <div className="container">
            <Filters
                dateType={dateType}
                isDateDropdown={isDateDropdown}
                setIsDateDropdown={setIsDateDropdown}
                dateDropdownRef={dateDropdownRef}
                setDateRange={setDateRange}/>
            <Sorters
                callsDropdownRef={callsDropdownRef}
                isCallsDropdown={isCallsDropdown}
                callFilter={callFilter}
                setCallFilter={setCallFilter}
                setIsCallsDropdown={setIsCallsDropdown}/>
            <CallList
                callList={callList}/>
        </div>
    )
}

export { MainContainer };