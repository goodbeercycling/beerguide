#!/bin/bash
if [ -z "${AWS_BUCKET}" ]; then
    echo "'AWS_BUCKET' env variable not defined"
    exit 1
fi

echo "npm run build"
echo "aws s3 sync build s3://$AWS_BUCKET"
echo 'aws cloudfront create-invalidation --distribution-id ETUHWP2UWHQUQ --paths "/*"'
