import { IProduct } from './IProduct';

export interface IPaginate {
  total: number;
  data: IProduct[];
}
