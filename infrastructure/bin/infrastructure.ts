#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InfrastructureStack } from '../lib/infrastructure-stack';

const app = new cdk.App();

function createStack(env: string) {
    const baseStackName = 'data-access-management';
    const stackDescription = 'Data Access Management';

    new InfrastructureStack(app, `${env}-${baseStackName}`, {
        staticWebsiteBucketName: `${env}.data-access-management` 
    }, {
        description: stackDescription
    });
}

createStack('dev');
createStack('test');
createStack('live');
