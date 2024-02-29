from concurrent.futures import ThreadPoolExecutor
from enum import Enum

from fastapi import FastAPI

from ytmusicapi import YTMusic
import yt_dlp


app = FastAPI(docs_url="/api")
yt = YTMusic()
executor = ThreadPoolExecutor()

class ActionPostDownload(yt_dlp.postprocessor.common.PostProcessor):
    def __init__(self):
        super(ActionPostDownload, self).__init__(None)
        self.filenames = []

    def run(self, information) -> None:
        if information['__real_download'] == False:
            # File already downloaded or not downloaded at all
            pass
        print("Downloaded: ", f"{information['__finaldir']}/{information['filepath']}")
        # TODO: Run Lambda here ...

ydl = yt_dlp.YoutubeDL({
    "quiet": True,
    "format": "bestaudio",
    "outtmpl": "%(title)s.%(ext)s",
})
ydl.add_post_processor(ActionPostDownload())


class SearchFilter(str, Enum):
    songs = "songs"
    videos = "videos"
    albums = "albums"
    artists = "artists"
    playlists = "playlists"
    community_playlists = "community_playlists"
    featured_playlists = "featured_playlists"
    uploads = "uploads"
    no_filter = None


@app.get("/search")
def search(query: str, filter: SearchFilter = SearchFilter.songs):
    search_results = yt.search(query, filter=filter)
    return [
        {
            "title": songs["title"],
            "id": songs["videoId"],
            "artists": songs["artists"][0],
            "featured_artists": songs["artists"][1:],
            "album": songs["album"],
            "link": f"https://music.youtube.com/watch?v={songs['videoId']}",
            "duration_seconds": songs["duration_seconds"],
            "thumbnails": songs["thumbnails"][0]["url"].split('=w')[0],
        } for songs in search_results
    ]

@app.get("/download")
def download(link: str, download: bool = False):
    info_dict = ydl.extract_info(link, download=False)
    if download:
        def download_video(link):
            ydl.download([link])
        executor.submit(download_video, link)
    return {"stream_url": info_dict.get("url")}

@app.get("/ping")
def pong():
    return {"ping": "pong"}