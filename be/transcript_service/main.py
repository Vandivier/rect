from typing import Dict, List, Union
from youtube_transcript_api import YouTubeTranscriptApi

TimeRangeWithText = Dict[str, Union[float, str]]
video_id = "1Vv0PkSsA0k"
transcript: List[TimeRangeWithText] = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
print(transcript)
