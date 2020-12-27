import { expect as expectCDK, haveResource } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Infrastructure from '../lib/infrastructure-stack';

test('Test Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Infrastructure.InfrastructureStack(app, 'MyTestStack', {
      staticWebsiteBucketName: "bucket1"
    });
    // THEN
    expectCDK(stack).to(haveResource("AWS::Lambda::Function", {
      FunctionName: "MyTestStack-api"
    }));
    expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi"));
    expectCDK(stack).to(haveResource("AWS::S3::Bucket", {
      BucketName: "bucket1",
      CorsConfiguration: {
          CorsRules: [
              {
                  AllowedHeaders: ["*"],
                  AllowedMethods: [
                      "GET",
                      "PUT",
                      "HEAD",
                      "POST",
                      "DELETE",
                  ],
                  AllowedOrigins: ["*"],
              }
          ]
      },
      WebsiteConfiguration: {
          ErrorDocument: "index.html",
          IndexDocument: "index.html"
      }
  }));
});
