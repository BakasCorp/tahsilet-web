"use client";
import type {Volo_Abp_LanguageManagement_Dto_LanguageTextDto} from "@ayasofyazilim/saas/AdministrationService";
import {$Volo_Abp_LanguageManagement_Dto_LanguageTextDto} from "@ayasofyazilim/saas/AdministrationService";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {putLanguageTextsByResourceNameByCultureNameByNameApi} from "src/actions/core/AdministrationService/put-actions";
import {handlePutResponse} from "src/actions/core/api-utils-client";
import type {AdministrationServiceResource} from "src/language-data/core/AdministrationService";

export default function LanguageTextsEdit({
  languageData,
  languageTextData,
}: {
  languageData: AdministrationServiceResource;
  languageTextData: Volo_Abp_LanguageManagement_Dto_LanguageTextDto;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const uiSchema = createUiSchemaWithResource({
    schema: $Volo_Abp_LanguageManagement_Dto_LanguageTextDto,
    resources: languageData,
    name: "Form.LanguageText",
    extend: {
      name: {
        "ui:disabled": true,
        "ui:options": {
          readOnly: true,
        },
      },
      baseValue: {
        "ui:widget": "textarea",
        "ui:disabled": true,
        "ui:options": {
          readOnly: true,
        },
      },
      value: {
        "ui:widget": "textarea",
      },
    },
  });
  return (
    <SchemaForm<Volo_Abp_LanguageManagement_Dto_LanguageTextDto>
      className="flex flex-col gap-4"
      disabled={isPending}
      filter={{
        type: "include",
        sort: true,
        keys: ["name", "baseValue", "value"],
      }}
      formData={languageTextData}
      onSubmit={({formData}) => {
        startTransition(() => {
          void putLanguageTextsByResourceNameByCultureNameByNameApi({
            resourceName: languageTextData.resourceName || "",
            cultureName: languageTextData.cultureName || "",
            name: languageTextData.name || "",
            value: formData?.value || "",
          }).then((res) => {
            handlePutResponse(res, router);
          });
        });
      }}
      schema={$Volo_Abp_LanguageManagement_Dto_LanguageTextDto}
      submitText={languageData["Edit.Save"]}
      uiSchema={uiSchema}
    />
  );
}
