/* eslint-disable  */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  isCreateAccountOperation,
  isChangeTrustOperation,
} from "components/screens/HistoryScreen/helpers";
import { mapChangeTrustHistoryItem } from "components/screens/HistoryScreen/mappers/changeTrust";
import { mapCreateAccountHistoryItem } from "components/screens/HistoryScreen/mappers/createAccount";
import { createDefaultHistoryItemData } from "components/screens/HistoryScreen/mappers/default";
import { mapPaymentHistoryItem } from "components/screens/HistoryScreen/mappers/payment";
import { HistoryItemUI } from "components/screens/HistoryScreen/types";
import { NETWORKS } from "config/constants";
import { ThemeColors } from "hooks/useColors";

// interface MapHistoryItemDataProps {
//   operation: any;
//   accountBalances: BalanceMap;
//   publicKey: string;
//   networkDetails: NetworkDetails;
//   network: NETWORKS;
//   themeColors: ThemeColors;
// }

/**
 * Main mapper function to convert operation data into history item data
 */
export const mapHistoryItemUi = async (
  operation: any,
  publicKey: string,
  network: NETWORKS,
  themeColors: ThemeColors,
  historyItemData: any,
): Promise<HistoryItemUI> => {
  const {
    type,
    isPayment = false,
    isCreateExternalAccount = false,
  } = operation;

  // Handle create account
  if (isCreateAccountOperation(type)) {
    return mapCreateAccountHistoryItem({
      themeColors,
      isCreateExternalAccount,
      historyItemData,
    });
  }

  // Handle change trust
  if (isChangeTrustOperation(type)) {
    return mapChangeTrustHistoryItem(operation, themeColors, historyItemData);
  }

  // // Handle swap
  // if (isSwap) {
  //   return mapSwapHistoryItem({
  //     operation,
  //     stellarExpertUrl,
  //     date,
  //     fee,
  //     networkUrl: networkDetails.networkUrl,
  //     themeColors,
  //   });
  // }

  // // Handle payment
  if (isPayment) {
    return mapPaymentHistoryItem({
      operation,
      publicKey,
      themeColors,
      historyItemData,
    });
  }

  // // Handle Soroban invoke host function
  // if (isSorobanInvokeHostFunction(typeI)) {
  //   // Get Soroban operation attributes if available
  //   const sorobanAttributes = getAttrsFromSorobanHorizonOp(
  //     operation,
  //     networkDetails,
  //   );

  //   return mapSorobanHistoryItem({
  //     operation,
  //     sorobanAttributes,
  //     accountBalances,
  //     publicKey,
  //     networkDetails,
  //     network,
  //     stellarExpertUrl,
  //     date,
  //     fee,
  //     themeColors,
  //   });
  // }

  // // Default case for unrecognized transaction types
  return createDefaultHistoryItemData(themeColors);
};
