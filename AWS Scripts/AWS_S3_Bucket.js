const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
    // The file content (Base64 encoded string)
    const fileContent = event.body.fileContent;  // Assume fileContent is base64 encoded
    const fileName = event.body.fileName;  // Name of the file to store in S3
    const bucketName = 'your-bucket-name';  // Replace with your bucket name

    // Check if the necessary data exists
    if (!fileContent || !fileName) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'File content and file name are required' }),
        };
    }

    try {
        // Decode the base64 file content
        const buffer = Buffer.from(fileContent, 'base64');

        // Upload the file to S3
        const params = {
            Bucket: bucketName,
            Key: fileName,  // You can customize the file name
            Body: buffer,   // File content (Buffer)
            ContentType: 'application/pdf',  // Set appropriate MIME type
            ACL: 'public-read'  // Adjust ACL based on your use case
        };

        // Upload the file to S3
        const data = await s3.putObject(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'File uploaded successfully!',
                fileUrl: `https://${bucketName}.s3.amazonaws.com/${fileName}`,
            }),
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to upload file', error: error.message }),
        };
    }
};
