import { FetchS3 } from '../utils/axios';

class LinkService {
  async getLinkFromS3(musicId: string): Promise<string> {
    const formatedMusicPath = `"${musicId}.wav`;

    const { data: s3Link }: { data: string } = await FetchS3.get<string>(
      `/s3/signed-url/${formatedMusicPath}`,
    );

    return s3Link;
  }
}

export const linkService: LinkService = new LinkService();
