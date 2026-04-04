import type { Dispatch, SetStateAction } from 'react'

export interface ISidebarProps {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}
