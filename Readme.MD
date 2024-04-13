Step 1:
Create a IAM User in AWS and then create access key

Step 2:
Install package serverless globally
Install package serverless-http locally

Step 3:
Create local configuration of aws access key with serverless using command:
"serverless config credentials --provider aws --key <Access Key> --secret <Access Secret Key>

Step 4:
Create a basic aws-nodejs template using command > serverless create -t aws-nodejs

Step 5:
Configure serverless.yml file according to your need, add all env variables, and read the comments properly

Step 6:
Add a script 'serverless deploy' in your package.json file and run the command to deploy it.
