import React, { useState } from "react";
import { format } from "date-fns";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { CSSTransition } from 'react-transition-group';

import { CallModel } from "store/types/call";
import { getCallRecord } from "store/actions";
import { AudioPlayer } from "components/common/AudioPlayer";
import { CallArrowIcon, CheckboxIcon } from "icons";

import "./style.sass"

type Props = {
    item: CallModel
}

const CallItem = ({
    item
}: Props) => {

    const dispatch = useDispatch();

    const [isAudioPlayer, setIsAudioPlayer] = useState<boolean>(false)
    
    const getTypeArrow = () => {
        if (typeof item.in_out !== "number") {
            return (
                <div className="call-item-cell"/>
            );
        }
        return (
            <div className={clsx("call-item-cell is-arrow", item.in_out && "is-incoming" || "is-outgoing", item.status.toLowerCase() === "дозвонился" && "is-good" || "is-not-good")}>
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

    const handleCallHover = () => {
        if (item.record && item.partnership_id) {
            // @ts-ignore
            dispatch(getCallRecord(item.record, item.partnership_id))
            setIsAudioPlayer(true)
        }
    }

    const handleClose = () => {
        setIsAudioPlayer(false)
    }

    const typeArrow = getTypeArrow();
    const startTime = getStartTime();
    const phoneNumber = getPhoneNumber();
    const duration = getDuration();

    return (
        <div 
            className="call-item"
            onMouseEnter={handleCallHover}
            onMouseLeave={handleClose}>
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
                <CSSTransition
                    in={isAudioPlayer}
                    timeout={200}
                    classNames={{
                        appear: 'audio-player appear',
                        appearActive: 'audio-player appear-active',
                        appearDone: 'audio-player appear-done',
                        enter: 'audio-player enter',
                        enterActive: 'audio-player enter-active',
                        enterDone: 'audio-player enter-done',
                        exit: 'audio-player exit',
                        exitActive: 'audio-player exit-active',
                        exitDone: 'audio-player exit-done',
                    }}
                    unmountOnExit
                    >
                        <div 
                            className="audio-player">
                            <AudioPlayer
                                handleClose={handleClose}
                                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"/>
                        </div>
                </CSSTransition>
                <span className="is-duration">{duration}</span>
            </div>
        </div>
    )
}

export { CallItem }