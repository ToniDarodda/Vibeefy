import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { EnvConfigService } from 'src/utils/env.utils';

@Injectable()
export class LinkService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(private envConfigService: EnvConfigService) {
    const { bucket, accessKey, region, secretKey } =
      this.envConfigService.getS3Connector();
    this.bucketName = bucket;
    this.s3 = new AWS.S3({
      region,
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });
  }

  async fileExists(objectKey: string): Promise<boolean> {
    const params = { Bucket: this.bucketName, Key: objectKey };

    try {
      await this.s3.headObject(params).promise();
      return true;
    } catch (error) {
      if (error.code === 'NotFound') {
        return false;
      }
      throw new HttpException('S3 Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPresignedUrl(objectKey: string): Promise<string> {
    if (!(await this.fileExists(objectKey))) {
      throw new HttpException('File does not exist', HttpStatus.BAD_REQUEST);
    }

    const params = { Bucket: this.bucketName, Key: objectKey, Expires: 60 * 5 };
    return await this.s3.getSignedUrlPromise('getObject', params);
  }
}
