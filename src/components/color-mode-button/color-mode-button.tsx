import * as React from "react";

import { Icon, IconButton, Tooltip, useColorMode } from "@chakra-ui/react";

import { FaMoon, FaSun } from "react-icons/fa";
import i18n from "@/i18n";
import { useRouter } from "next/router";

export const ColorModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const ModeIcon = colorMode === "dark" ? FaSun : FaMoon;
  const { locale } = useRouter();

  return (
    <Tooltip hasArrow label={i18n.tooltip.lightmode[locale as string]}>
      <IconButton
        aria-label={`Toggle ${colorMode} mode 🌓`}
        icon={<Icon as={ModeIcon} />}
        onClick={toggleColorMode}
        variant="ghost"
      />
    </Tooltip>
  );
};
