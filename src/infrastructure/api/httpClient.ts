import axios from "axios";
import { IHttpClient } from "./IHttpClient";

// 今回はAirtableAPIのみ利用するため、ここでURLも定義する
const BASE_URL = "https://api.airtable.com/v0/";
const TABLE_ID = process.env.AIRTABLE_TABLE_ID;
const API_KEY = process.env.AIRTABLE_API_KEY;

const AIRTABLE_API_URL = `${BASE_URL}${TABLE_ID}`;

const defaultHeaderOptions = {
  Authorization: `Bearer ${API_KEY}`,
};

export class HttpClient implements IHttpClient {
  // インスタンスが生成されるタイミングでaxiosのデフォルト値も設定したい
  // このやり方であっているか分からない
  private readonly axios = axios.create({
    baseURL: AIRTABLE_API_URL,
    headers: defaultHeaderOptions,
  });

  get = async <T>(path: string): Promise<T> => {
    const response = await this.axios.get(path);
    return response.data;
  };

  post = async <T>(path: string, data: T): Promise<void> => {
    await this.axios.post(path, data);
  };
}
