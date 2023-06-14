import { useEffect, useState } from "react";
function wrapPromise<T>(promise: Promise<T>): {
  read(): T | undefined | never;
} {
  let status = "pending";
  let result: T;
  let error: Error;
  let suspender = promise.then(
    (resolve: T) => {
      status = "success";
      result = resolve;
    },
    (reject: Error) => {
      status = "error";
      error = reject;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw error;
      } else if (status === "success") {
        return result;
      }
    },
  };
}

const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const res = await fetch(url);
    return (await res.json()) as T;
  } catch (e) {
    throw e;
  }
};

export const useGetData = <T>(url: string): T | undefined | never => {
  const [resource, setResource] = useState<{
    read(): T | undefined | never;
  }>({ read: () => undefined });
  useEffect(() => {
    const resource = wrapPromise<T>(fetcher<T>(url));
    setResource(resource);
  }, [url]);
  return resource?.read();
};
