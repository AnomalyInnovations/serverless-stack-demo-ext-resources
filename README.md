# Serverless Stack Extended Backend Resources [![Seed Status](https://api.seed.run/serverless-stack/serverless-stack-demo-ext-resources/stages/prod/build_badge)](https://console.seed.run/serverless-stack/serverless-stack-demo-ext-resources)

[Serverless Stack](https://serverless-stack.com) is a free comprehensive guide to creating full-stack serverless applications. We create a [note taking app](https://demo2.serverless-stack.com) from scratch.

This repo is used in the [Best Practices section](https://serverless-stack.com/chapters/best-practices-for-building-serverless-apps.html) of the guide. It uses [SST](https://github.com/serverless-stack/serverless-stack) to deploy a [AWS CDK](https://aws.amazon.com/cdk/) app.

#### Usage

Clone this repo.

``` bash
$ git clone https://github.com/AnomalyInnovations/serverless-stack-demo-ext-resources
```

Install the dependencies.

``` bash
$ npm install
```

And deploy the CDK app using SST to your AWS account.

``` bash
$ npx sst deploy
```

Once you deploy the resources in this repo, head over to [this accompanying repo](https://github.com/AnomalyInnovations/serverless-stack-demo-ext-api) to deploy the API services.

#### Maintainers

This repo is maintained by [Serverless Stack](https://serverless-stack.com).

[Email]: mailto:hello@serverless-stack.com


