import React from "react";

import { CallItem } from "components/CallItem";
import { CallResponseModel } from "store/types/call";
import { CheckboxIcon } from "icons";

import "./style.sass";

type Props = {
    callList: CallResponseModel | null
}

const CallList = ({
    callList
}: Props) => {

    const children = callList && callList.results.length && callList.results.map(item => (
        <CallItem
            key={item.id}
            item={item}/>
    )) || null;

    return (
        <div className="call-list">
            <div className="call-list-header">
                <div className="call-list-header--cell">
                    <button
                        type="button"
                        className="is-checkbox">
                            <CheckboxIcon/>
                    </button>
                </div>
                <div className="call-list-header--cell">
                    <span>Тип</span>
                </div>
                <div className="call-list-header--cell">
                    <span>Время</span>
                </div>
                <div className="call-list-header--cell">
                    <span>Сотрудник</span>
                </div>
                <div className="call-list-header--cell">
                    <span>Звонок</span>
                </div>
                <div className="call-list-header--cell">
                    <span>Источник</span>
                </div>
                <div className="call-list-header--cell">
                    <span>Оценка</span>
                </div>
                <div className="call-list-header--cell is-align-end">
                    <span>Длительность</span>
                </div>
            </div>
            {children}
        </div>
    )
}

export { CallList };