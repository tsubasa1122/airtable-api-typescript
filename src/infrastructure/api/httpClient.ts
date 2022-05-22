import axios from "axios";
import { IHttpClient } from "./IHttpClient";

export class HttpClient implements IHttpClient {
  TABLE_ID = process.env.AIRTABLE_TABLE_ID;
  API_KEY = process.env.AIRTABLE_API_KEY;
  // 今回はAirtableAPIのみ利用するため、ここでURLも定義する
  BASE_URL = "https://api.airtable.com/v0/";

  AIRTABLE_API_URL = `${this.BASE_URL}${this.TABLE_ID}`;

  defaultHeaderOptions = {
    Authorization: `Bearer ${this.API_KEY}`,
    ContentType: "application/json",
  };
  // インスタンスが生成されるタイミングでaxiosのデフォルト値も設定したい
  // このやり方であっているか分からない
  private readonly axios = axios.create({
    baseURL: this.AIRTABLE_API_URL,
    headers: this.defaultHeaderOptions,
  });

  get = async <T>(path: string): Promise<T> => {
    const response = await this.axios.get(path);
    return response.data;
  };

  post = async <T>(path: string, data: T): Promise<void> => {
    await this.axios.post(path, data);
  };
}
