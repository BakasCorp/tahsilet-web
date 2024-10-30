"use server";
import type { GetApiTravellerServiceTravellersData } from "@ayasofyazilim/saas/TravellerService";
import { $UniRefund_TravellerService_Travellers_TravellerListProfileDto } from "@ayasofyazilim/saas/TravellerService";
import type { ColumnFilter } from "@repo/ayasofyazilim-ui/molecules/tables";
import TableComponent from "@repo/ui/TableComponent";
import { getResourceData } from "src/language-data/TravellerService";
import { tableFetchRequest } from "../../../actions/table-utils";

export const travellerTableSchema = {
  excludeList: [
    "id",
    "userAccountId",
    "residenceCountryCode2",
    "nationalityCountryCode2",
  ],
  schema: $UniRefund_TravellerService_Travellers_TravellerListProfileDto,
};


export default async function Page({ params }: { params: { lang: string } }) {
  const { languageData } = await getResourceData(params.lang);
  type DetailedFilter = ColumnFilter & {
    name: keyof GetApiTravellerServiceTravellersData;
  };

  const filters: DetailedFilter[] = [
    {
      name: "showExpired",
      displayName: languageData["Travellers.ShowExpired"],
      type: "boolean",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.FullName,
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.FirstName,
      type: "string",
      value: "",
    },
    {
      name: "fullName",
      displayName: languageData.LastName,
      type: "string",
      value: "",
    },
    {
      name: "travelDocumentNumber",
      displayName: languageData["Travellers.TravelDocumentNumber"],
      type: "string",
      value: "",
    },
    {
      name: "username",
      displayName: languageData.UserName,
      type: "string",
      value: "",
    },
    {
      name: "phoneNumber",
      displayName: languageData.PhoneNumber,
      type: "string",
      value: "",
    },
  ];
  return (
    <TableComponent
      createOnNewPage
      createOnNewPageTitle={languageData[`Travellers.New`]}
      detailedFilter={filters}
      fetchRequest={(page, filter) => {
        "use server";
        return tableFetchRequest("travellers", page, filter);
      }}

      languageData={languageData}
      tableSchema={travellerTableSchema}
    />
  );
}
