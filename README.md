# Serverless Stack Extended Backend Resources

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

Serverless Stack is authored and maintained by Frank Wang ([@fanjiewang](https://twitter.com/fanjiewang)) & Jay V ([@jayair](https://twitter.com/jayair)). [**Subscribe to our newsletter**](https://emailoctopus.com/lists/1c11b9a8-1500-11e8-a3c9-06b79b628af2/forms/subscribe) for updates on Serverless Stack. Send us an [email][Email] if you have any questions.

[Email]: mailto:contact@anoma.ly


