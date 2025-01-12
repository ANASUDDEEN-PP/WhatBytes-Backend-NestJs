import { Connection } from 'typeorm';
export declare class DatabaseService {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection);
    checkConnection(): Promise<boolean>;
}
