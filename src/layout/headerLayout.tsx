import { ReactElement } from 'react'
import dynamic from 'next/dynamic'

const HeaderMenu = dynamic(() => import('src/components/model/HeaderMenu'), {
  ssr: false,
})

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <>
    <HeaderMenu />
    {children}
  </>
)
