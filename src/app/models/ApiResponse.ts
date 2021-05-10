export interface ApiResponse {
  count: number;
  Message: string;
  SearchCriteria: any;
  Results: Results[];
}

export interface Results {
  Country?: string;
  Mfr_CommonName?: string;
  Mfr_ID?: number;
  Mfr_Name?: string;
  VehicleTypes?: VehicleTypes[];
  Make_ID?: number;
  Make_Name?: string;
}

interface VehicleTypes {
  IsPrimary: boolean;
  Name: string;
}

export interface TableData {
  ID: number;
  'Common Name': string;
  Country: string;
};
