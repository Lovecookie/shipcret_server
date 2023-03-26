export type FJwtPayload = {
    iss: string; //* email
    sub: string; //* uuid
};

export type FJwtRefreshPayload = FJwtPayload & { refreshToken: string };
