declare namespace NodeJS {
  export interface ProcessEnv {
    TYPEORM_CONNECTION: string;
    TYPEORM_HOST: string;
    TYPEORM_USERNAME: string;
    TYPEORM_PASSWORD: string;
    TYPEORM_DATABASE: string;
    TYPEORM_PORT: string;
    TYPEORM_SYNCHRONIZE: string;
    TYPEORM_LOGGING: string;
    TYPEORM_ENTITIES: string;
    TYPEORM_SUSCRIBERS: string;
    TYPEORM_MIGRATIONS: string;
  }
}

export type Nullable<T> = T | undefined | null;
