export type IHttpClient = {
  get<T>(path: string): Promise<T>;
  post<T>(path: string, data: T): Promise<void>;
};
