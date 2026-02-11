export interface RegisterStartRequest {
    email: string;
    password: string;
    password_confirmation: string;
}

export interface RegisterVerifyRequest {
    registration_token: string;
    code: string; // OTP 6 dígitos
}

export interface RegisterCompleteRequest {
    registration_token: string;
    first_name: string;
    last_name: string;
    username?: string;
    phone?: string;
    date_of_birth?: string; // YYYY-MM-DD
}

/** ========== Responses ========== */
export interface RegisterStartResponse {
    message: string;
    data: {
        registration_token: string;
        email: string;
        expires_at: string;
    };
}

export interface RegisterVerifyResponse {
    message: string;
    data: {
        registration_token: string;
        verified_at: string;
    };
}

export interface RegisterCompleteResponse {
    message: string;
    data: {
        user_id: number;
        email: string;
    };
}