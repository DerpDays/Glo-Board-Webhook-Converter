import * as http from 'http';


interface Options {
    inflate?: boolean;
    limit?: number | string;
    type?: string | string[] | ((req: http.IncomingMessage) => any);
    verify?(req: http.IncomingMessage, res: http.ServerResponse, buf: Buffer, encoding: string): void;
}

declare module 'http' {
    interface IncomingMessage {
        buf?: any;
    }
}