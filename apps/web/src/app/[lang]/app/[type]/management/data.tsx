import { toast } from "@/components/ui/sonner";
import { $Volo_Abp_Identity_IdentityUserDto } from "@ayasofyazilim/saas/AccountService";
import {
  $Volo_Abp_AuditLogging_AuditLogDto,
  $Volo_Abp_LanguageManagement_Dto_CreateLanguageDto,
  $Volo_Abp_LanguageManagement_Dto_LanguageDto,
  $Volo_Abp_LanguageManagement_Dto_LanguageTextDto,
  $Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto,
  $Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto,
} from "@ayasofyazilim/saas/AdministrationService";
import type {
  Volo_Abp_Identity_IdentityRoleDto,
  Volo_Abp_Identity_IdentityUserUpdatePasswordInput,
  Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto,
  Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto,
  Volo_Abp_Users_UserData,
} from "@ayasofyazilim/saas/IdentityService";
import {
  $Volo_Abp_Identity_ClaimTypeDto,
  $Volo_Abp_Identity_CreateClaimTypeDto,
  $Volo_Abp_Identity_IdentityRoleCreateDto,
  $Volo_Abp_Identity_IdentityRoleDto,
  $Volo_Abp_Identity_IdentityRoleUpdateDto,
  $Volo_Abp_Identity_IdentitySecurityLogDto,
  $Volo_Abp_Identity_IdentityUserCreateDto,
  $Volo_Abp_Identity_IdentityUserUpdateDto,
  $Volo_Abp_Identity_IdentityUserUpdatePasswordInput,
  $Volo_Abp_Identity_OrganizationUnitDto,
  $Volo_Abp_Identity_UpdateClaimTypeDto,
  $Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto,
  $Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto,
  $Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput,
  $Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput,
  $Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput,
  $Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto,
  $Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput,
} from "@ayasofyazilim/saas/IdentityService";
import type {
  GetApiSaasEditionsResponse,
  Volo_Saas_Host_Dtos_EditionDto,
  Volo_Saas_Host_Dtos_SaasTenantDto,
  Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto,
} from "@ayasofyazilim/saas/SaasService";
import {
  $Volo_Saas_Host_Dtos_EditionCreateDto,
  $Volo_Saas_Host_Dtos_EditionDto,
  $Volo_Saas_Host_Dtos_EditionUpdateDto,
  $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
  $Volo_Saas_Host_Dtos_SaasTenantDto,
  $Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto,
  $Volo_Saas_Host_Dtos_SaasTenantUpdateDto,
} from "@ayasofyazilim/saas/SaasService";
import { createZodObject } from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import { CustomCombobox } from "@repo/ayasofyazilim-ui/organisms/auto-form";
import type { AutoFormInputComponentProps } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/types";
import { DependencyType } from "node_modules/@repo/ayasofyazilim-ui/src/organisms/auto-form/types";
import { useEffect, useState } from "react";
import { z } from "zod";
import type { ErrorTypes } from "src/lib";
import type { DataConfigArray } from "src/types";
import { getBaseLink } from "src/utils";
import {
  getAllRolesApi,
  moveAllUsersApi,
} from "../../actions/IdentityService/actions";
import {
  putApplicationTokenLifetimeApi,
  putUserChangePasswordApi,
} from "../../actions/IdentityService/put-actions";
import {
  getAllEditionsApi,
  moveAllTenantsApi,
} from "../../actions/SaasService/actions";
import { putTenantSetPasswordApi } from "../../actions/SaasService/put-actions";

export const dataConfig: DataConfigArray = {
  openiddict: {
    displayName: "Open Id",
    default: "applications",
    pages: {
      applications: {
        title: "Application",
        detailedFilters: [
          {
            name: "filter",
            displayName: "Client Id",
            type: "string",
            value: "",
          },
        ],
        createFormSchema: {
          formPositions: [
            "applicationType",
            "clientId",
            "displayName",
            "clientUri",
            "logoUri",
            "clientType",
            "clientSecret",
            "allowAuthorizationCodeFlow",
            "allowImplicitFlow",
            "allowHybridFlow",
            "allowPasswordFlow",
            "allowClientCredentialsFlow",
            "allowRefreshTokenFlow",
            "allowDeviceEndpoint",
            "extensionGrantTypes",
            "scopes",
          ],
          schema: $Volo_Abp_OpenIddict_Applications_Dtos_CreateApplicationInput,
          convertors: {
            clientType: {
              data: ["public", "confidential"],
              type: "static",
            },
            applicationType: {
              data: ["web", "native"],
              type: "static",
            },
          },

          dependencies: [
            {
              sourceField: "clientType",
              type: DependencyType.HIDES,
              targetField: "clientSecret",
              when: (activationState: string) =>
                activationState !== "confidential",
            },
            {
              sourceField: "clientType",
              type: DependencyType.HIDES,
              targetField: "allowClientCredentialsFlow",
              when: (activationState: string) => activationState === "public",
            },
            {
              sourceField: "clientType",
              type: DependencyType.HIDES,
              targetField: "allowDeviceEndpoint",
              when: (activationState: string) => activationState === "public",
            },
          ],
        },
        tableSchema: {
          excludeList: [
            "id",
            "concurrencyStamp",
            "regexDescription",
            "extraProperties",
            "valueTypeAsString",
            "clientUri",
            "logoUri",
            "allowAuthorizationCodeFlow",
            "allowImplicitFlow",
            "allowHybridFlow",
            "allowPasswordFlow",
            "allowClientCredentialsFlow",
            "allowRefreshTokenFlow",
            "allowDeviceEndpoint",
            "extensionGrantTypes",
            "allowLogoutEndpoint",
            "scopes",
            "clientSecret",
            "consentType",
          ],
          schema: $Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto,
          actionList: () => [
            {
              type: "Dialog",
              cta: "Token Lifetime",
              description: "Token Lifetime",
              componentType: "Autoform",
              autoFormArgs: {
                submit: {
                  cta: "Save",
                },
                formSchema: createZodObject(
                  $Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto,
                ),
              },

              callback: (values, triggerData, onOpenChange) => {
                const _values =
                  values as Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto;
                const _triggerData =
                  triggerData as Volo_Abp_OpenIddict_Applications_Dtos_ApplicationDto;

                const putApplicationTokenLifetime = async (
                  tokenLifetimeData: Volo_Abp_OpenIddict_Applications_Dtos_ApplicationTokenLifetimeDto,
                  applicationId: string,
                ) => {
                  const response = await putApplicationTokenLifetimeApi({
                    id: applicationId,
                    requestBody: tokenLifetimeData,
                  });

                  if (response.type === "success") {
                    toast.success("Token lifetime updated successfully.");
                    onOpenChange && onOpenChange(false);
                  } else {
                    toast.error(
                      response.message || "Failed to update token lifetime.",
                    );
                  }
                };
                void putApplicationTokenLifetime(
                  _values,
                  _triggerData.id || "",
                );
              },
            },
          ],
        },
        editFormSchema: {
          formPositions: [
            "applicationType",
            "clientId",
            "displayName",
            "clientUri",
            "logoUri",
            "clientType",
            "clientSecret",
            "allowAuthorizationCodeFlow",
            "allowImplicitFlow",
            "allowHybridFlow",
            "allowPasswordFlow",
            "allowClientCredentialsFlow",
            "allowRefreshTokenFlow",
            "allowDeviceEndpoint",
            "extensionGrantTypes",
            "scopes",
          ],
          schema: $Volo_Abp_OpenIddict_Applications_Dtos_UpdateApplicationInput,
          convertors: {
            clientType: {
              data: ["public", "confidential"],
              type: "static",
            },
            applicationType: {
              data: ["web", "native"],
              type: "static",
            },
          },
          dependencies: [
            {
              sourceField: "clientType",
              type: DependencyType.HIDES,
              targetField: "clientSecret",
              when: (activationState: string) =>
                activationState !== "confidential",
            },
            {
              sourceField: "clientType",
              type: DependencyType.HIDES,
              targetField: "allowClientCredentialsFlow",
              when: (activationState: string) => activationState === "public",
            },
            {
              sourceField: "clientType",
              type: DependencyType.HIDES,
              targetField: "allowDeviceEndpoint",
              when: (activationState: string) => activationState === "public",
            },
          ],
        },
      },
      scopes: {
        title: "Scope",
        detailedFilters: [
          { name: "filter", displayName: "Search", type: "string", value: "" },
        ],
        createFormSchema: {
          formPositions: ["name", "displayName", "description"],
          schema: $Volo_Abp_OpenIddict_Scopes_Dtos_CreateScopeInput,
        },
        tableSchema: {
          excludeList: ["id", "buildIn"],
          schema: $Volo_Abp_OpenIddict_Scopes_Dtos_ScopeDto,
          actionList: () => [],
        },

        editFormSchema: {
          formPositions: ["name", "displayName", "description"],
          schema: $Volo_Abp_OpenIddict_Scopes_Dtos_UpdateScopeInput,
        },
      },
    },
  },
  admin: {
    displayName: "Admin Management",
    default: "languages",
    pages: {
      languages: {
        title: "Language",
        detailedFilters: [
          { name: "filter", displayName: "Search", type: "string", value: "" },
        ],
        createFormSchema: {
          formPositions: [
            "cultureName",
            "uiCultureName",
            "displayName",
            "isEnabled",
          ],
          schema: $Volo_Abp_LanguageManagement_Dto_CreateLanguageDto,
          convertors: {
            cultureName: {
              data: async () => {
                return fetch(getBaseLink("api/admin/culture")).then((data) =>
                  data.json(),
                );
              },
              covertTo: "displayName",
              get: "displayName",
              post: "name",
              type: "async",
            },
            uiCultureName: {
              data: async () => {
                return fetch(getBaseLink("api/admin/culture")).then((data) =>
                  data.json(),
                );
              },
              covertTo: "displayName",
              get: "displayName",
              post: "name",
              type: "async",
            },
          },
        },
        tableSchema: {
          excludeList: [
            "id",
            "concurrencyStamp",
            "creationTime",
            "creatorId",
            "flagIcon",
          ],
          schema: $Volo_Abp_LanguageManagement_Dto_LanguageDto,
          actionList: (controlledFetch, getRoles) => [
            {
              type: "Action",
              cta: "Set As Default Language",
              callback: (row) => {
                if (row && typeof row === "object" && !("id" in row)) {
                  return;
                }
                const _row = row as { id: string };
                if (typeof controlledFetch !== "function") {
                  return;
                }
                void controlledFetch(
                  getBaseLink(`/api/admin/language_set_default`),
                  {
                    method: "PUT",
                    body: JSON.stringify({ id: _row.id }),
                  },
                  getRoles,
                  "Default Language Set Successfully",
                );
              },
            },
          ],
        },
        editFormSchema: {
          formPositions: ["displayName", "isEnabled"],
          schema: $Volo_Abp_LanguageManagement_Dto_UpdateLanguageDto,
        },
      },
      "language-texts": {
        title: "Language Text",
        detailedFilters: [
          { name: "filter", displayName: "Search", type: "string", value: "" },
        ],
        tableSchema: {
          excludeList: ["cultureName", "baseCultureName"],
          schema: $Volo_Abp_LanguageManagement_Dto_LanguageTextDto,
        },
      },
    },
  },
  saas: {
    displayName: "Saas Management",
    default: "edition",
    pages: {
      edition: {
        title: "Edition",
        detailedFilters: [
          {
            name: "filter",
            displayName: "Display Name",
            type: "string",
            value: "",
          },
        ],
        createFormSchema: {
          formPositions: ["displayName"],
          schema: $Volo_Saas_Host_Dtos_EditionCreateDto,
        },
        editFormSchema: {
          formPositions: ["displayName"],
          schema: $Volo_Saas_Host_Dtos_EditionUpdateDto,
        },
        tableSchema: {
          excludeList: [
            "planId",
            "id",
            "planId",
            "planName",
            "concurrencyStamp",
          ],
          schema: $Volo_Saas_Host_Dtos_EditionDto,
          actionList: () => [
            {
              type: "Dialog",
              cta: "Move All Tenants",
              description: "Move All Tenants",
              componentType: "Autoform",
              autoFormArgs: {
                submit: {
                  cta: "Move All Tenants",
                },
                formSchema: z.object({
                  editionId: z.string(),
                }),
                fieldConfig: {
                  editionId: {
                    renderer: function EditionComboboxRenderer(
                      props: AutoFormInputComponentProps,
                    ) {
                      const [editionList, setEditionList] = useState<
                        Volo_Saas_Host_Dtos_EditionDto[]
                      >([]);
                      const [errorMessage, setErrorMessage] =
                        useState<ErrorTypes>();

                      useEffect(() => {
                        const fetchEditions = async () => {
                          const editions = await getAllEditionsApi();
                          if (editions.type === "success") {
                            const updatedEditionList: Volo_Saas_Host_Dtos_EditionDto[] =
                              [
                                { id: "", displayName: "unassigned edition" },
                                ...editions.data,
                                // TODO: Add a filter to make the original edition disappear
                              ];
                            setEditionList(updatedEditionList);
                          } else {
                            setErrorMessage(editions);
                          }
                        };
                        void fetchEditions();
                      }, []);

                      return (
                        <div>
                          {!errorMessage ? (
                            <CustomCombobox<Volo_Saas_Host_Dtos_EditionDto>
                              childrenProps={props}
                              emptyValue="Select Edition"
                              list={editionList}
                              selectIdentifier="id"
                              selectLabel="displayName"
                            />
                          ) : (
                            <div className="text-muted-foreground text-md text-center">
                              {errorMessage.type +
                                (errorMessage.message ||
                                  " An error occurred please try again later.")}
                            </div>
                          )}
                        </div>
                      );
                    },
                  },
                },
              },

              callback: (values, triggerData) => {
                const _values = values as { editionId: string };
                const _triggerData =
                  triggerData as Volo_Saas_Host_Dtos_EditionDto;
                const moveAllTenants = async (
                  selectedEditionId: string,
                  currentEditionId: string,
                ) => {
                  const response = await moveAllTenantsApi({
                    id: currentEditionId,
                    editionId: selectedEditionId,
                  });
                  if (response.type === "success") {
                    toast.success("Tenants moved successfully");
                  } else {
                    toast.error(response.message || "Failed to move tenants.");
                  }
                };
                void moveAllTenants(_values.editionId, _triggerData.id || "");
              },
            },
          ],
        },
      },
      tenant: {
        title: "Tenant",
        detailedFilters: [
          { name: "filter", displayName: "Name", type: "string", value: "" },
          {
            type: "select",
            displayName: "Tenant Activation State",
            value: "",
            name: "ActivationState",
            placeholder: "Tenant Activation State",
            options: [
              { label: "Active", value: "0" },
              { label: "Active with limited time", value: "1" },
              { label: "Passive", value: "2" },
            ],
          },
          {
            name: "GetEditionNames",
            displayName: "Get Edition Name",
            type: "boolean",
            value: "",
          },
          {
            name: "ExpirationDateMin",
            displayName: "Expiration Date Min",
            type: "date",
            value: "",
          },
          {
            name: "ExpirationDateMax",
            displayName: "Expiration Date Max",
            type: "date",
            value: "",
          },
          {
            name: "ActivationEndDateMin",
            displayName: "Activation End Date Min",
            type: "string",
            value: "",
          },
          {
            name: "ActivationEndDateMax",
            displayName: "Activation End Date Max",
            type: "string",
            value: "",
          },
        ],
        createFormSchema: {
          formPositions: [
            "name",
            "editionId",
            "adminEmailAddress",
            "adminPassword",
            "activationState",
            "activationEndDate",
          ],
          schema: $Volo_Saas_Host_Dtos_SaasTenantCreateDto,
          convertors: {
            activationState: {
              data: ["Active", "Active with limited time", "Passive"],
              type: "enum",
            },
            editionId: {
              data: () => {
                return fetch(
                  getBaseLink("api/admin/edition?maxResultCount=1000"),
                )
                  .then((data) => data.json())
                  .then(
                    (jsonData: GetApiSaasEditionsResponse) => jsonData.items,
                  );
              },
              get: "displayName",
              post: "id",
              type: "async",
            },
          },
          dependencies: [
            {
              sourceField: "activationState",
              type: DependencyType.HIDES,
              targetField: "activationEndDate",
              when: (activationState: string) =>
                activationState !== "Active with limited time",
            },
          ],
        },
        tableSchema: {
          schema: $Volo_Saas_Host_Dtos_SaasTenantDto,
          excludeList: ["id", "concurrencyStamp", "editionId"],
          convertors: {
            activationState: {
              data: ["Active", "Active with limited time", "Passive"],
              type: "enum",
            },
            editionId: {
              data: () => {
                return fetch(
                  getBaseLink("api/admin/edition?maxResultCount=1000"),
                )
                  .then((data) => data.json())
                  .then(
                    (jsonData: GetApiSaasEditionsResponse) => jsonData.items,
                  );
              },
              covertTo: "editionName",
              get: "displayName",
              post: "id",
              type: "async",
            },
          },
          actionList: () => [
            {
              type: "Dialog",
              cta: "Set Password",
              description: "Set Password",
              componentType: "Autoform",
              autoFormArgs: {
                submit: {
                  cta: "Save",
                },
                formSchema: createZodObject(
                  $Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto,
                ),
                fieldConfig: {
                  password: {
                    fieldType: "password",
                  },
                },
                values: {
                  username: "admin",
                },
              },

              callback: (values, triggerData, onOpenChange) => {
                const _values =
                  values as Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto;
                const _triggerData =
                  triggerData as Volo_Saas_Host_Dtos_SaasTenantDto;
                const putTenantSetPassword = async (
                  tenantId: string,
                  data: Volo_Saas_Host_Dtos_SaasTenantSetPasswordDto,
                ) => {
                  const response = await putTenantSetPasswordApi({
                    id: tenantId,
                    requestBody: data,
                  });

                  if (response.type === "success") {
                    toast.success(
                      "Username and Password updated successfully.",
                    );
                    onOpenChange && onOpenChange(false);
                  } else {
                    toast.error(
                      response.message ||
                        "Failed to update username and password.",
                    );
                  }
                };
                void putTenantSetPassword(_triggerData.id || "", _values);
              },
            },
          ],
        },
        editFormSchema: {
          formPositions: [
            "name",
            "editionId",
            "activationState",
            "activationEndDate",
          ],
          schema: $Volo_Saas_Host_Dtos_SaasTenantUpdateDto,
          convertors: {
            activationState: {
              data: ["Active", "Active with limited time", "Passive"],
              type: "enum",
            },
            editionId: {
              data: () => {
                return fetch(
                  getBaseLink("api/admin/edition?maxResultCount=1000"),
                )
                  .then((data) => data.json())
                  .then(
                    (jsonData: GetApiSaasEditionsResponse) => jsonData.items,
                  );
              },
              covertTo: "editionName",
              get: "displayName",
              post: "id",
              type: "async",
            },
          },

          dependencies: [
            {
              sourceField: "activationState",
              type: DependencyType.HIDES,
              targetField: "activationEndDate",
              when: (activationState: string) =>
                activationState !== "Active with limited time",
            },
          ],
        },
      },
    },
  },
  identity: {
    displayName: "Identity Management",
    default: "role",
    pages: {
      role: {
        title: "Role",
        detailedFilters: [
          {
            name: "filter",
            displayName: "Name",
            type: "string",
            value: "",
          },
        ],
        createFormSchema: {
          formPositions: ["name", "isDefault", "isPublic"],
          schema: $Volo_Abp_Identity_IdentityRoleCreateDto,
        },
        editFormSchema: {
          formPositions: ["name", "isDefault", "isPublic"],
          schema: $Volo_Abp_Identity_IdentityRoleUpdateDto,
        },
        tableSchema: {
          excludeList: ["id", "extraProperties", "concurrencyStamp"],
          schema: $Volo_Abp_Identity_IdentityRoleDto,
          actionList: () => [
            {
              type: "Dialog",
              cta: "Move All Users",
              description: "Move All Users",
              componentType: "Autoform",
              autoFormArgs: {
                submit: {
                  cta: "Move All Users",
                },
                formSchema: z.object({
                  roleId: z.string(),
                }),
                fieldConfig: {
                  roleId: {
                    renderer: function RoleComboboxRenderer(
                      props: AutoFormInputComponentProps,
                    ) {
                      const [roleList, setRolesList] = useState<
                        Volo_Abp_Identity_IdentityRoleDto[]
                      >([]);
                      const [errorMessage, setErrorMessage] =
                        useState<ErrorTypes>();
                      useEffect(() => {
                        const fetchRoles = async () => {
                          const roles = await getAllRolesApi();
                          if (roles.type === "success") {
                            const updatedRoleList: Volo_Abp_Identity_IdentityRoleDto[] =
                              [
                                { id: "", name: "unassigned role" },
                                ...(roles.data.items || []),
                                // TODO: Add a filter to make the original role disappear
                              ];
                            setRolesList(updatedRoleList);
                          } else {
                            setErrorMessage(roles);
                          }
                        };
                        void fetchRoles();
                      }, []);

                      return (
                        <div>
                          {!errorMessage ? (
                            <CustomCombobox<Volo_Abp_Identity_IdentityRoleDto>
                              childrenProps={props}
                              emptyValue="Select role"
                              list={roleList}
                              selectIdentifier="id"
                              selectLabel="name"
                            />
                          ) : (
                            <div className="text-muted-foreground text-md text-center">
                              {errorMessage.type +
                                (errorMessage.message ||
                                  " An error occurred please try again later.")}
                            </div>
                          )}
                        </div>
                      );
                    },
                  },
                },
              },
              callback: (values, triggerData) => {
                const _values = values as { roleId: string };
                const _triggerData =
                  triggerData as Volo_Abp_Identity_IdentityRoleDto;
                const moveAllUsers = async (
                  selectedRoleId: string,
                  currentRoleId: string,
                ) => {
                  const response = await moveAllUsersApi({
                    id: currentRoleId,
                    roleId: selectedRoleId,
                  });
                  if (response.type === "success") {
                    toast.success("Users moved successfully");
                  } else {
                    toast.error(response.message);
                  }
                };
                void moveAllUsers(_values.roleId, _triggerData.id || "");
              },
            },
          ],
        },
      },
      user: {
        title: "User",
        detailedFilters: [
          { name: "filter", displayName: "Search", type: "string", value: "" },
          {
            name: "UserName",
            displayName: "User Name",
            type: "string",
            value: "",
          },
          {
            name: "Name",
            displayName: "Name",
            type: "string",
            value: "",
          },
          {
            name: "Surname",
            displayName: "Surname",
            type: "string",
            value: "",
          },
          {
            name: "EmailAddress",
            displayName: "Email Address",
            type: "string",
            value: "",
          },
          {
            name: "PhoneNumber",
            displayName: "Phone Number",
            type: "string",
            value: "",
          },
          {
            name: "IsLockedOut",
            displayName: "Is Locked Out",
            type: "boolean",
            value: "",
          },
          {
            name: "NotActive",
            displayName: "Not Active",
            type: "boolean",
            value: "",
          },
          {
            name: "EmailConfirmed",
            displayName: "Email Confirmed",
            type: "boolean",
            value: "",
          },
          {
            name: "IsExternal",
            displayName: "Is External",
            type: "boolean",
            value: "",
          },
          {
            name: "MaxCreationTime",
            displayName: "Max Creation Time",
            type: "date",
            value: "",
          },
          {
            name: "MinCreationTime",
            displayName: "Min Creation Time",
            type: "date",
            value: "",
          },
          {
            name: "MaxModifitionTime",
            displayName: "Max Modifition Time",
            type: "date",
            value: "",
          },
          {
            name: "MinModifitionTime",
            displayName: "Min Modifition Time",
            type: "date",
            value: "",
          },
        ],
        createFormSchema: {
          formPositions: ["email", "password", "userName"],
          schema: $Volo_Abp_Identity_IdentityUserCreateDto,
        },
        editFormSchema: {
          formPositions: ["email", "userName"],
          schema: $Volo_Abp_Identity_IdentityUserUpdateDto,
        },
        tableSchema: {
          excludeList: [
            "id",
            "deleterId",
            "isDeleted",
            "deletionTime",
            "tenantId",
            "extraProperties",
            "concurrencyStamp",
            "creatorId",
            "shouldChangePasswordOnNextLogin",
            "isLockedOut",
            "phoneNumberConfirmed",
            "lastModificationTime",
            "lastModifierId",
            "lockoutEnabled",
            "lockoutEnd",
          ],
          schema: $Volo_Abp_Identity_IdentityUserDto,
          actionList: () => [
            {
              type: "Dialog",
              cta: "Set Password",
              description: "Set Password",
              componentType: "Autoform",
              autoFormArgs: {
                submit: {
                  cta: "Save",
                },
                formSchema: createZodObject(
                  $Volo_Abp_Identity_IdentityUserUpdatePasswordInput,
                ),
                fieldConfig: {
                  newPassword: {
                    fieldType: "password",
                  },
                },
              },

              callback: (values, triggerData, onOpenChange) => {
                const _values =
                  values as Volo_Abp_Identity_IdentityUserUpdatePasswordInput;
                const _triggerData = triggerData as Volo_Abp_Users_UserData;
                const putUserChangePassword = async (
                  userId: string,
                  data: Volo_Abp_Identity_IdentityUserUpdatePasswordInput,
                ) => {
                  const response = await putUserChangePasswordApi({
                    id: userId,
                    requestBody: data,
                  });

                  if (response.type === "success") {
                    toast.success("Password updated successfully.");
                    onOpenChange && onOpenChange(false);
                  } else {
                    toast.error(
                      response.message || "Failed to update password.",
                    );
                  }
                };
                void putUserChangePassword(_triggerData.id || "", _values);
              },
            },
          ],
        },
      },
      "claim-type": {
        title: "Claim Type",
        detailedFilters: [
          { name: "filter", displayName: "Search", type: "string", value: "" },
        ],
        createFormSchema: {
          formPositions: [
            "name",
            "required",
            "regex",
            "regexDescription",
            "description",
            "valueType",
          ],
          schema: $Volo_Abp_Identity_CreateClaimTypeDto,
          convertors: {
            valueType: {
              data: ["String", "Int", "Boolean", "DateTime"],
              type: "enum",
            },
          },
        },
        tableSchema: {
          excludeList: [
            "id",
            "concurrencyStamp",
            "regexDescription",
            "extraProperties",
            "valueTypeAsString",
          ],
          schema: $Volo_Abp_Identity_ClaimTypeDto,
          convertors: {
            valueType: {
              data: ["String", "Int", "Boolean", "DateTime"],
              type: "enum",
            },
          },
        },
        editFormSchema: {
          formPositions: [
            "name",
            "required",
            "regex",
            "regexDescription",
            "description",
            "valueType",
          ],
          schema: $Volo_Abp_Identity_UpdateClaimTypeDto,
          convertors: {
            valueType: {
              data: ["String", "Int", "Boolean", "DateTime"],
              type: "enum",
            },
          },
        },
      },
      "security-logs": {
        title: "Security Logs",
        detailedFilters: [
          {
            name: "startTime",
            displayName: "Start Time",
            type: "date",
            value: "",
          },
          { name: "endTime", displayName: "End Time", type: "date", value: "" },
          {
            name: "userName",
            displayName: "User Name",
            type: "string",
            value: "",
          },
          {
            name: "applicationName",
            displayName: "Application Name",
            type: "string",
            value: "",
          },
          {
            name: "clientId",
            displayName: "Client Id",
            type: "string",
            value: "",
          },
          {
            name: "identity",
            displayName: "Identity",
            type: "string",
            value: "",
          },
          {
            name: "correlationId",
            displayName: "Correlation Id",
            type: "string",
            value: "",
          },
          {
            name: "action",
            displayName: "Action",
            type: "string",
            value: "",
          },
        ],
        tableSchema: {
          excludeList: [
            "id",
            "concurrencyStamp",
            "regexDescription",
            "extraProperties",
            "valueTypeAsString",
          ],
          schema: $Volo_Abp_Identity_IdentitySecurityLogDto,
        },
      },
      organization: {
        title: "Organization",
        tableSchema: {
          schema: $Volo_Abp_Identity_OrganizationUnitDto,
        },
      },
    },
  },
  "audit-logs": {
    displayName: "Audit Logs",
    default: "audit-logs",
    pages: {
      "audit-logs": {
        title: "Audit Logs",
        detailedFilters: [
          {
            name: "startTime",
            displayName: "Start Time",
            type: "date",
            value: "",
          },
          { name: "endTime", displayName: "End Time", type: "date", value: "" },
          {
            name: "userName",
            displayName: "User Name",
            type: "string",
            value: "",
          },
          { name: "Url", displayName: "Url", type: "string", value: "" },
          {
            name: "applicationName",
            displayName: "Application Name",
            type: "string",
            value: "",
          },
          {
            name: "clientIpAddress",
            displayName: "Client Ip Address",
            type: "string",
            value: "",
          },
          {
            name: "httpMethod",
            displayName: "Http Method",
            type: "string",
            value: "",
          },
          {
            name: "minExecutionDuration",
            displayName: "Min Execution Duration",
            type: "number",
            value: "",
          },
          {
            name: "maxExecutionDuration",
            displayName: "Max Execution Duration",
            type: "number",
            value: "",
          },
          {
            name: "correlationId",
            displayName: "Correlation Id",
            type: "string",
            value: "",
          },
        ],
        tableSchema: {
          excludeList: [
            "id",
            "userId",
            "tenantId",
            "tenantName",
            "impersonatorUserId",
            "impersonatorUserName",
            "impersonatorTenantId",
            "impersonatorTenantName",
            "clientName",
            "browserInfo",
            "exceptions",
            "comments",
            "correlationId",
          ],
          schema: $Volo_Abp_AuditLogging_AuditLogDto,
        },
      },
    },
  },
  "text-templates": {
    displayName: "Text Templates",
    default: "text-templates",
    pages: {
      "text-templates": {
        title: "Text Templates",
        detailedFilters: [
          {
            name: "FilterText",
            displayName: "Display Name",
            type: "string",
            value: "",
          },
        ],
        tableSchema: {
          excludeList: ["name", "additionalProperties"],
          schema:
            $Volo_Abp_TextTemplateManagement_TextTemplates_TemplateDefinitionDto,
        },
      },
    },
  },
};
