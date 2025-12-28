export class HTTPError extends Error {
  constructor(
    public readonly StatusCode: number,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "HTTPError";
  }
}
