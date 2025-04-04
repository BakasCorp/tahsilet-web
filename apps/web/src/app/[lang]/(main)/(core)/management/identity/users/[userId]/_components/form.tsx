"use client";

import type {
  Volo_Abp_Identity_IdentityRoleDto,
  Volo_Abp_Identity_IdentityUserDto,
} from "@ayasofyazilim/tahsilet-saas/TAHSILETService";
import {$Volo_Abp_Identity_IdentityUserUpdateDto} from "@ayasofyazilim/tahsilet-saas/TAHSILETService";
import {ActionList} from "@repo/ayasofyazilim-ui/molecules/action-button";
import ConfirmDialog from "@repo/ayasofyazilim-ui/molecules/confirm-dialog";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {CustomMultiSelectWidget} from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import {handleDeleteResponse, handlePutResponse} from "@repo/utils/api";
import {isActionGranted, useGrantedPolicies} from "@repo/utils/policies";
import {Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {deleteUserByIdApi} from "@repo/actions/tahsilet/TahsiletService/delete-actions";
import {putUserApi} from "@repo/actions/tahsilet/TahsiletService/put-actions";
import type {IdentityServiceResource} from "src/language-data/core/IdentityService";

type UserFormDto = Volo_Abp_Identity_IdentityUserDto & {
  roleNames?: string[] | null;
};

export default function Form({
  languageData,
  userDetailsData,
  roleList,
  userRoles,
}: {
  languageData: IdentityServiceResource;
  userDetailsData: Volo_Abp_Identity_IdentityUserDto;
  roleList: Volo_Abp_Identity_IdentityRoleDto[];
  userRoles: Volo_Abp_Identity_IdentityRoleDto[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {grantedPolicies} = useGrantedPolicies();

  const uiSchema = createUiSchemaWithResource({
    schema: $Volo_Abp_Identity_IdentityUserUpdateDto,
    resources: languageData,
    name: "Form.User",
    extend: {
      roleNames: {
        "ui:widget": "Role",
      },
      userName: {
        "ui:className": "md:col-span-2",
      },
      password: {
        "ui:widget": "password",
      },
      email: {
        "ui:widget": "email",
      },
      phoneNumber: {
        "ui:widget": "phone",
      },
      isActive: {
        "ui:widget": "switch",
      },
      lockoutEnabled: {
        "ui:widget": "switch",
      },
      "ui:className": "md:grid md:grid-cols-2 md:gap-2",
    },
  });
  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <ActionList>
        {isActionGranted(["AbpIdentity.Users.Delete"], grantedPolicies) && (
          <ConfirmDialog
            closeProps={{
              children: languageData.Cancel,
            }}
            confirmProps={{
              variant: "destructive",
              children: languageData.Delete,
              onConfirm: () => {
                startTransition(() => {
                  void deleteUserByIdApi(userDetailsData.id || "").then((res) => {
                    handleDeleteResponse(res, router, "../users");
                  });
                });
              },
              closeAfterConfirm: true,
            }}
            description={languageData["Delete.Assurance"]}
            title={languageData["User.Delete"]}
            triggerProps={{
              children: (
                <>
                  <Trash2 className="mr-2 w-4" /> {languageData.Delete}
                </>
              ),
              variant: "outline",
              disabled: isPending,
            }}
            type="with-trigger"
          />
        )}
      </ActionList>
      <SchemaForm<UserFormDto>
        className="flex flex-col gap-4"
        disabled={isPending}
        filter={{
          type: "include",
          sort: true,
          keys: [
            "userName",
            "name",
            "surname",
            "password",
            "email",
            "phoneNumber",
            "roleNames",
            "isActive",
            "lockoutEnabled",
          ],
        }}
        formData={{
          ...userDetailsData,
          roleNames: userRoles.map((role) => role.name || ""),
        }}
        onSubmit={({formData}) => {
          startTransition(() => {
            void putUserApi({
              id: userDetailsData.id || "",
              requestBody: {
                ...formData,
                userName: formData?.userName || "",
                email: formData?.email || "",
              },
            }).then((res) => {
              handlePutResponse(res, router, "../users");
            });
          });
        }}
        schema={$Volo_Abp_Identity_IdentityUserUpdateDto}
        submitText={languageData["Edit.Save"]}
        uiSchema={uiSchema}
        widgets={{
          Role: CustomMultiSelectWidget({
            optionList: roleList.map((role) => ({
              label: role.name || "",
              value: role.name || "",
            })),
          }),
        }}
      />
    </div>
  );
}
