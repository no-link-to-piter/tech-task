import React from "react";
import { format } from "date-fns";
import clsx from "clsx";

import { CallModel } from "store/types/call";
import { CallArrowIcon, CheckboxIcon } from "icons";

import "./style.sass"

type Props = {
    item: CallModel
}

const CallItem = ({
    item
}: Props) => {
    
    const getTypeArrow = () => {
        if (typeof item.in_out !== "number") {
            return (
                <div className="call-item-cell"/>
            );
        }
        const isGood = item.status.toLowerCase() === "дозвонился"
        return (
            <div className={clsx("call-item-cell is-arrow", item.in_out && "is-incoming" || "is-outgoing", isGood && "is-good" || "is-not-good")}>
                <CallArrowIcon/>
            </div>
        )
    }

    const getStartTime = () => format(new Date(item.date), "HH:mm");

    const formatPhoneNumber = (value: string) => `+7 (${value.slice(1, 4)}) ${value.slice(4, 7)}-${value.slice(7, 9)}-**`

    const getPhoneNumber = () => {
        if (typeof item.in_out === "number" && item.in_out) {
            return formatPhoneNumber(item.from_number);
        }
        return formatPhoneNumber(item.to_number);
    }

    const getDuration = () => {
        if (!item.time) {
            return `00:00`;
        }
        const minutes = Math.floor(item.time / 60);
        const seconds = item.time - minutes * 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
    }

    const typeArrow = getTypeArrow();
    const startTime = getStartTime();
    const phoneNumber = getPhoneNumber();
    const duration = getDuration();

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
                { item.person_avatar && <img src={item.person_avatar} alt="avatar" className="call-item-cell__avatar"/> || null }
            </div>
            <div className="call-item-cell">
                {phoneNumber}
            </div>
            <div className="call-item-cell is-source">
                {item.source}
            </div>
            <div className="call-item-cell">
            </div>
            <div className="call-item-cell">
                {duration}
            </div>
        </div>
    )
}

export { CallItem }