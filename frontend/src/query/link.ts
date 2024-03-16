import { useQuery } from '@tanstack/react-query';
import { linkService } from '../services/link';

const QueryKeyGetLink = 'GET_LINK_KEY';

export function useS3Link(songId: string) {
  return useQuery({
    queryKey: [QueryKeyGetLink, songId],
    queryFn: () => linkService.getLinkFromS3(songId),
    enabled: !!songId,
    retry: 3,
  });
}
