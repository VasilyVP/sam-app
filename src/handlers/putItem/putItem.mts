import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { dClient, tableName } from '../../db.mjs';
import { InternalErrorResponse, PostResponseJson } from '../../Response.ts';


export const putItemHandler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
    let response: APIGatewayProxyResult;

    try {
        const body = JSON.parse(event.body!);
        const { id, name } = body;

        const data = await dClient.send(new PutCommand({
            TableName: tableName,
            Item: { id, name },
        }));

        response = new PostResponseJson(body);

        console.log("Success - item added or updated", data);
    } catch (err) {
        console.error("Error: ", err.stack);

        response = new InternalErrorResponse();
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
