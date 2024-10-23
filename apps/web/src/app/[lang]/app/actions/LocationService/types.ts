import type {
  UniRefund_LocationService_AddressCommonDatas_AddressCommonDataUpdateDto,
  UniRefund_LocationService_Cities_CityDto,
  UniRefund_LocationService_Countries_CountryDto,
  UniRefund_LocationService_Regions_RegionDto,
} from "@ayasofyazilim/saas/LocationService";

export type AddressUpdateDto =
  UniRefund_LocationService_AddressCommonDatas_AddressCommonDataUpdateDto;
export type CountryDto = UniRefund_LocationService_Countries_CountryDto;
export type RegionDto = UniRefund_LocationService_Regions_RegionDto;
export type CityDto = UniRefund_LocationService_Cities_CityDto;
export interface SelectedAddressField {
  countryId: string;
  regionId: string;
  cityId: string;
}
