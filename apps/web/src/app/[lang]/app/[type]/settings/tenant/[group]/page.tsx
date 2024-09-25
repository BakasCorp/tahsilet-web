"use server";

import type { UniRefund_SettingService_CountrySettings_CountrySettingDto } from "@ayasofyazilim/saas/SettingService";
import { getResourceData } from "src/language-data/SettingService";
import { getSettingServiceClient } from "src/lib";
import TenantSettingsPage from "./group";
import { mockSettingsResponse } from "./mock-settings-response";

export default async function Page({
  params,
}: {
  params: { group: string; lang: string };
}) {
  const group = params.group;

  let tenantSettings: UniRefund_SettingService_CountrySettings_CountrySettingDto;
  try {
    const client = await getSettingServiceClient();
    tenantSettings =
      await client.countrySetting.getApiSettingServiceCountrySettings();
  } catch (e) {
    tenantSettings = mockSettingsResponse;
  }

  const { resources } = await getResourceData(params.lang);
  return (
    <TenantSettingsPage
      list={tenantSettings}
      path={group}
      resources={resources}
    />
  );
}
