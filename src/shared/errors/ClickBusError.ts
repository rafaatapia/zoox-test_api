class ClickBusError {
  public readonly code: string;

  public readonly message: string;

  public readonly statusCode = 500;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }
}

export default ClickBusError;
