import { describe, beforeEach, it, expect } from 'vitest';
import { putItemHandler } from './putItem.mjs';
import { DynamoDBDocumentClient, PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { mockClient } from "aws-sdk-client-mock";
import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';
import { PostResponseJson } from '../../Response.ts';


describe('Test putItemHandler', function () {
    const ddbMock = mockClient(DynamoDBDocumentClient);

    beforeEach(() => {
        ddbMock.reset();
    });

    // This test invokes putItemHandler() and compare the result  
    it('should add id to the table', async () => {
        const returnedItem = { id: 'id1', name: 'name1' };

        // Return the specified value whenever the spied put function is called
        ddbMock.on(PutCommand).resolves({
            returnedItem
        } as unknown as PutCommandOutput);

        const event = {
            httpMethod: 'POST',
            body: '{"id": "id1","name": "name1"}'
        } as APIGatewayProxyEvent;

        const result = await putItemHandler(event, {} as Context, {} as Callback);

        const expectedResult = new PostResponseJson(returnedItem);

        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult);
    });
});
