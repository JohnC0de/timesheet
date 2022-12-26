import { Button } from "primereact/button";
import { SlideMenu } from "primereact/slidemenu";
import { useRef } from "react";

export const FloatingMenu = () => {
  const menu = useRef(null);
  const items = [
    {
      label: "Apontamentos",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Criar",
          icon: "pi pi-fw pi-plus",
        },
        {
          label: "Avaliar",
          icon: "pi pi-fw pi-check",
        },
      ],
    },
    {
      label: "Logout",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  return (
    <div className="absolute top-0 left-0 m-4">
      <div className="card">
        <SlideMenu
          ref={menu}
          model={items}
          popup
          backLabel="Voltar"
          className="p-shadow-5"
        ></SlideMenu>
        <Button
          type="button"
          icon="pi pi-bars"
          onClick={(event) => menu.current.toggle(event)}
          className="m-2"
        ></Button>
      </div>
    </div>
  );
};
