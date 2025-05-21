/* eslint-disable */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AssetIcon } from "components/AssetIcon";
import TransactionDetailsContent from "components/screens/HistoryScreen/TransactionDetailsContent";
import {
  TransactionDetails,
  HistoryItemUI,
} from "components/screens/HistoryScreen/types";
import { Avatar, AvatarSizes } from "components/sds/Avatar";
import Icon from "components/sds/Icon";
import { Text } from "components/sds/Typography";
import { NATIVE_TOKEN_CODE } from "config/constants";
import { AssetTypeWithCustomToken } from "config/types";
import { formatAssetAmount } from "helpers/formatAmount";
import { truncateAddress } from "helpers/stellar";
import useColors, { ThemeColors } from "hooks/useColors";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";

interface PaymentHistoryItemData {
  operation: any;
  publicKey: string;
  themeColors: ThemeColors;
  historyItemData: any;
}

/**
 * Maps payment operation data to history item data
 */
export const mapPaymentHistoryItem = ({
  operation,
  publicKey,
  themeColors,
  historyItemData,
}: PaymentHistoryItemData): HistoryItemUI => {
  const {
    id,
    amount,
    asset_code: destAssetCode = NATIVE_TOKEN_CODE,
    asset_type: assetType = "native",
    asset_issuer: assetIssuer = "",
    to,
    from,
  } = operation;

  const isRecipient = to === publicKey && from !== publicKey;

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

  const ActionIconComponent = isRecipient ? (
    <ActionIcon size={16} color={themeColors.foreground.primary} />
  ) : (
    <ActionIcon size={16} color={themeColors.foreground.primary} />
  );

  return {
    IconComponent,
    ActionIconComponent,
  };
};

/**
 * Renders payment transaction details
 */
export const PaymentTransactionDetailsContent: React.FC<{
  transactionDetails: TransactionDetails;
}> = ({ transactionDetails }) => {
  const { themeColors } = useColors();

  return (
    <TransactionDetailsContent>
      <View className="flex-row justify-between">
        <View>
          <Text xl primary medium numberOfLines={1}>
            {formatAssetAmount(
              transactionDetails.paymentDetails?.amount ?? "",
              transactionDetails.paymentDetails?.assetCode ?? "",
            )}
          </Text>
          <Text md secondary numberOfLines={1}>
            {/* TODO: priced amount */}-
          </Text>
        </View>
        <AssetIcon
          token={{
            code: transactionDetails.paymentDetails?.assetCode ?? "",
            issuer: {
              key: transactionDetails.paymentDetails?.assetIssuer ?? "",
            },
            type: transactionDetails.paymentDetails
              ?.assetType as AssetTypeWithCustomToken,
          }}
        />
      </View>

      <Icon.ChevronDownDouble
        size={20}
        color={themeColors.foreground.primary}
        circle
        circleBackground={themeColors.background.tertiary}
      />

      <View className="flex-row justify-between items-center">
        <Text xl primary medium numberOfLines={1}>
          {truncateAddress(transactionDetails.paymentDetails?.to ?? "")}
        </Text>
        <Avatar
          publicAddress={transactionDetails.paymentDetails?.to ?? ""}
          hasBorder
          size={AvatarSizes.LARGE}
        />
      </View>
    </TransactionDetailsContent>
  );
};
