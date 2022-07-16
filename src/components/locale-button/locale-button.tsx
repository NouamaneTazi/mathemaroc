import * as React from "react";

import i18n from "@/i18n";

import { Button, Menu, MenuButton, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const LocaleButton: React.FC = () => {
  const router = useRouter();

  const locale = router.locale as string;

  async function change(_locale: string) {
    await router.replace(router.route, router.asPath, { locale: _locale });
    router.reload();
  }

  return (
    <Menu>
      {/* <Tooltip hasArrow label={i18n.tooltip.lang[locale]}> */}
      <MenuButton as={Button} variant="ghost">
        <span role="img">{i18n.flag[locale]}</span>
      </MenuButton>
      {/* </Tooltip> */}

      <MenuList>
        <MenuGroup title="Language">
          {/* <MenuItem onClick={() => change("fr")}>Français</MenuItem> */}
          <MenuItem onClick={() => change("ar")}>عربي</MenuItem>
          <MenuItem onClick={() => change("en")}>English</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
