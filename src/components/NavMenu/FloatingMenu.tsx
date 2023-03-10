import { signOut } from "next-auth/react"
import { Button } from "primereact/button"
import { SlideMenu } from "primereact/slidemenu"
import { useRef } from "react"

export const FloatingMenu = () => {
  const menu = useRef<SlideMenu>(null)
  const items = [
    {
      label: "Apontamentos",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Criar",
          icon: "pi pi-fw pi-plus"
        },
        {
          label: "Avaliar",
          icon: "pi pi-fw pi-check"
        }
      ]
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off",
      command: () => signOut()
    }
  ]

  return (
    <div className="absolute top-0 left-0 m-4">
      <SlideMenu ref={menu} model={items} popup backLabel="Voltar" />
      <Button type="button" icon="pi pi-bars" onClick={e => menu.current?.toggle(e)} className="m-2" />
    </div>
  )
}
