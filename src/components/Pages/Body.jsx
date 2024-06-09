import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UserForm from './UserForm'
import Home from './Home'
import PaginateServer from './PaginateServer'

function Body() {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <UserForm />
        },
        {
            path: '/home',
            element: <PaginateServer />
        },
    ])
    return (
        <RouterProvider router={appRouter}/>
    )
}

export default Body
