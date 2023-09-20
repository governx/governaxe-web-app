import { env } from "../../env.mjs";
import { isSnapshotError } from "../type-guards";
import { getFollowsQuery } from "./queries/follows";

const endpoint = env.NEXT_PUBLIC_SNAPSHOT_GRAPHQL_API_ENDPOINT;

type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export async function snapshotFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables }),
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isSnapshotError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

export async function getFollows(address: string): Promise<any | undefined> {
  const res = await snapshotFetch<any>({
    query: getFollowsQuery,
    variables: { address },
    cache: "no-store",
  });

  return res.body;
}
