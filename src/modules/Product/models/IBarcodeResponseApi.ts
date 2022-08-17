export interface IBarcodeResponseApi {
  description: string;
  gtin: number;
  gtins: {
    commercial_unit: {
      type_packaging?: string;
    };
  }[];
}
