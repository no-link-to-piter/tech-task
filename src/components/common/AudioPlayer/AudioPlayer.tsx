import React, { useEffect, useRef, useState } from "react";
import moment from "moment";

import { CloseIcon, DownloadIcon, PauseIcon, PlayIcon } from "icons";

import "./style.sass";

type Props = {
    src: string;
    handleClose: () => void;
}

const AudioPlayer = ({
    src,
    handleClose
}: Props) => {


    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number | null>(null);
    const [currentTime, setCurrentTime] = useState<number | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const barRef = useRef<HTMLDivElement | null>(null);

    const handlePlay = () => {
        if (audioRef.current) {
            if (!isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleCloseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            handleClose();
        }
    }

    const curPercentage = currentTime && duration && (currentTime / duration) * 100 || null;

    const formatDuration = (value: number) => {
        const tmp = moment.duration(value, "seconds");
        const parts = []
        for (const part of ['minutes', 'seconds']) {
            // @ts-ignore
            const d = tmp[part]();
            // @ts-ignore
            tmp.subtract(moment.duration(d, part));
            parts.push(d);
        }
        return `${parts[0]}:${parts[1] < 10 ? `0${parts[1]}` : parts[1]}`
    }

    const handleDownload = () => {
        const el = document.createElement("a");
        el.setAttribute("href", src);
        el.setAttribute("target", "_blank")
        el.setAttribute("download", "audio.mp3");
        document.body.appendChild(el);
        el.click();
        el.remove();
    }

    /* eslint-disable */
    useEffect(() => {    
        const setAudioData = () => {
            setDuration(audioRef.current?.duration || null);
            setCurrentTime(audioRef.current?.currentTime || null);
        }

        const setAudioTime = () => setCurrentTime(audioRef.current?.currentTime || null);

        audioRef.current?.addEventListener("loadeddata", setAudioData);
        audioRef.current?.addEventListener("timeupdate", setAudioTime);

        return () => {
          audioRef.current?.removeEventListener("loadeddata", setAudioData);
          audioRef.current?.removeEventListener("timeupdate", setAudioTime);
        }
    }, []);

    return (
        <>
            <p className="audio-player__current-time">{formatDuration(currentTime || 0)}</p>
            <button
                type="button"
                onClick={handlePlay}
                className="audio-player__play-btn">
                    { isPlaying && <PauseIcon/> || <PlayIcon/>}
            </button>
            <div className="progress-bar">
                <audio src={src} ref={audioRef}></audio>
            </div>
            <div
                className="audio-player__progress"
                ref={barRef}
                style={{
                    background: `linear-gradient(to right, #002CFB ${curPercentage}%, #ADBFDF 0)`
                }}
            />
            <button
                type="button"
                className="audio-player__download-btn"
                onClick={handleDownload}>
                    <DownloadIcon/>
            </button>
            <button
                type="button"
                className="audio-player__close-btn"
                onClick={handleCloseAudio}>
                    <CloseIcon/>
            </button>
        </>
    )
}

export { AudioPlayer }