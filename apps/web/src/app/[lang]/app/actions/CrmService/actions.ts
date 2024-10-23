"use server";
import type {
  GetApiCrmServiceMerchantsData,
  GetApiCrmServiceTaxOfficesData,
} from "@ayasofyazilim/saas/CRMService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getMerchantsApi(
  data: GetApiCrmServiceMerchantsData = {},
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests.merchants.get(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getTaxOfficesApi(
  data: GetApiCrmServiceTaxOfficesData = {},
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests["tax-offices"].get(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getBasicInformationApi(
  id: string,
  partyName: "merchants",
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests[partyName].getBasicInformation({
        id,
      }),
    };
  } catch (error) {
    return structuredError(error);
  }
}

export async function getAdressesApi(id: string, partyName: "merchants") {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests[partyName].getAdresses({
        id,
      }),
    };
  } catch (error) {
    return structuredError(error);
  }
}
