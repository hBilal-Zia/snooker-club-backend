import { ApiResponse } from "../dtos/response.dto";

export function successApiResponse<T>(
    message: string,
    data?: T
): ApiResponse<T> {
    return {
        success: true,
        message,
        data,
    };
}

export function failureApiResponse<T>(
    message: string,
    error?: string
): ApiResponse<T> {
    return {
        success: false,
        message,
        error,
    };
}
