from typing import Dict, List, Union
from youtube_transcript_api import YouTubeTranscriptApi

def get_flashcards_file_substr() -> str:
    file_substr = "flashcards"
    with open(f"prompt-for-{file_substr}.txt", "w") as f:
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
    return file_substr

def get_quizzes_file_substr() -> str:
    file_substr = "quizzes"
    with open(f"prompt-for-{file_substr}.txt", "w") as f:
        f.write("""
        consider the following web video transcripts, dileneated by their sourcePlatformId.
        the sourcePlatformName for all of these is "YouTube Shorts".
        please generate at least one QuizItem per transcript,
        and ten in total.
        these ten QuizItems should be organized into a single Quiz.
        a flash card has a question on the front and the answer on the back.
        organize the flash cards as JSON data following the format below:
        ```Prisma
            model PossibleAnswer {
                id   Int
                text String
            }

            model QuizItem {
                id           Int
                questionText        String
                correctAnswerId     String
                possibleAnswerIds   Int[]
            }

            model Quiz {
                id                 Int
                quizItemIds        Int[]
                sourcePlatformId   String
                sourcePlatformName String
            }
        ```
        """)
    return file_substr

def main() -> None:
    TimeRangeWithText = Dict[str, Union[float, str]]
    video_ids = ["6C9JsyfDBe8", "pmgYUxba0cc", "t4Kndozwnms", "1Vv0PkSsA0k", "-1vqVgtjDOM"]

    flashcards_file_substr = get_flashcards_file_substr()
    quizzes_file_substr = get_quizzes_file_substr()

    for video_id in video_ids:
        transcript: List[TimeRangeWithText] = YouTubeTranscriptApi.get_transcript(
            video_id, languages=["en"]
        )

        # idk if space joining is necessary before sending to LLM
        # but, i did so it looks the same as what I manually pasted into ChatGPT UI
        transcript_text = " ".join([item["text"] for item in transcript])
        prompt_text  = transcript_text

        with open(f"prompt-for-{flashcards_file_substr}.txt", "a") as f:
            f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
            f.write(f"\ntext: {prompt_text}")
            # TODO: send prompt.txt to LLM, validate result is JSON,
            # and save to flashcards.json

        with open(f"prompt-for-{quizzes_file_substr}.txt", "a") as f:
            f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
            f.write(f"\ntext: {prompt_text}")
            # TODO: send prompt.txt to LLM, validate result is JSON,
            # and save to flashcards.json


if __name__ == "__main__":
    main()
