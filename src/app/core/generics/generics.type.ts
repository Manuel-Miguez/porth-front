export interface ApiResponse<T> {
  message: T | T[];
  ok: boolean;
  statusCode: number;
}

export function instanceOfApiResponse<T>(object: any): object is ApiResponse<T> {
  return 'message' in object && 'ok' in object;
}
