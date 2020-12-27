import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigateway";

export interface InfrastructureProps {
  staticWebsiteBucketName: string,
}

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, infrastructureProps: InfrastructureProps, props?: cdk.StackProps) {
    super(scope, id, props);

    this.createS3BucketForStaticWebsite(infrastructureProps);
    const apiLambdaFunction = this.createApiLambdaFunction(infrastructureProps);
    this.createApiGateway(apiLambdaFunction);
  }

  createS3BucketForStaticWebsite(infrastructureProps: InfrastructureProps) {
    new s3.Bucket(this, 'StaticWebsiteBucket', {
        bucketName: infrastructureProps.staticWebsiteBucketName,
        websiteIndexDocument: "index.html",
        websiteErrorDocument: "index.html",
        cors: [
            {
                allowedHeaders: ["*"],
                allowedMethods: [
                    s3.HttpMethods.GET,
                    s3.HttpMethods.PUT,
                    s3.HttpMethods.HEAD,
                    s3.HttpMethods.POST,
                    s3.HttpMethods.DELETE,
                ],
                allowedOrigins: ["*"]
            }
        ],
        publicReadAccess: true,
    });
  }

  createApiLambdaFunction(infrastructureProps: InfrastructureProps) {
    return new lambda.Function(this, "LambdaForApi", {
        functionName: this.stackName + '-api',
        runtime: lambda.Runtime.PYTHON_3_8,
        handler: "dam.aws_lambda_api.handler",
        code: lambda.Code.fromAsset('../api/src'),
        memorySize: 128,
        timeout: cdk.Duration.minutes(15),
        // environment: {

        // }
    });
  }

  createApiGateway(apiLambdaFunction: lambda.IFunction): apigateway.RestApi { 
    return new apigateway.LambdaRestApi(this, this.stackName, {                                      
        handler: apiLambdaFunction,                                                                    
        restApiName: this.stackName,
    });                                                                                                
  }                                                                                                     
}
