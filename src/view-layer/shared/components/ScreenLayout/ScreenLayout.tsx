import { ComponentProps, PropsWithChildren, useState } from "react";
import { Appbar } from "./components/Appbar";
import { MenuDrawer } from "./components/MenuDrawer";

type ScreenLayoutProps = PropsWithChildren<{
  appBarProps: Omit<ComponentProps<typeof Appbar>, "onDrawerOpen">;
}>;

export function ScreenLayout({ children, appBarProps }: ScreenLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <MenuDrawer
      isOpen={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
    >
      <Appbar {...appBarProps} onDrawerOpen={() => setIsDrawerOpen(true)} />
      {children}
    </MenuDrawer>
  );
}
