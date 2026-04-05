import { lazy } from 'react'

const Button = lazy(() => import('./button/Button'))
const Image = lazy(() => import('./image/Image'))
const Input = lazy(() => import('./input/Input'))
const Sidebar = lazy(() => import('./sidebar/Sidebar'))

export { Button, Image, Input, Sidebar }
