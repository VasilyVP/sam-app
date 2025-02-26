# sam-app

This project contains TypeScript setup for the AWS SAM with all dev features including local `watch` feature.
CI/CD by GitHub Actions with stack provisioning and deletion for each branch.

- `src` - Code for the application's Lambda function.
- `events` - Invocation events that you can use to invoke the function.
- `template.yaml` - A template that defines the application's AWS resources.

The application uses API Gateway API, and DynamoDB tables.

## Prepare for the development

```bash
npm run build # sam build
```

## Start development

To start development in a watch mode with local API Gateway
```bash
npm run dev
```

## Deploy the sample application

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

## Use the AWS SAM CLI to build and test locally

Build your application by using the `sam build` command.

```bash
my-application$ sam build
```

Run functions locally and invoke them with the `sam local invoke` command.

```bash
my-application$ sam local invoke putItemFunction --event events/event-post-item.json
my-application$ sam local invoke getAllItemsFunction --event events/event-get-all-items.json
```
