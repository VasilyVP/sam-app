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

### Locally

To start development in a watch mode with local services
```bash
npm run dev:local
```

### Remote resources

To start development in a watch mode with remote resources
```bash
npm run dev:sync {{stack-name}} // e.g. dev, feature-myfeature
```

## Deploy from local

To build and deploy application locally for the first time run the following:

```bash
sam build
sam deploy --guided
```

## CI/CD

1. Push to GitHub to the branch: `prod`, `test`, `dev` or `feature/...`
2. CD creates proper Lambda app, API gateway and DynamoDB table like `sam-app-dev` or `sam-app-feature-my_feature` and `Sample-dev` DynamoDB table.

Pushing code to prod additionally triggers integration tests.

```bash
my-application$ sam build
```

## Invoke single function without running sam api server (only for JS)

Run functions locally and invoke them with the `sam local invoke` command.

```bash
my-application$ sam local invoke putItemFunction --event events/event-post-item.json
my-application$ sam local invoke getAllItemsFunction --event events/event-get-all-items.json
```

## Check SAM template

```bash
npm run validate
```

## Run unit tests

```bash
npm run test
```
