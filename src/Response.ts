import type { JsonValue } from "type-fest";

type ResponseOptions = {
    statusCode?: number;
    body?: any;
    headers?: {
        [key: string]: string;
    };
};

export class Response {
    statusCode: number;
    body: string;
    headers?: { [key: string]: string };

    constructor({ statusCode, headers, body }: ResponseOptions = {}) {
        this.statusCode = statusCode || 200;

        this.headers = {
            ...headers
        };

        this.body = body;
    }
}

export class GetResponseJson extends Response {
    constructor(body: JsonValue) {
        super({
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
}

export class PostResponseJson extends Response {
    constructor(body: JsonValue) {
        super({
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    }
}

export class InternalErrorResponse extends Response {
    constructor({ statusCode, body }: { statusCode?: number; body?: JsonValue; } = {}) {
        super({
            statusCode: statusCode || 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : 'Internal Server Error',
        });
    }
}
