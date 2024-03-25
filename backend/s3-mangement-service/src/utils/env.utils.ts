import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService {
  constructor(private configService: ConfigService) {}

  getS3Connector() {
    const region = this.configService.get<string>('REGION');
    const accessKey = this.configService.get<string>('ACCESSKEYID');
    const secretKey = this.configService.get<string>('SECRETACCESSKEY');
    const bucket = this.configService.get<string>('BUCKETNAME');

    return { bucket, region, accessKey, secretKey };
  }

  getPort() {
    const port = this.configService.get<string>('PORT');
    const origin = this.configService.get<string>('ORIGIN');

    return { port, origin };
  }
}
