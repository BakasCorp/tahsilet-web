import type {
  TahsilEt_Members_ListMemberResponseDto,
  TahsilEt_Transactions_ExecutePaymentDto,
} from "@ayasofyazilim/tahsilet-saas/TAHSILETService";
import {
  $TahsilEt_Members_ListMemberResponseDto,
  $TahsilEt_Transactions_ExecutePaymentDto,
} from "@ayasofyazilim/tahsilet-saas/TAHSILETService";
import type {
  TanstackTableColumnLink,
  TanstackTableCreationProps,
  TanstackTableRowActionsType,
  TanstackTableTableActionsType,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {handlePostResponse, handlePutResponse} from "@repo/utils/api";
import type {Policy} from "@repo/utils/policies";
import {isActionGranted} from "@repo/utils/policies";
import {LucidePanelTopClose, Plus, Trash2} from "lucide-react";
import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {deleteMemberByIdApi} from "src/actions/core/TahsiletService/delete-actions";
import {
  postTransactionClosePaymentsFifoApi,
  postTransactionExecutePaymentApi,
} from "src/actions/core/TahsiletService/post-actions";
import type {IdentityServiceResource} from "src/language-data/core/IdentityService";

type MembersTable = TanstackTableCreationProps<TahsilEt_Members_ListMemberResponseDto>;
const links: Partial<Record<keyof TahsilEt_Members_ListMemberResponseDto, TanstackTableColumnLink>> = {};

function membersTableActions(
  languageData: IdentityServiceResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
) {
  const actions: TanstackTableTableActionsType[] = [];
  if (isActionGranted(["TahsilEt.Members.Save"], grantedPolicies)) {
    actions.push({
      type: "simple",
      actionLocation: "table",
      cta: languageData["Member.New"],
      icon: Plus,
      onClick: () => {
        router.push("members/new");
      },
    });
  }
  return actions;
}

function membersRowActions(
  languageData: IdentityServiceResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
) {
  const actions: TanstackTableRowActionsType<TahsilEt_Members_ListMemberResponseDto>[] = [];

  if (isActionGranted(["TahsilEt.Transactions.Update"], grantedPolicies)) {
    actions.push({
      type: "custom-dialog",
      actionLocation: "row",
      cta: languageData["Payment.New"],
      title: languageData["Payment.New"],
      icon: Plus,
      content: (row) => (
        <SchemaForm<TahsilEt_Transactions_ExecutePaymentDto>
          className="flex flex-col gap-4"
          filter={{
            type: "include",
            sort: true,
            keys: ["amount"],
          }}
          onSubmit={({formData}) => {
            if (!formData) return;
            void postTransactionExecutePaymentApi({
              requestBody: {
                ...formData,
                memberId: row.id || "",
              },
            }).then((res) => {
              handlePostResponse(res, router);
            });
          }}
          schema={$TahsilEt_Transactions_ExecutePaymentDto}
          submitText={languageData.Save}
          uiSchema={createUiSchemaWithResource({
            schema: $TahsilEt_Transactions_ExecutePaymentDto,
            resources: languageData,
            name: "Form.Transaction",
          })}
        />
      ),
    });
  }
  if (isActionGranted(["TahsilEt.Transactions.Update"], grantedPolicies)) {
    actions.push({
      type: "confirmation-dialog",
      cta: languageData["Transaction.Close"],
      title: languageData["Transaction.Close"],
      actionLocation: "row",
      confirmationText: languageData.Save,
      cancelText: languageData.Cancel,
      description: languageData["Transaction.Close.Description"],
      icon: LucidePanelTopClose,
      onConfirm: (row) => {
        void postTransactionClosePaymentsFifoApi({
          requestBody: {memberId: row.id || ""},
        }).then((res) => {
          handlePostResponse(res, router);
        });
      },
    });
  }
  if (isActionGranted(["TahsilEt.Members.Delete"], grantedPolicies)) {
    actions.push({
      type: "confirmation-dialog",
      cta: languageData.Delete,
      title: languageData.Delete,
      actionLocation: "row",
      confirmationText: languageData.Save,
      cancelText: languageData.Cancel,
      description: languageData["Delete.Assurance"],
      icon: Trash2,
      onConfirm: (row) => {
        void deleteMemberByIdApi({
          id: row.id || "",
          requestBody: {
            idType: row.idType,
            identifier: row.identifier,
          },
        }).then((res) => {
          handlePutResponse(res, router);
        });
      },
    });
  }
  return actions;
}
const membersColumns = (
  locale: string,
  languageData: IdentityServiceResource,
  grantedPolicies: Record<Policy, boolean>,
) => {
  if (isActionGranted(["TahsilEt.Members.Update"], grantedPolicies)) {
    links.identifier = {
      prefix: "members",
      targetAccessorKey: "id",
      suffix: "/details",
    };
  }
  return tanstackTableCreateColumnsByRowData<TahsilEt_Members_ListMemberResponseDto>({
    rows: $TahsilEt_Members_ListMemberResponseDto.properties,
    languageData: {
      languageData,
      constantKey: "Form.Member",
    },
    config: {
      locale,
    },
    links,
  });
};

function membersTable(
  languageData: IdentityServiceResource,
  router: AppRouterInstance,
  grantedPolicies: Record<Policy, boolean>,
) {
  const table: MembersTable = {
    fillerColumn: "identifier",
    pinColumns: ["identifier"],
    columnVisibility: {
      type: "show",
      columns: ["name", "surname", "type", "idType", "identifier", "title", "mail", "tel"],
    },
    columnOrder: ["type", "idType", "identifier", "name", "surname", "title", "mail", "tel"],
    filters: {
      textFilters: ["name", "surname", "mail", "tel"],
    },
    tableActions: membersTableActions(languageData, router, grantedPolicies),
    rowActions: membersRowActions(languageData, router, grantedPolicies),
  };
  return table;
}
export const tableData = {
  members: {
    columns: membersColumns,
    table: membersTable,
  },
};
