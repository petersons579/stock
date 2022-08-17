import { Request, Response } from 'express';
import SearchBarcodeService from '../../../services/SearchBarcodeService';

export default class SearcBarCodeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { barcode } = request.params;

    const searchService = new SearchBarcodeService();

    const results = await searchService.execute(barcode);

    return response.json(results);
  }
}
