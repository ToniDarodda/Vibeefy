import { FetchS3 } from '../utils/axios';

class LinkService {
  async getLinkFromS3(musicId: string): Promise<string> {
    try {
      const formatedMusicPath = `${musicId}.wav`;

      const { data: s3Link }: { data: string } = await FetchS3.get<string>(
        `/s3/signed-url/${formatedMusicPath}`,
      );

      return s3Link;
    } catch (err) {
      return '';
    }
  }
}

export const linkService: LinkService = new LinkService();
