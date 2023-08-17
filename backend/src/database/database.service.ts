import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mysql from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private connection: mysql.Connection;

    async onModuleInit(): Promise<void> {
        this.connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'carzz',
        });
    }

    async onModuleDestroy(): Promise<void> {
        await this.connection.end();
    }

    getConnection(): mysql.Connection {
        return this.connection;
    }
}
