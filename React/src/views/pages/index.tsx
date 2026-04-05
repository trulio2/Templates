import { lazy } from 'react'

const Admin = lazy(() => import('./admin/Admin'))
const Cats = lazy(() => import('./cats/Cats'))
const Home = lazy(() => import('./home/Home'))
const Login = lazy(() => import('./login/Login'))
const NotFound = lazy(() => import('./notFound/NotFound'))

export { Admin, Cats, Home, Login, NotFound }
