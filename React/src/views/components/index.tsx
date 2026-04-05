import { lazy } from 'react'

const Button = lazy(() => import('./Button'))
const Sidebar = lazy(() => import('./Sidebar'))

export { Button, Sidebar }
