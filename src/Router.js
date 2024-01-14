import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as RoutePath from './Entities/RoutePath'
import MainContainer  from './Containers/MainContainer/MainContainer'
import OnBoarders from './Component/Admin/OnBoarders'
import TotalUsers from './Component/Admin/TotalUsers'
import UserDetails from './Component/Admin/UserDetails'
import Login from './Containers/Login/Login'
import IdeassionTech from './Containers/IdeassionTech'
const Router = () => {
    // need to change the rout for inital render in line number 15
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutePath.LOGO.URI} element={<IdeassionTech />} />
                <Route path={RoutePath.LOGIN.URI} element={<Login />} />
                <Route path={RoutePath.MAIN_CONTAINER.URI} element={<MainContainer Children={
                    <Routes>
                        <Route>
                            <Route path={RoutePath.ON_BOARDERS.URI} element={<OnBoarders />} />
                            <Route path={RoutePath.TOTAL_USERS.URI} element={<TotalUsers />} />
                            <Route path={RoutePath.USER_DETAILS.URI} element={<UserDetails />} />
                        </Route>
                    </Routes>
                } /> }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Router