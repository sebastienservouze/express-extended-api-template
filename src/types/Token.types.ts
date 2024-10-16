export interface AccessTokenPayload extends RefreshTokenPayload {
    [key: string]: any; // D'autres propriétés peuvent être ajoutées
}

export interface RefreshTokenPayload {
    sub: string;        // Identifiant de l'utilisateur (subject)
    iat?: number;       // Timestamp du moment où le token a été émis (issued at)
    exp?: number;       // Timestamp de l'expiration du token
}

