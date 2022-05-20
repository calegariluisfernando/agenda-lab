export interface IHttpClientResponse {
    code: number,
    data?: any
}

export interface IHttpClientResponseError {
    
}

export interface IHttpClient {
    get: (url: string) => Promise<IHttpClientResponse>,
    post: (url: string, data: string) => Promise<IHttpClientResponse>,
    put: (url: string, data: string) => Promise<IHttpClientResponse>,
    delete: (url: string) => Promise<IHttpClientResponse>
}