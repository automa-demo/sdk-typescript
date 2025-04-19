import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

export type Headers = Record<string, string | null | undefined>;

export type RequestOptions<T> = AxiosRequestConfig<T>;

export abstract class APIClient {
  baseURL: string;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  protected defaultHeaders(): Headers {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  get<ResponseData>(uri: string, options?: RequestOptions<undefined>) {
    return this.method<ResponseData, undefined>('GET', uri, options);
  }

  post<ResponseData, RequestData>(
    uri: string,
    data: RequestData,
    options?: RequestOptions<RequestData>,
  ) {
    return this.method<ResponseData, RequestData>('POST', uri, {
      data,
      ...options,
    });
  }

  method<ResponseData, RequestData>(
    method: Method,
    uri: string,
    options?: RequestOptions<RequestData>,
  ) {
    return axios.request<
      ResponseData,
      AxiosResponse<ResponseData, RequestData>,
      RequestData
    >({
      method,
      url: uri,
      baseURL: this.baseURL,
      headers: {
        ...this.defaultHeaders(),
        ...options?.headers,
      },
      ...options,
    });
  }
}
