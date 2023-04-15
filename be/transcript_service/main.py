import asyncio
from dotenv import load_dotenv
import json
import os
from typing import Dict, List, Union
from youtube_transcript_api import YouTubeTranscriptApi

import openai

# Replace 'custom_path/.env' with the path to your custom env file
custom_path = './.env'
load_dotenv(dotenv_path=custom_path)
openai.api_key = os.getenv("OPENAI_API_KEY")

async def get_llm_reply(query: str) -> str:
    message = "No message"
    try:
        response = openai.Completion.create(
            model="text-davinci-003", prompt=query, temperature=0.0, max_tokens=1000
        )
        message = response.choices[0].text
    except Exception as e:
        print("Error in get_llm_reply: ", e)

    return message


def get_flashcards_file_substr() -> str:
    file_substr = "flashcards"
    with open(f"outputs/prompt-for-{file_substr}.txt", "w") as f:
        f.write(
            """
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
        """
        )
    return file_substr


def get_quizzes_file_substr() -> str:
    file_substr = "quizzes"
    with open(f"outputs/prompt-for-{file_substr}.txt", "w") as f:
        f.write(
            """
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
        """
        )
    return file_substr


async def main() -> None:
    TimeRangeWithText = Dict[str, Union[float, str]]
    video_ids = [
        "6C9JsyfDBe8",
        "pmgYUxba0cc",
        "t4Kndozwnms",
        "1Vv0PkSsA0k",
        "-1vqVgtjDOM",
    ]


    counter = 0
    flashcards_file_substr = get_flashcards_file_substr()
    quizzes_file_substr = get_quizzes_file_substr()
    prompt_substrs: List[str] = [flashcards_file_substr, quizzes_file_substr]

    for video_id in video_ids:
        transcript: List[TimeRangeWithText] = YouTubeTranscriptApi.get_transcript(
            video_id, languages=["en"]
        )

        # idk if space joining is necessary before sending to LLM
        # but, i did so it looks the same as what I manually pasted into ChatGPT UI
        transcript_text = " ".join([item["text"] for item in transcript])
        prompt_text = transcript_text

        with open(f"outputs/prompt-for-{flashcards_file_substr}.txt", "a") as f:
            f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
            f.write(f"\ntext: {prompt_text}")

        with open(f"outputs/prompt-for-{quizzes_file_substr}.txt", "a") as f:
            f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
            f.write(f"\ntext: {prompt_text}")

        if openai.api_key:
            for prompt_substr in prompt_substrs:
                reply = await get_llm_reply(prompt_substr)
                parsed = json.loads(reply)

                if not parsed:
                    print(f"Error: invalid reply for {prompt_substr}. writing to file anyway")

                with open(f"{prompt_substr}.json", "w") as f:
                    f.write(reply)
        elif counter == 0:
            print("Error: OpenAI API key not found. Please manually submit the prompts to ChatGPT, as described in the README.")

        counter += 1
        print(f"Finished {counter} of {len(video_ids)} videos.")

if __name__ == "__main__":
    asyncio.run(main())
