"use client";
import { toast } from "@/components/ui/sonner";
import type {
  UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto,
  UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto,
  UniRefund_CRMService_Merchants_MerchantDto,
  UniRefund_CRMService_Organizations_UpdateOrganizationDto,
  UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto,
} from "@ayasofyazilim/saas/CRMService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { useLocale } from "src/providers/locale";
import { getBaseLink } from "src/utils";
import { isPhoneValid, splitPhone } from "src/utils-phone";
import { getResourceDataClient } from "src/language-data/DebtorsService";
import { localNumber } from "../../crm/data";
import {
  updateDebtorDetailServer,
  updateDebtorInformationServer,
} from "../actions/action";
import { address, email, organization, telephone } from "../data";

export default function Form({
  crmDetailData,
  params,
}: {
  crmDetailData: UniRefund_CRMService_Merchants_MerchantDto;
  params: {
    id: string;
    data: string;
    lang: string;
  };
}) {
  const { resources } = useLocale();
  const languageData = getResourceDataClient(resources, params.lang);
  const organizationInfo =
    crmDetailData.entityInformations?.[0]?.organizations?.[0];
  const organizationId = organizationInfo?.id || "";

  const emailInfo = organizationInfo?.contactInformations?.[0]?.emails?.[0];
  const telephoneInfo = {
    ...organizationInfo?.contactInformations?.[0]?.telephones?.[0],
    properties: {
      ...organizationInfo?.contactInformations?.[0]?.telephones?.[0],
      localNumber,
    },
  };
  const addressInfo =
    organizationInfo?.contactInformations?.[0]?.addresses?.[0];

  const organizationSchema = createZodObject(organization, [
    "name",
    "taxpayerId",
    "customerNumber",
    "legalStatusCode",
  ]);
  const emailSchema = createZodObject(email, ["emailAddress", "typeCode"]);
  const telephoneSchema = createZodObject(telephone, [
    "localNumber",
    "typeCode",
  ]);
  const phoneNumber =
    (telephoneInfo.ituCountryCode || "+90") +
    (telephoneInfo.areaCode || "") +
    (telephoneInfo.localNumber || "");
  const addressSchema = createZodObject(address, [
    "country",
    "terriority",
    "city",
    "postalCode",
    "addressLine",
    "fullAddress",
    "typeCode",
  ]);

  async function handleSubmit(values: unknown, sectionName: string) {
    if (typeof values !== "object") return;

    let response = "fail";
    if (sectionName === "organization") {
      await updateDebtorDetailServer(
        params.id,
        organizationId,
        "merchant",
        values as UniRefund_CRMService_Organizations_UpdateOrganizationDto,
      );
      response = "success";
    }
    if (sectionName === "email") {
      await updateDebtorInformationServer(emailInfo?.id || "", {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_EmailCommonDatas_UpdateEmailCommonDataDto);
      response = "success";
    }
    if (sectionName === "telephone") {
      const parsedValues = {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto;
      const isValid = isPhoneValid(parsedValues.localNumber);
      if (!isValid) {
        return;
      }
      const phoneData = splitPhone(parsedValues.localNumber);
      await updateDebtorInformationServer(telephoneInfo.id || "", {
        ...values,
        primaryFlag: true,
        ...phoneData,
      } as UniRefund_CRMService_TelephoneTypes_UpdateTelephoneTypeDto);
      response = "success";
    }
    if (sectionName === "address") {
      await updateDebtorInformationServer(addressInfo?.id || "", {
        ...values,
        primaryFlag: true,
      } as UniRefund_CRMService_AddressTypes_UpdateAddressTypeDto);
      response = "success";
    }
    if (response) {
      toast.success("Updated successfully!");
    }
  }

  return (
    <div className="h-full overflow-hidden">
      <PageHeader
        LinkElement={Link}
        description={languageData["Debtor.Edit"]}
        href={getBaseLink(`/app/admin/debtors`)}
        title={languageData["Debtor.Edit"]}
      />
      <SectionLayout
        sections={[
          { name: languageData.Organization, id: "organization" },
          { name: languageData.Telephone, id: "telephone" },
          { name: languageData.Address, id: "address" },
          { name: languageData.Email, id: "email" },
        ]}
        vertical
      >
        <SectionLayoutContent sectionId="organization">
          <AutoForm
            formClassName="pb-40 "
            formSchema={organizationSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "organization");
            }}
            values={{
              name: organizationInfo?.name,
              taxpayerId: organizationInfo?.taxpayerId,
              customerNumber: organizationInfo?.customerNumber,
              legalStatusCode: organizationInfo?.legalStatusCode,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="telephone">
          <AutoForm
            fieldConfig={{
              localNumber: {
                fieldType: "phone",
                displayName: "Telephone Number",
                inputProps: {
                  showLabel: true,
                },
              },
            }}
            formClassName="pb-40 "
            formSchema={telephoneSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "telephone");
            }}
            values={{
              localNumber: phoneNumber,
              primaryFlag: telephoneInfo.primaryFlag,
              typeCode: telephoneInfo.typeCode,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="address">
          <AutoForm
            formClassName="pb-40 "
            formSchema={addressSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "address");
            }}
            values={{
              addressLine: addressInfo?.addressLine,
              city: addressInfo?.city,
              country: addressInfo?.country,
              fullAddress: addressInfo?.fullAddress,
              postalCode: addressInfo?.postalCode,
              terriority: addressInfo?.terriority,
              typeCode: addressInfo?.typeCode,
              primaryFlag: addressInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
        <SectionLayoutContent sectionId="email">
          <AutoForm
            fieldConfig={{
              emailAddress: {
                inputProps: {
                  type: "email",
                },
              },
            }}
            formClassName="pb-40 "
            formSchema={emailSchema}
            onSubmit={(values) => {
              void handleSubmit(values, "email");
            }}
            values={{
              emailAddress: emailInfo?.emailAddress,
              typeCode: emailInfo?.typeCode,
              primaryFlag: emailInfo?.primaryFlag,
            }}
          >
            <AutoFormSubmit className="float-right">
              {languageData.Save}
            </AutoFormSubmit>
          </AutoForm>
        </SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
