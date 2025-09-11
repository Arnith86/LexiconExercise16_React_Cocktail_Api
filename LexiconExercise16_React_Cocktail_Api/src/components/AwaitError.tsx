import type { ReactElement } from "react";
import { useAsyncError } from "react-router";

export function AwaitError(): ReactElement {
  const error = useAsyncError();

  if (error instanceof Response) {
    return (
      <div>
        Error {error.status}: {error.statusText}
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Something went wrong.</div>;
}
