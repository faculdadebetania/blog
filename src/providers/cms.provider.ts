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

export async function fetchCMS<T extends z.Schema>(
  props: Props<T>
): Promise<z.infer<T>> {
  const { uri, method, schema, params, tag } = props;

  try {
    const URI = new URL(CMS_API_URL + uri);

    if (params && method === "GET") {
      Object.entries(params).forEach(([key, value]) => {
        if (value == null) return;

        if (Array.isArray(value)) {
          value.forEach((v) =>
            URI.searchParams.append(key, String(v))
          );
        } else {
          URI.searchParams.append(key, String(value));
        }
      });
    }

    const headers = new Headers();

    headers.append(
      "Authorization",
      `Bearer ${CMS_API_TOKEN}`
    );

    headers.append(
      "Content-Type",
      "application/json"
    );

    const requestInit: RequestInit & {
      next?: {
        tags?: string[];
        revalidate?: number;
      };
    } = {
      method,
      headers,
      next: {
        tags: tag ? [tag] : undefined,
        revalidate: 3600,
      },
    };

    if (params && method === "POST") {
      requestInit.body = JSON.stringify(params);
    }

    const response = await fetch(
      decodeURIComponent(URI.toString()),
      requestInit
    );

    if (!response.ok) {
      throw new Error(
        `CMS request failed: ${response.status}`
      );
    }

    const body = await response.json();

    const parsed = CMS_SCHEMA.parse(body);

    if (parsed.error) {
      throw new Error(parsed.error.message);
    }

    return schema.parse(parsed.data);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unknown error";

    console.error(message, {
      uri,
      params,
    });

    throw error;
  }
}