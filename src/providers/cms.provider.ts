import { CMS_SCHEMA } from "src/schemas/cms.schema";
import { z } from "zod";

const { CMS_API_URL, CMS_API_TOKEN } = process.env;

interface Props<T> {
  uri: string;
  method: "GET" | "POST";
  schema: T;
  params?: Record<string, unknown>;
  tag?: string;
}
export async function fetchCMS<T extends z.Schema>(props: Props<T>): Promise<z.infer<T>> {
  const { uri, method, schema, params, tag } = props;

  try {
    const URI = new URL(CMS_API_URL + uri);

    if (params && method === "GET") {
      Object.entries(params).forEach(([key, value]) => {
        if (!value) return;
        if (!Array.isArray(value)) return URI.searchParams.append(key, String(value));
        value.forEach((value) => URI.searchParams.append(key, String(value)));
      });
    }

    const decodedURI = decodeURIComponent(URI.toString());

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${CMS_API_TOKEN}`);

    const nextFetchRequestConfig: NextFetchRequestConfig = {};
    if (tag) nextFetchRequestConfig.tags = [tag];

    const requestInit: RequestInit = { method, headers, cache: "no-store", next: nextFetchRequestConfig };

    if (params && method === "POST") requestInit.body = JSON.stringify(params);

    const body = await fetch(decodedURI, requestInit).then((res) => res.json());

    const response = CMS_SCHEMA.parse(body);
    if (response.error) throw new Error(response.error.message);

    const result = schema.parse(response.data);

    return result;
  } catch (error) {
    let { message } = error as Error;
    console.error(message, { uri, params });
    throw error;
  }
}
