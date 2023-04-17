import type { AxiosInstance } from "axios";
import { MfnService } from "./mfn.service";
//import axios from "axios";

export interface LoginDto {
  username: string;

  password: string;
}

export class AuthMfn extends MfnService {
  constructor(protected api: AxiosInstance) {
    super(api);
  }

  async login({
    username,
    password
  }: LoginDto): Promise<{ message: string; name: string }> {
    console.log(`username check: ${username}`);
    const loginRes = await this._post({
      path: "/admin/login",
      body: { username, password }
    });

    console.log(`loginRes check: ${JSON.stringify(loginRes)}`);

    return loginRes;
  }
}
