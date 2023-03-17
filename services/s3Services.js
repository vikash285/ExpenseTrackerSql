const AWS = require('aws-sdk')

exports.uploadToS3 = (data, fileName) => {
    const BUCKET_NAME = 'expensetracker1703'
    const IAM_USER_KEY = 'AKIA5TM6JRSTX2GQL7E3'
    const IAM_USER_SECRET = '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'

    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET
        // Bucket: BUCKET_NAME
    })

        var params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: data,
            ACL: 'public-read'
        }

        return new Promise((res, rej) => {
            s3bucket.upload(params, (err, s3response) => {
            if(err) {
                console.log('Something went wrong', err)
                rej(err)
            } else {
                console.log('Success', s3response)
                res(s3response.Location)
            }
        })
        })
}
