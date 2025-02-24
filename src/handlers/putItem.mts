import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { dClient, tableName } from '../db.mjs';


export const putItemHandler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    let response: APIGatewayProxyResult;
    try {
        const body = JSON.parse(event.body!);
        const { id, name } = body;

        const data = await dClient.send(new PutCommand({
            TableName: tableName,
            Item: { id, name },
        }));

        response = {
            statusCode: 200,
            body: JSON.stringify(body)
        };

        console.log("Success - item added or updated", data);
    } catch (err) {
        console.error("Error: ", err.stack);

        response = {
            statusCode: 500,
            body: "Internal Server Error",
        };
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
