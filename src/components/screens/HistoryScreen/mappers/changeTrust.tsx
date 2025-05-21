/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumber from "bignumber.js";
import { AssetIcon } from "components/AssetIcon";
import { HistoryItemUI } from "components/screens/HistoryScreen/types";
import Icon from "components/sds/Icon";
import { ThemeColors } from "hooks/useColors";
import React from "react";

// interface ChangeTrustHistoryItemData {
//   operation: any;
//   stellarExpertUrl: string;
//   date: string;
//   fee: string;
//   themeColors: ThemeColors;
// }

/**
 * Maps change trust operation data to history item data
 */
export const mapChangeTrustHistoryItem = (
  operation: any,
  themeColors: ThemeColors,
  historyItemData: any,
): HistoryItemUI => {
  const {
    asset_code: destAssetCode,
    asset_type: assetType,
    asset_issuer: assetIssuer,
  } = operation;

  const isRemovingTrustline = BigNumber(operation?.limit).eq(0);

  const IconComponent = (
    <AssetIcon
      token={{
        code: destAssetCode,
        type: assetType,
        issuer: {
          key: assetIssuer,
        },
      }}
      size="lg"
    />
  );

  const ActionIcon =
    Icon[historyItemData.actionIconString as keyof typeof Icon];

  const ActionIconComponent = isRemovingTrustline ? (
    <ActionIcon size={16} color={themeColors.foreground.primary} />
  ) : (
    <ActionIcon size={16} color={themeColors.foreground.primary} />
  );

  return {
    IconComponent,
    ActionIconComponent,
  };
};
