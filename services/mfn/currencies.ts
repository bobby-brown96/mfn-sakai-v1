import type { AxiosInstance } from "axios";
import { MfnService } from "./mfn.service";

export class CurrencyMfn extends MfnService {
  constructor(protected api: AxiosInstance) {
    super(api);
  }

  async getAllCurrencies(){
    const allCurrenciesRes = await this._get({
        path:'/lists/currencies/list'
    })
  }
}
