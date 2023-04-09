from typing import Dict, List, Union
from youtube_transcript_api import YouTubeTranscriptApi


def main() -> None:
    TimeRangeWithText = Dict[str, Union[float, str]]
    video_ids = ["6C9JsyfDBe8", "pmgYUxba0cc", "t4Kndozwnms", "1Vv0PkSsA0k", "-1vqVgtjDOM"]

    with open("prompt.txt", "w") as f:
        f.write("""
        consider the following web video transcripts, dileneated by their sourcePlatformId.
        the sourcePlatformName for all of these is "YouTube Shorts".
        please generate at least two flash cards per transcript,
        and ten in total.
        a flash card has a question on the front and the answer on the back.
        organize the flash cards as JSON data following the format below:
        ```Prisma
            model FlashCard {
                frontText String
                backText  String

                sourcePlatformId   String
                sourcePlatformName String
            }
        ```
                """)

    for video_id in video_ids:
        transcript: List[TimeRangeWithText] = YouTubeTranscriptApi.get_transcript(
            video_id, languages=["en"]
        )

        # idk if space joining is necessary before sending to LLM
        # but, i did so it looks the same as what I manually pasted into ChatGPT UI
        transcript_text = " ".join([item["text"] for item in transcript])
        prompt_text  = transcript_text

        with open("prompt.txt", "a") as f:
            f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
            f.write(f"\ntext: {prompt_text}")

    # TODO: send prompt.txt to LLM, validate result is JSON,
    # and save to flashcards.json


if __name__ == "__main__":
    main()
