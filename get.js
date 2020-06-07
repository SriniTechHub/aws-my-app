const AWS = require("aws-sdk");

const client = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "todos",
        Key: {
            id: event.pathParameters.id
        }
    }

    const result = await client.get(params).promise();
    if (result.Item) {
        return {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: "Couldn't find the todo item." })
        };
    }

};