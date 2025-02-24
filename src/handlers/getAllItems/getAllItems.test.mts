import { describe, beforeEach, it, expect } from 'vitest';
import { getAllItemsHandler } from './getAllItems.mts';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';


describe('Test getAllItemsHandler', () => {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    it('should return ids', async () => {
        const items = [{ id: 'id1' }, { id: 'id2' }];

        ddbMock.on(ScanCommand).resolves({
            Items: items,
        });

        const event = {
            httpMethod: 'GET'
        } as APIGatewayProxyEvent;

        const result = await getAllItemsHandler(event, {} as Context, {} as Callback);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(items)
        };

        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult);
    });
}); 
