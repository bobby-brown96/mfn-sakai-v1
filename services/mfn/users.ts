import type { AxiosInstance } from "axios";
import { MfnService } from "./mfn.service";

export class UserMfn extends MfnService {
  constructor(protected api: AxiosInstance) {
    super(api);
  }
}
