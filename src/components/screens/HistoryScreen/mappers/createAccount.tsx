/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import TransactionDetailsContent from "components/screens/HistoryScreen/TransactionDetailsContent";
import {
  TransactionDetails,
  HistoryItemUI,
} from "components/screens/HistoryScreen/types";
import Avatar, { AvatarSizes } from "components/sds/Avatar";
import Icon from "components/sds/Icon";
import { Text } from "components/sds/Typography";
import { NATIVE_TOKEN_CODE } from "config/constants";
import { formatAssetAmount } from "helpers/formatAmount";
import { truncateAddress } from "helpers/stellar";
import { ThemeColors } from "hooks/useColors";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";

interface CreateAccountHistoryItemData {
  themeColors: ThemeColors;
  isCreateExternalAccount: boolean;
  historyItemData: any;
}

/**
 * Maps create account operation data to history item data
 */
export const mapCreateAccountHistoryItem = ({
  themeColors,
  isCreateExternalAccount,
  historyItemData,
}: CreateAccountHistoryItemData): HistoryItemUI => {
  const isRecipient = !isCreateExternalAccount;
  const ActionIcon =
    Icon[historyItemData.actionIconString as keyof typeof Icon];

  const ActionIconComponent = isRecipient ? (
    <ActionIcon size={16} color={themeColors.foreground.primary} />
  ) : (
    <ActionIcon size={16} color={themeColors.foreground.primary} />
  );

  return {
    ActionIconComponent,
    IconComponent: null,
  };
};

/**
 * Renders create account transaction details
 */
export const CreateAccountTransactionDetailsContent: React.FC<{
  transactionDetails: TransactionDetails;
}> = ({ transactionDetails }) => (
  <TransactionDetailsContent className="justify-center">
    <View className="flex-row justify-between items-center">
      <View>
        <Text xl primary medium numberOfLines={1}>
          {truncateAddress(
            transactionDetails.createAccountDetails?.accountPublicKey ?? "",
          )}
        </Text>
        <Text sm secondary numberOfLines={1}>
          {t("history.transactionDetails.startingBalance")}{" "}
          {formatAssetAmount(
            transactionDetails.createAccountDetails?.startingBalance ?? "",
            NATIVE_TOKEN_CODE,
          )}
        </Text>
      </View>
      <Avatar
        publicAddress={
          transactionDetails.createAccountDetails?.accountPublicKey ?? ""
        }
        hasBorder
        size={AvatarSizes.LARGE}
      />
    </View>
  </TransactionDetailsContent>
);
