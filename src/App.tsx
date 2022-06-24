import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainPage } from 'pages/MainPage';
import { routes } from 'routes';
import { SideMenuTabs } from 'consts';
import { SideMenu } from 'components/common/SideMenu';
import { Navbar } from 'components/common/Navbar';

const App = () => {
  const [activeTab, setActiveTab] = useState<string>(SideMenuTabs.CALLS);
  return (
    <div className="app">
      <BrowserRouter>
        <SideMenu
          activeTab={activeTab}
          setActiveTab={setActiveTab}/>
        <div className="app-left">
          <Navbar/>
          <Routes>
            <Route path={routes.main} element={<MainPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export { App };
