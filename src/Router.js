import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as RoutePath from './Entities/RoutePath'
import MainContainer  from './Containers/MainContainer/MainContainer'
import OnBoarders from './Component/Admin/OnBoarders'
import TotalUsers from './Component/Admin/TotalUsers'
import Login from './Containers/Login/Login'

const Router = () => {
    // need to change the rout for inital render in line number 15
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutePath.LOGIN.URI} element={<Login />} />
                <Route path={RoutePath.INIT.URI} element={<Login />} /> 
                <Route path={RoutePath.MAIN_CONTAINER.URI} element={<MainContainer Children={
                    <Routes>
                        <Route>
                            <Route path={RoutePath.ON_BOARDERS.URI} element={<OnBoarders />} />
                            <Route path={RoutePath.TOTAL_USERS.URI} element={<TotalUsers />} />
                        </Route>
                    </Routes>
                } /> }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Router