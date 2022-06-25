import React from "react";

import { CallModel } from "store/types/call";
import { CallArrowIcon, CheckboxIcon } from "icons";

import "./style.sass"
import { format } from "date-fns";

type Props = {
    item: CallModel
}

const CallItem = ({
    item
}: Props) => {
    
    const getTypeArrow = () => {
        if (typeof item.in_out !== "number") {
            return (
                <div className="call-item-cell is-empty">
                    <CallArrowIcon/>
                </div>
            )
        }
        if (!item.in_out) {
            return (
                <div className="call-item-cell is-outgoing">
                    <CallArrowIcon/>
                </div>
            )
        }
        return (
            <div className="call-item-cell is-incoming">
                <CallArrowIcon/>
            </div>
        )
    }

    const getStartTime = () => format(new Date(item.date), "HH:mm");

    const formatPhoneNumber = (value: string) => `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-**`

    const getOpponentPhone = () => {
        if (typeof item.in_out === "number" && item.in_out) {
            return formatPhoneNumber(item.from_number);
        }
        return formatPhoneNumber(item.to_number);
    }

    const typeArrow = getTypeArrow();
    const startTime = getStartTime();
    const phoneNumber = getOpponentPhone();

    return (
        <div className="call-item">
            <div className="call-item-cell">
                <button
                    type="button"
                    className="is-checkbox">
                        <CheckboxIcon/>
                </button>
            </div>
            <div className="call-item-cell">
                {typeArrow}
            </div>
            <div className="call-item-cell">
                {startTime}
            </div>
            <div className="call-item-cell">
                <img src={item.person_avatar} alt="avatar"  style={{borderRadius: "50%"}}/>
            </div>
            <div className="call-item-cell">
                {phoneNumber}
            </div>
            <div className="call-item-cell">
                {item.source}
            </div>
        </div>
    )
}

export { CallItem }