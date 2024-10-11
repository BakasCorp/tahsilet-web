import type { NavbarItemsFromDB } from "@repo/ui/theme/types";

export const management: NavbarItemsFromDB[] = [
  {
    key: "management",
    displayName: "Management",
    description: "View and manage your management settings.",
    href: "management/openiddict/applications",
    icon: "management",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "management/openiddict",
    displayName: "OpenIdDict",
    description: "Manage Open ID dict settings.",
    href: "management/openiddict/applications",
    icon: "id",
    parentNavbarItemKey: "management",
    displayOrder: 1,
  },
  {
    key: "management/openiddict/applications",
    displayName: "Applications",
    description: "Manage applications within Open Id Dict.",
    href: "management/openiddict/applications",
    icon: "app",
    parentNavbarItemKey: "management/openiddict",
    displayOrder: 1,
  },
  {
    key: "management/openiddict/scopes",
    displayName: "Scopes",
    description: "View and manage scopes for Open Id Dict.",
    href: "management/openiddict/scopes",
    icon: "scope",
    parentNavbarItemKey: "management/openiddict",
    displayOrder: 1,
  },
  {
    key: "management/admin",
    displayName: "Admin",
    description: "Access administrative tools and settings.",
    href: "management/admin/languages",
    icon: "management",
    parentNavbarItemKey: "management",
    displayOrder: 1,
  },
  {
    key: "management/admin/languages",
    displayName: "Languages",
    description: "Manage language settings and translations.",
    href: "management/admin/languages",
    icon: "language",
    parentNavbarItemKey: "management/admin",
    displayOrder: 1,
  },
  {
    key: "management/admin/language-texts",
    displayName: "LanguageTexts",
    description: "Edit and review language texts.",
    href: "management/admin/language-texts",
    icon: "book",
    parentNavbarItemKey: "management/admin",
    displayOrder: 1,
  },
  {
    key: "management/saas",
    displayName: "Saas",
    description: "Manage SaaS configurations and settings.",
    href: "management/saas/edition",
    icon: "management",
    parentNavbarItemKey: "management",
    displayOrder: 1,
  },
  {
    key: "management/saas/edition",
    displayName: "Edition",
    description: "Manage SaaS editions and plans.",
    href: "management/saas/edition",
    icon: "edition",
    parentNavbarItemKey: "management/saas",
    displayOrder: 1,
  },
  {
    key: "management/saas/tenant",
    displayName: "Tenant",
    description: "Manage SaaS tenant settings and configurations.",
    href: "management/saas/tenant",
    icon: "globe",
    parentNavbarItemKey: "management/saas",
    displayOrder: 1,
  },
  {
    key: "management/identity",
    displayName: "Identity",
    description: "Manage user identities and roles.",
    href: "management/identity/role",
    icon: "management",
    parentNavbarItemKey: "management",
    displayOrder: 1,
  },
  {
    key: "management/identity/role",
    displayName: "Role",
    description: "Manage user roles and permissions.",
    href: "management/identity/role",
    icon: "role",
    parentNavbarItemKey: "management/identity",
    displayOrder: 1,
  },
  {
    key: "management/identity/user",
    displayName: "User",
    description: "Manage user accounts and profiles.",
    href: "management/identity/user",
    icon: "identity",
    parentNavbarItemKey: "management/identity",
    displayOrder: 1,
  },
  {
    key: "management/identity/claim-type",
    displayName: "ClaimType",
    description: "Manage claim types for user identities.",
    href: "management/identity/claim-type",
    icon: "scan",
    parentNavbarItemKey: "management/identity",
    displayOrder: 1,
  },
  {
    key: "management/identity/security-logs",
    displayName: "SecurityLogs",
    description: "View security logs and audit trails.",
    href: "management/identity/security-logs",
    icon: "lock",
    parentNavbarItemKey: "management/identity",
    displayOrder: 1,
  },
  {
    key: "management/identity/organization",
    displayName: "Organization",
    description: "Manage organizational settings and structure.",
    href: "management/identity/organization",
    icon: "building",
    parentNavbarItemKey: "management/identity",
    displayOrder: 1,
  },
  {
    key: "management/audit-logs/audit-logs",
    displayName: "AuditLogs",
    description: "View and analyze audit logs.",
    href: "management/audit-logs/audit-logs",
    icon: "log",
    parentNavbarItemKey: "management",
    displayOrder: 1,
  },
  {
    key: "management/text-templates/text-templates",
    displayName: "TextTemplates",
    description: "Manage and create text templates.",
    href: "management/text-templates/text-templates",
    icon: "text",
    parentNavbarItemKey: "management",
    displayOrder: 1,
  },
];
export const settings: NavbarItemsFromDB[] = [
  {
    key: "settings",
    displayName: "Settings",
    description: "Access settings settings and tools.",
    href: "settings/product/vats",
    icon: "settings",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "settings/product",
    displayName: "Product",
    description: "Configure VAT settings and rules.",
    href: "settings/product/vats",
    icon: "settings",
    parentNavbarItemKey: "settings",
    displayOrder: 1,
  },
  {
    key: "settings/product/vats",
    displayName: "VAT",
    description: "Manage VAT settings and rates.",
    href: "settings/product/vats",
    icon: "vat",
    parentNavbarItemKey: "settings/product",
    displayOrder: 1,
  },
  {
    key: "settings/product/product-groups",
    displayName: "ProductGroup",
    description: "Manage product groups and categories.",
    href: "settings/product/product-groups",
    icon: "product",
    parentNavbarItemKey: "settings/product",
    displayOrder: 1,
  },
  {
    key: "settings/product/product-groups-vats",
    displayName: "ProductGroupVAT",
    description: "Manage VAT settings for product groups.",
    href: "settings/product/product-groups-vats",
    icon: "productGroup",
    parentNavbarItemKey: "settings/product",
    displayOrder: 1,
  },
  {
    key: "settings/tenant",
    displayName: "Tenant",
    description: "Manage settings for tenants.",
    href: "settings/tenant",
    icon: "settings",
    parentNavbarItemKey: "settings",
    displayOrder: 1,
  },
  {
    key: "settings/templates",
    displayName: "Templates",
    description: "Manage templates.",
    href: "settings/templates",
    icon: "layer",
    parentNavbarItemKey: "settings",
    displayOrder: 1,
  },
  {
    key: "settings/templates/refund-fees",
    displayName: "RefundFees",
    description: "Manage refund fees",
    href: "settings/templates/refund-fees",
    icon: "settings",
    parentNavbarItemKey: "settings/templates",
    displayOrder: 1,
  },
  {
    key: "settings/templates/refund-tables",
    displayName: "RefundTables",
    description: "Manage refund tables",
    href: "settings/templates/refund-tables",
    icon: "settings",
    parentNavbarItemKey: "settings/templates",
    displayOrder: 1,
  },
  {
    key: "settings/templates/rebate",
    displayName: "rebate",
    description: "Manage rebate",
    href: "settings/templates/rebate",
    icon: "settings",
    parentNavbarItemKey: "settings/templates",
    displayOrder: 1,
  },
];
export const parties: NavbarItemsFromDB[] = [
  {
    key: "parties",
    displayName: "Parties",
    description: "Manage customer relationship management settings.",
    href: "parties/merchants",
    icon: "layer",
    parentNavbarItemKey: "/",
    displayOrder: 1,
  },
  {
    key: "parties/merchants",
    displayName: "Merchants",
    description: "Manage merchant accounts and details.",
    href: "parties/merchants",
    icon: "shop",
    parentNavbarItemKey: "parties",
    displayOrder: 1,
  },
  {
    key: "parties/refund-points",
    displayName: "RefundPoints",
    description: "Manage refund points and settings.",
    href: "parties/refund-points",
    icon: "refund",
    parentNavbarItemKey: "parties",
    displayOrder: 1,
  },
  {
    key: "parties/customs",
    displayName: "Customs",
    description: "Manage customs settings and configurations.",
    href: "parties/customs",
    icon: "container",
    parentNavbarItemKey: "parties",
    displayOrder: 1,
  },
  {
    key: "parties/tax-free",
    displayName: "TaxFree",
    description: "Manage tax-free settings and exemptions.",
    href: "parties/tax-free",
    icon: "tax",
    parentNavbarItemKey: "parties",
    displayOrder: 1,
  },
  {
    key: "parties/tax-offices",
    displayName: "TaxOffices",
    description: "Manage tax office details and settings.",
    href: "parties/tax-offices",
    icon: "taxOffice",
    parentNavbarItemKey: "parties",
    displayOrder: 1,
  },
  {
    key: "parties/individuals",
    displayName: "Individuals",
    description: "Manage individuals.",
    href: "parties/individuals",
    icon: "user",
    parentNavbarItemKey: "parties",
    displayOrder: 1,
  },
  {
    key: "parties/traveller",
    displayName: "Traveller",
    description: "Manage traveller-related settings.",
    href: "parties/traveller",
    icon: "plane",
    parentNavbarItemKey: "parties",
    displayOrder: 1,
  },
];
export const contracts: NavbarItemsFromDB[] = [
  {
    key: "contracts/contracts",
    displayName: "Contracts",
    description: "View and manage contract details.",
    href: "contracts/contracts",
    icon: "dashboard",
    parentNavbarItemKey: "contracts",
    displayOrder: 1,
  },
  {
    key: "contracts/rebate",
    displayName: "Rebate",
    description: "Manage rebate settings and configurations.",
    href: "contracts/rebate/company-settings",
    icon: "percent",
    parentNavbarItemKey: "contracts",
    displayOrder: 1,
  },
  {
    key: "contracts/rebate/company-settings",
    displayName: "CompanySettings",
    description: "Manage company-specific rebate settings.",
    href: "contracts/rebate/company-settings",
    icon: "settings",
    parentNavbarItemKey: "contracts/rebate",
    displayOrder: 1,
  },
  {
    key: "contracts/rebate/templates",
    displayName: "Templates",
    description: "Manage rebate templates and configurations.",
    href: "contracts/rebate/templates",
    icon: "template",
    parentNavbarItemKey: "contracts/rebate",
    displayOrder: 1,
  },
  {
    key: "contracts/refund",
    displayName: "Refund",
    description: "Manage refund settings and details.",
    href: "contracts/refund/refund-tables",
    icon: "refund",
    parentNavbarItemKey: "contracts",
    displayOrder: 1,
  },
  {
    key: "contracts/refund/refund-tables",
    displayName: "RefundTables",
    description: "Manage refund tables and configurations.",
    href: "contracts/refund/refund-tables",
    icon: "table",
    parentNavbarItemKey: "contracts/refund",
    displayOrder: 1,
  },
  {
    key: "contracts/refund/refund-fees",
    displayName: "RefundFees",
    description: "Manage refund fees and settings.",
    href: "contracts/refund/refund-fees",
    icon: "refund",
    parentNavbarItemKey: "contracts/refund",
    displayOrder: 1,
  },
];
