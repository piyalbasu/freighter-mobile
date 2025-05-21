/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "components/sds/Icon";
import { ThemeColors } from "hooks/useColors";
import React from "react";

/**
 * Creates a default history item data for unrecognized transaction types
 */
export const createDefaultHistoryItemData = (
  themeColors: ThemeColors,
): any => ({
  IconComponent: null,
  ActionIconComponent: (
    <Icon.Wallet03 size={16} color={themeColors.foreground.primary} />
  ),
});
