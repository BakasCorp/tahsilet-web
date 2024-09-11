"use server";

import type { Volo_Abp_Application_Dtos_PagedResultDto_16 } from "@ayasofyazilim/saas/AdministrationService";
import type {
  GetApiCrmServiceMerchantsByIdDetailData,
  GetApiCrmServiceMerchantsData,
  UniRefund_CRMService_Merchants_MerchantDetailDto,
} from "@ayasofyazilim/saas/CRMService";
import { revalidatePath } from "next/cache";
import type { ServerResponse } from "src/lib";
import { getCRMServiceClient, structuredError } from "src/lib";

export async function getCrmServiceMerchants(
  body: GetApiCrmServiceMerchantsData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response = await client.merchant.getApiCrmServiceMerchants(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<Volo_Abp_Application_Dtos_PagedResultDto_16>;
  } catch (error) {
    return structuredError(error);
  }
}

export async function getCrmServiceMerchantsDetailById(
  body: GetApiCrmServiceMerchantsByIdDetailData,
) {
  "use server";
  try {
    const client = await getCRMServiceClient();
    const response =
      await client.merchant.getApiCrmServiceMerchantsByIdDetail(body);
    revalidatePath("/");
    return {
      type: "success",
      data: response,
      status: 200,
    } as ServerResponse<UniRefund_CRMService_Merchants_MerchantDetailDto>;
  } catch (error) {
    return structuredError(error);
  }
}
