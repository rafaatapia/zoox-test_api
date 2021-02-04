class PaymentError {
  public readonly source: string;

  public readonly message: string;

  public readonly statusCode: number;

  constructor(source: string, message: string, statusCode = 500) {
    this.source = source;
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default PaymentError;
