import React from "react";
import clsx from "clsx";

import { SideMenuTabs } from "consts";
import { 
    CallsIcon, 
    ContractorsIcon, 
    DocsIcon, 
    ExclamationPointIcon, 
    ExecutorsIcon, 
    KnowledgeIcon, 
    MessagesIcon, 
    OrdersIcon, 
    PlusIcon, 
    ReportIcon, 
    ResultsIcon, 
    SettingsIcon 
} from "icons";

import Logo from "assets/images/logo.png";

import "./style.sass";

type Props = {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const SideMenu = ({
    activeTab,
    setActiveTab
}: Props) => {

    const getTabInfo = (value: string) => {
        switch(value) {
            case SideMenuTabs.RESULTS:
                return ({ icon: <ResultsIcon/>, text: "Итоги" })
            case SideMenuTabs.ORDERS:
                return ({ icon: <OrdersIcon/>, text: "Заказы" })
            case SideMenuTabs.MESSAGES:
                return ({ icon: <MessagesIcon/>, text: "Сообщения" })
            case SideMenuTabs.CALLS:
                return ({ icon: <CallsIcon/>, text: "Звонки" })
            case SideMenuTabs.CONTRACTOR:
                return ({ icon: <ContractorsIcon/>, text: "Контрагенты" })
            case SideMenuTabs.DOCS:
                return ({ icon: <DocsIcon/>, text: "Документы" })
            case SideMenuTabs.EXECUTORS:
                return ({ icon: <ExecutorsIcon/>, text: "Исполнители" })
            case SideMenuTabs.REPORTS:
                return ({ icon: <ReportIcon/>, text: "Отчеты" })
            case SideMenuTabs.KNOWLEDGE_BASE:
                return ({ icon: <KnowledgeIcon/>, text: "База знаний" });
            case SideMenuTabs.SETTINGS:
                return ({ icon: <SettingsIcon/>, text: "Настройки" });
            default:
                return ({ icon: null, text: null })
        }
    }

    const tabs = Object.keys(SideMenuTabs);

    const children = tabs.map(item => {
        const { icon, text } = getTabInfo(item);
        const isActive = activeTab === item;
        const isCalls = item === SideMenuTabs.CALLS;
        return (
            <button 
                type="button"
                onClick={() => setActiveTab(item)}
                key={item}
                className={clsx("side-menu--tab", isActive && "is-active", isCalls && "is-calls")}>
                    <div className="side-menu--tab__icon">{icon}</div>
                    <p className="side-menu--tab__text">{text}</p>
                    <div className="indicator"/>
            </button>
        )
    });

    return (
        <div className="side-menu">
            <img src={Logo} alt="logo" className="side-menu__logo" />
            {children}
            <div className="side-menu--btns">
                <button
                    type="button">
                        Добавить заказ
                        <PlusIcon/>
                </button>
                <button
                    type="button">
                        Оплата
                        <ExclamationPointIcon/>
                </button>
            </div>
        </div>
    )
}

export { SideMenu };