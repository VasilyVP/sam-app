
import * as ddb from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { dClient, tableName } from '../../db.mts';
import { GetResponseJson, InternalErrorResponse } from '../../Response.ts';


export const getAllItemsHandler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
    let response: APIGatewayProxyResult;

    try {
        const data = await dClient.send(new ddb.ScanCommand({
            TableName: tableName
        }));

        response = new GetResponseJson(data.Items);
    } catch (err) {
        console.error("Error: ", err.stack);

        response = new InternalErrorResponse();
    }

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
