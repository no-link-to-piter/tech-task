export default class ServerRequestService {
    
    protected readonly DEV_API_PATH = "https://api.skilla.ru";

    protected makeQueryString(params: Object) {
        return (
            Object.keys(params)
                // @ts-ignore
                .map((key: string) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join('&')
        );
    }

    public async getResource(
        path: string, 
        getParams: Object = {}, 
        method: string = 'GET', 
        postParams: Object | null = {}, 
        headers: Object = {}) {
        const queryString = this.makeQueryString({
        ...getParams,
        }).replaceAll("%2C", ",");
        let url = `${this.DEV_API_PATH}${path}?${queryString}`;
        const params: any = { method, headers };

        console.log(postParams)

        // @ts-ignore
        if (method === 'GET' && getParams.record) {
            params.headers['Content-Type'] = 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3';
            params.headers['Content-Transfer-Encoding'] = 'binary';
            params.headers['Content-Disposition'] = 'filename="record.mp3"'
        }

        const response = await fetch(url, params);
        
        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, received ${response.status}`);
        }

        return response.json();
    }
}
  