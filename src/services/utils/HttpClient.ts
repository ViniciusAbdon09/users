type optionsRequest = {
  method: string;
  body?: any;
  headers?: {
    [chave: string]: string,
  }
}

class HttpClient {
  constructor(public baseURL: string = "") { }

  async makeRequest(path: string, options: optionsRequest) {
    const headers = new Headers();

    if(options.body){
      headers.append("Content-Type", "application/json");
    }

    if(options.headers){
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      })
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    const contentType = response.headers.get("Content-Type");

    let responseBody = null;

    if (contentType?.includes("application/json")) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new Error(
      responseBody?.error ?? `${response.status} - ${response.statusText}`
    );
   }
}

export default HttpClient;
