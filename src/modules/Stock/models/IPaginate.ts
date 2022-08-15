import { IStock } from './IStock';

export interface IPaginate {
  total: number;
  data: IStock[];
}
