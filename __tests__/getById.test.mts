import { describe, beforeEach, it, expect } from 'vitest';
import { getByIdHandler } from '../src/handlers/getById.mjs';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';


describe('Test getByIdHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    it('should get item by id', async () => {
        const item = { id: 'id1' };

        // Return the specified value whenever the spied get function is called 
        ddbMock.on(GetCommand).resolves({
            Item: item,
        });

        const event = {
            httpMethod: 'GET',
            pathParameters: {
                id: 'id1'
            }
        } as unknown as APIGatewayProxyEvent;

        const result = await getByIdHandler(event, {} as Context, {} as Callback);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(item)
        };

        expect(result).toEqual(expectedResult);
    });
});
