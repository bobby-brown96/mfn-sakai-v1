import type { AxiosInstance } from "axios";
import axios from "axios";

export type TMap = {
  [key: string]: string | number | boolean;
};

export interface IQueryParam {
  key: string;
  value: string;
}

interface IBaseMfnRequest {
  path: string;
  query?: TMap;
}

export interface IGetMfnRequest extends IBaseMfnRequest {}

export interface IPostMfnRequest extends IBaseMfnRequest {
  body?: TMap;
}

export class MfnService {
    constructor(protected api: AxiosInstance) {}
  
    private BASE_URL = "http://localhost:3000/api";
  
    protected async _get({ path, query }: IGetMfnRequest) {
      try {
        let qs;
        if (query) {
          qs = await this.objToQueryString(query);
        }
  
        const getPath = qs ? path + "?" + qs : path;
  
        const { data } = await this.api({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          url: this.BASE_URL + getPath
        });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`axios error ${JSON.stringify(error)}`);
          console.log(error.status);
          console.error(error.response);
          // Do something with this error...
        } else {
          console.log(`non axios error ${JSON.stringify(error)}`);
          console.error(error);
        }
      }
    }
  
    protected async _post({ path, query, body }: IPostMfnRequest) {
      try {
        console.log(`check header : ${JSON.stringify(this.api.head)}`);
        let qs;
        if (query) {
          qs = await this.objToQueryString(query);
        }
  
        const bodyCheck = JSON.stringify(body);
        console.log(`bodyCheck: ${bodyCheck}`);
  
        const postPath = qs ? path + "?" + qs : path;
  
        const { data } = await this.api({
          maxBodyLength: Infinity,
          method: "post",
          url: this.BASE_URL + postPath,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: bodyCheck
        });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(`axios error ${JSON.stringify(error)}`);
          console.log(error.status);
          console.error(error.response);
          // Do something with this error...
        } else {
          console.log(`non axios error ${JSON.stringify(error)}`);
          console.error(error);
        }
      }
    }
  
    private async objToQueryString(obj: TMap): Promise<string> {
      const keyValuePairs = [];
  
      // Convert the object into an array of key-value pairs
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          keyValuePairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
        }
      }
  
      // Join the key-value pairs into a string with "&" as the separator
      return keyValuePairs.join("&");
    }
  }