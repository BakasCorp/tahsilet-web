"use server";

import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import {getResourceData} from "src/language-data/core/IdentityService";
import {getBaseLink} from "src/utils";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    memberId: string;
    lang: string;
  };
}) {
  const {memberId, lang} = params;
  const {languageData} = await getResourceData(lang);
  const baseLink = getBaseLink(`members/${memberId}/`, lang);

  return (
    <>
      <TabLayout
        orientation="vertical"
        tabList={[
          {
            label: languageData.MemberInfo,
            href: `${baseLink}details`,
          },
          {
            label: languageData.Transactions,
            href: `${baseLink}transactions`,
          },
          {
            label: languageData.RiskReport,
            href: `${baseLink}risk`,
          },
        ]}
        variant="simple">
        {children}
      </TabLayout>
      <div className="hidden" id="page-description">
        {languageData["Member.Edit.Description"]}
      </div>
      <div className="hidden" id="page-back-link">
        {getBaseLink(`members`, lang)}
      </div>
    </>
  );
}
