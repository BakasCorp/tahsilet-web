import type { LanguageDataType, ResourceResult } from "src/utils";
import { getLocalizationResources } from "src/utils";
import en from "./resources/en.json";
import tr from "./resources/tr.json";

const data: LanguageDataType = {
  tr,
  en,
};

export interface CRMServiceServiceResource {
  new: string;
  Edit: string;
  Delete: string;
  Merchants: string;
  "Merchants.New": string;
  RefundPoints: string;
  "RefundPoints.New": string;
  Customs: string;
  "Customs.New": string;
  TaxFree: string;
  "TaxFree.New": string;
  TaxOffices: string;
  "TaxOffices.New": string;
  "Merchants.Edit": string;
  "RefundPoints.Edit": string;
  "Customs.Edit": string;
  "TaxFree.Edit": string;
  "TaxOffices.Edit": string;
  Organization: string;
  Email: string;
  Telephone: string;
  Address: string;
  Save: string;
}
function getLanguageData(
  resources: ResourceResult,
  lang: string,
): CRMServiceServiceResource {
  const resource = resources.CrmService?.texts;
  const uiResource = resources.AbpUi?.texts;
  return {
    new: resource?.new || data[lang]?.new || data.en.new,
    Edit: uiResource?.Edit || data[lang]?.Edit || data.en.Edit,
    Delete: uiResource?.Delete || data[lang]?.Delete || data.en.Delete,
    Organization:
      resource?.Organization ||
      data[lang]?.Organization ||
      data.en.Organization,
    Email: resource?.Email || data[lang]?.Email || data.en.Email,
    Telephone:
      resource?.Telephone || data[lang]?.Telephone || data.en.Telephone,
    Address: resource?.Address || data[lang]?.Address || data.en.Address,
    Save: resource?.Save || data[lang]?.Save || data.en.Save,

    Merchants:
      resource?.Merchants || data[lang]?.Merchants || data.en.Merchants,
    "Merchants.New":
      resource?.["Merchants.New"] ||
      data[lang]?.["Merchants.New"] ||
      data.en["Merchants.New"],
    "Merchants.Edit":
      resource?.["Merchants.Edit"] ||
      data[lang]?.["Merchants.Edit"] ||
      data.en["Merchants.Edit"],

    RefundPoints:
      resource?.RefundPoints ||
      data[lang]?.RefundPoints ||
      data.en.RefundPoints,
    "RefundPoints.New":
      resource?.["RefundPoints.New"] ||
      data[lang]?.["RefundPoints.New"] ||
      data.en["RefundPoints.New"],
    "RefundPoints.Edit":
      resource?.["RefundPoints.Edit"] ||
      data[lang]?.["RefundPoints.Edit"] ||
      data.en["RefundPoints.Edit"],

    Customs: resource?.Customs || data[lang]?.Customs || data.en.Customs,
    "Customs.New":
      resource?.["Customs.New"] ||
      data[lang]?.["Customs.New"] ||
      data.en["Customs.New"],
    "Customs.Edit":
      resource?.["Customs.Edit"] ||
      data[lang]?.["Customs.Edit"] ||
      data.en["Customs.Edit"],
    TaxFree: resource?.TaxFree || data[lang]?.TaxFree || data.en.TaxFree,
    "TaxFree.New":
      resource?.["TaxFree.New"] ||
      data[lang]?.["TaxFree.New"] ||
      data.en["TaxFree.New"],
    "TaxFree.Edit":
      resource?.["TaxFree.Edit"] ||
      data[lang]?.["TaxFree.Edit"] ||
      data.en["TaxFree.Edit"],
    TaxOffices:
      resource?.TaxOffices || data[lang]?.TaxOffices || data.en.TaxOffices,
    "TaxOffices.New":
      resource?.["TaxOffices.New"] ||
      data[lang]?.["TaxOffices.New"] ||
      data.en["TaxOffices.New"],
    "TaxOffices.Edit":
      resource?.["TaxOffices.Edit"] ||
      data[lang]?.["TaxOffices.Edit"] ||
      data.en["TaxOffices.Edit"],
  };
}
export async function getResourceData(lang: string) {
  const resources = await getLocalizationResources(lang);
  const languageData = getLanguageData(resources, lang);
  return {
    languageData,
    resources,
  };
}
export function getResourceDataClient(resources: ResourceResult, lang: string) {
  const languageData = getLanguageData(resources, lang);
  return languageData;
}
