import axios from 'axios';
import { IBarcodeResponse, IBarcodeResponseApi } from '../models';
import AppError from '../../../shared/errors/AppError';

export default class SearchBracodeService {
  public async execute(barcode: string): Promise<IBarcodeResponse> {
    try {
      const { data } = await axios.get<IBarcodeResponseApi>(
        `${process.env.URL_API_BARCODE}/${barcode}`,
        {
          headers: {
            'X-Cosmos-Token': `${process.env.TOKEN_API_BARCODE}`,
          },
        },
      );

      return {
        description: data.description,
        barcode: data.gtin,
        unity:
          data.gtins.length > 0
            ? data.gtins[0].commercial_unit.type_packaging
            : '',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new AppError(
            'Produto não encontrado, insira as informações manualmente',
          );
        } else {
          throw new AppError('Não foi possivel completar a ação');
        }
      } else {
        throw new AppError('Não foi possivel completar a ação');
      }
    }
  }
}
