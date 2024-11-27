export class WeatherApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof WeatherApiError) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
};