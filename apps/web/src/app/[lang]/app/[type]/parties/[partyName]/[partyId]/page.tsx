"use server";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import { notFound } from "next/navigation";
import { getTableDataDetail } from "src/app/[lang]/app/actions/api-requests";
import {
  getMerchantsApi,
  getTaxOfficesApi,
} from "src/app/[lang]/app/actions/CrmService/actions";
import { getResourceData } from "src/language-data/CRMService";
import { dataConfigOfParties } from "../../table-data";
import type { PartyNameType } from "../../types";
import { getCitiesApi } from "../../../../actions/LocationService/actions";
import Address from "./address/form";
import Contracts from "./contracts/form";
import Email from "./email/form";
import Individual from "./individuals-table/form";
import MerchantForm from "./merchant/form";
import NameForm from "./name/form";
import OrganizationForm from "./organization/form";
import PersonalSummariesForm from "./personal-summaries/form";
import SubCompany from "./subcompanies-table/form";
import Telephone from "./telephone/form";
import type { GetPartiesDetailResult } from "./types";

export default async function Page({
  params,
}: {
  params: {
    partyId: string;
    partyName: Exclude<PartyNameType, "individuals">;
    lang: string;
  };
}) {
  const { languageData } = await getResourceData(params.lang);
  const formData = dataConfigOfParties[params.partyName];

  const partyDetail = await getTableDataDetail(
    params.partyName,
    params.partyId,
  );
  if (partyDetail.type !== "success" || !partyDetail.data) {
    notFound();
  }
  const partyDetailData = partyDetail.data as GetPartiesDetailResult;
  const organizationData =
    partyDetailData.entityInformations?.[0]?.organizations?.[0];
  const individualData =
    partyDetailData.entityInformations?.[0]?.individuals?.[0];
  if (!organizationData && !individualData) {
    return notFound();
  }

  const cities = await getCitiesApi({ maxResultCount: 500, sorting: "name" });
  const cityList =
    (cities.type === "success" &&
      cities.data.items?.map((item) => ({
        name: item.name || "",
        id: item.id || "",
      }))) ||
    [];

  const merchants = await getMerchantsApi();
  const merchantList =
    (merchants.type === "success" &&
      merchants.data.items
        ?.map((i) => ({
          name: i.name || "",
          id: i.id || "",
        }))
        .filter((i) => i.id !== params.partyId)) ||
    [];

  const taxOffices = await getTaxOfficesApi();
  const taxOfficeList =
    (taxOffices.type === "success" &&
      taxOffices.data.items?.map((i) => ({
        name: i.name || "",
        id: i.id || "",
      }))) ||
    [];

  const sections = [
    { name: languageData.Telephone, id: "telephone" },
    { name: languageData.Address, id: "address" },
    { name: languageData.Email, id: "email" },
    { name: languageData[formData.subEntityName], id: "SubCompany" },
    { name: languageData.Individuals, id: "individuals" },
    { name: languageData.Contracts, id: "contracts" },
  ];

  if (organizationData) {
    sections.unshift({
      name: languageData["Parties.Organization"],
      id: "organization",
    });
  } else {
    sections.unshift({
      name: languageData.PersonalSummaries,
      id: "personal-summaries",
    });
    sections.unshift({ name: languageData.Name, id: "name" });
  }
  if (params.partyName === "merchants") {
    sections.unshift({
      name: languageData.Merchants,
      id: "merchant-base",
    });
  }

  return (
    <>
      <div className="h-full overflow-hidden">
        <SectionLayout sections={sections} vertical>
          {params.partyName === "merchants" &&
            "taxOfficeId" in partyDetailData && (
              <MerchantForm
                languageData={languageData}
                merchantData={partyDetailData}
                merchantList={merchantList}
                partyId={params.partyId}
                partyName={params.partyName}
                taxOfficeList={taxOfficeList}
              />
            )}

          {organizationData ? (
            <OrganizationForm
              languageData={languageData}
              organizationData={organizationData}
              organizationId={organizationData.id || ""}
              partyId={params.partyId}
              partyName={params.partyName}
            />
          ) : null}

          {params.partyName === "merchants" && individualData ? (
            <>
              <NameForm
                individualData={individualData.name}
                languageData={languageData}
                partyId={params.partyId}
                partyName={params.partyName}
              />
              <PersonalSummariesForm
                individualData={individualData.personalSummaries?.[0]}
                languageData={languageData}
                partyId={params.partyId}
                partyName={params.partyName}
              />
            </>
          ) : null}

          <Telephone
            languageData={languageData}
            organizationData={organizationData || individualData}
            partyId={params.partyId}
            partyName={params.partyName}
          />

          <Address
            citiesEnum={cityList}
            languageData={languageData}
            organizationData={organizationData || individualData}
            partyId={params.partyId}
            partyName={params.partyName}
          />

          <Email
            languageData={languageData}
            organizationData={organizationData || individualData}
            partyId={params.partyId}
            partyName={params.partyName}
          />
          <SubCompany
            languageData={languageData}
            partyId={params.partyId}
            partyName={params.partyName}
          />
          <Individual
            languageData={languageData}
            partyId={params.partyId}
            partyName={params.partyName}
          />
          {params.partyName === "merchants" && (
            <Contracts
              languageData={languageData}
              partyId={params.partyId}
              partyName={params.partyName}
            />
          )}
        </SectionLayout>
      </div>
      <div className="hidden" id="page-title">
        {`${languageData[formData.translationKey]} (${partyDetailData.entityInformations?.[0]?.organizations?.[0]?.name || `${individualData?.name?.firstName} ${individualData?.name?.lastName}`})`}
      </div>
    </>
  );
}
