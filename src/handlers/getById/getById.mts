import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda";
import { dClient, tableName } from '../../db.mjs';


export const getByIdHandler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> = async (event) => {
    let response: APIGatewayProxyResult;
    try {
        // Get id from pathParameters from APIGateway because of `/{id}` at template.yaml
        const id = event.pathParameters?.id;

        const data = await dClient.send(new GetCommand({
            TableName: tableName,
            Key: { id: id },
        }));

        response = {
            statusCode: 200,
            body: JSON.stringify(data.Item),
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
