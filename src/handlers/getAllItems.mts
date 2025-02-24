
import * as ddb from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { dClient, tableName } from '../db.mjs';


export const getAllItemsHandler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
    let response: APIGatewayProxyResult;
    try {
        const data = await dClient.send(new ddb.ScanCommand({
            TableName: tableName
        }));

        response = {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        };
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
