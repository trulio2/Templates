import { lazy } from 'react'

const Button = lazy(() => import('./button/Button'))
const Sidebar = lazy(() => import('./sidebar/Sidebar'))

export { Button, Sidebar }
