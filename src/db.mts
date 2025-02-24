import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';


export const tableName = process.env.DB_TABLE;
const dynamodbEndpoint = process.env.DYNAMO_DB_ENDPOINT;

const dbClient = new DynamoDBClient({
    endpoint: dynamodbEndpoint || undefined,
});

export const dClient = DynamoDBDocumentClient.from(dbClient);
