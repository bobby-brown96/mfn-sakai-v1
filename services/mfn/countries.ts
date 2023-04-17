import type { AxiosInstance } from 'axios'
import { MfnService } from './mfn.service'

export class CountryMfn extends MfnService {
  constructor(protected api: AxiosInstance) {
    super(api)
  }

  async getAllCountries() {
    return await this._get({
      path: '/lists/countries/list',
    })
  }
}
