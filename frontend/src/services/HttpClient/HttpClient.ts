import { IHttpClient, IHttpClientResponse } from "./IHttpClient";

class HttpClient implements IHttpClient {

    private static _instance: HttpClient;
    private readonly _headers: Headers;
    private readonly _baseUrl: string;

    private constructor() {

        this._headers = new Headers();

        if (Object.prototype.hasOwnProperty.call(process.env, 'REACT_APP_API_CONTENT_TYPE_DEFAULT')
            && process.env.REACT_APP_API_CONTENT_TYPE_DEFAULT) {

            this._headers.append("Content-Type", process.env.REACT_APP_API_CONTENT_TYPE_DEFAULT);
        }

        this._baseUrl = process.env.REACT_APP_BASE_URL_API || '';
    }

    private static buildQueryUrl(url: string): string {

        let newUrl = null;
        newUrl = url;
        // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {

        //     const urlPars = url.split('?');
        //     const stringParams = urlPars.length > 1 ? urlPars.pop() : undefined;
        //     const searchParams = new URLSearchParams(stringParams);

        //     if ((Object.prototype.hasOwnProperty.call(process.env, 'REACT_APP_DEBUG_PARAM_NAME') && process.env.REACT_APP_DEBUG_PARAM_NAME)
        //         && (Object.prototype.hasOwnProperty.call(process.env, 'REACT_APP_DEBUG_PARAM_VALUE') && process.env.REACT_APP_DEBUG_PARAM_VALUE)) {

        //         searchParams.append(
        //             process.env.REACT_APP_DEBUG_PARAM_NAME,
        //             process.env.REACT_APP_DEBUG_PARAM_VALUE
        //         );
        //     }

        //     newUrl = urlPars.concat([searchParams.toString()]).join('?');
        // }

        return newUrl;
    }

    public static getInstance(): HttpClient {

        if (!HttpClient._instance) {

            HttpClient._instance = new HttpClient();
        }

        return HttpClient._instance;
    }

    get headers(): Headers {

        return this._headers;
    }

    get baseUrl(): string {

        return this._baseUrl;
    }

    private async handleResponse(response: Response) {

        const { code, data } = await response.json();
        return { code, data } as IHttpClientResponse;
    }

    setToken(token: string): void {

        this.headers.delete('Authorization');
        this.headers.append('Authorization', `Bearer ${token}`);
    }

    async get(url: string): Promise<IHttpClientResponse> {

        const res = await fetch(HttpClient.buildQueryUrl(`${this.baseUrl}${url}`), { headers: this.headers });
        return await this.handleResponse(res);
    }

    async delete(url: string): Promise<IHttpClientResponse> {

        const options = {
            headers: this.headers,
            method: 'delete'
        };

        const res = await fetch(HttpClient.buildQueryUrl(`${this.baseUrl}${url}`), options);
        return await this.handleResponse(res);
    }

    async post(url: string, data: string): Promise<IHttpClientResponse> {

        const options = {
            headers: this.headers,
            method: 'post',
            body: data
        };

        const res = await fetch(HttpClient.buildQueryUrl(`${this.baseUrl}${url}`), options);
        return await this.handleResponse(res);
    }

    async put(url: string, data: string): Promise<IHttpClientResponse> {

        const options = {
            headers: this.headers,
            method: 'put',
            body: data
        };

        const res = await fetch(HttpClient.buildQueryUrl(`${this.baseUrl}${url}`), options);
        return await this.handleResponse(res);
    }
}

export default HttpClient;