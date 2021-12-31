import * as React from "react";

import { Tooltip, TooltipProps } from "@chakra-ui/react";
import i18n from "@/i18n";
import { useRouter } from "next/router";

export const EmailTooltip: React.FC<TooltipProps> = (props) => {
  const { locale } = useRouter();
  return (
    <Tooltip
      aria-label="Email address"
      hasArrow
      label={i18n.tooltip.email[locale as string]}
      {...props}
    />
  );
};
