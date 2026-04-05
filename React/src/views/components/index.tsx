import { lazy } from 'react'

const Button = lazy(() => import('./button/Button'))
const Input = lazy(() => import('./input/Input'))
const Sidebar = lazy(() => import('./sidebar/Sidebar'))

export { Button, Input, Sidebar }
