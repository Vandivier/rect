import asyncio
from dotenv import load_dotenv
import json
import os
from typing import Dict, List, Union
from youtube_transcript_api import YouTubeTranscriptApi

import openai

# Replace 'custom_path/.env' with the path to your custom env file
custom_path = "./.env"
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


def get_chat_file_substr(count_of_units: int) -> str:
    file_substr = "chat"
    with open(f"outputs/prompt-for-{file_substr}.txt", "w") as f:
        f.write(
            f"""
You are a chatbot that is meant to help people learn to code, prioritizing advice prescribed in the Ladderly curriculum.
Consider the following web video transcripts, dileneated by their url which ends in a sourcePlatformId.
These transcripts constitute the Ladderly curriculum.
simply respond by saying:
"I have loaded {count_of_units} units of Ladderly curriculum into my memory. How can I help you?"
"""
        )
    return file_substr


def get_flashcards_file_substr(file_suffix: str) -> str:
    file_substr = "flashcards"
    with open(f"outputs/prompt-for-{file_substr}-{file_suffix}.txt", "w") as f:
        f.write(
            """
consider the following web video transcripts, dileneated by their url which ends in a sourcePlatformId.
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
```"""
        )
    return file_substr


def get_quizzes_file_substr(file_suffix: str) -> str:
    file_substr = "quizzes"
    with open(f"outputs/prompt-for-{file_substr}-{file_suffix}.txt", "w") as f:
        f.write(
            """
consider the following web video transcripts, dileneated by their url which ends in a sourcePlatformId.
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
```"""
        )
    return file_substr


def get_slides_file_substr(file_suffix: str) -> str:
    file_substr = "slides"
    with open(f"outputs/prompt-for-{file_substr}-{file_suffix}.txt", "w") as f:
        f.write(
            """
I have an index.html file that appropriately includes reveal.js with the RevealMarkdown plugin. The file includes the following HTML snippet:
```
                <section data-markdown="CURRICULUM.md"></section>
```

Please provide the content for CURRICULUM.md that will allow me to render a slideshow.

The first slide should be a title slide. The second slide should have a table of contents.

Include at least one relevant hyperlink on each slide the directs the viewer to a valuable external resource or a citation for a statement on the slide. Hyperlinks should always open in a new tab.

With reveal.js, we can write a Markdown link that opens in a new tab using a special comment syntax like this: `<!-- .element: target="_blank" -->`. For example, consider the following slide Markdown snippet that makes use of this syntax:
```
### Interview Prep Stack

1. The Ladderly Curriculum. In Particular:
    - <a href="#job-search">The Job Search Section</a><!-- .element: target="_blank" -->
    - <a href="#external-resources">The External Resources Section</a><!-- .element: target="_blank" -->
2. [Starboi](https://github.com/Vandivier/starboi), for Behavioral Interview Prep<!-- .element: target="_blank" -->
3. [Endorsed Communities](https://github.com/Vandivier/ladderly-slides/blob/main/docs/ENDORSED-COMMUNITIES.md)<!-- .element: target="_blank" -->, for social help

---
```

This slideshow is meant to capture the information contained in the following web video transcripts,
dileneated by their url which ends in a sourcePlatformId.
the sourcePlatformName for all of these is "YouTube Shorts".

please generate at least one slide per transcript, and no more than three per transcript.
"""
        )
    return file_substr


async def main() -> None:
    has_not_shown_open_api_error = True
    TimeRangeWithText = Dict[str, Union[float, str]]

    with open(f"./social_source_map.json") as f:
        curriculum_units = json.load(f)
        count_of_curriculum_units = len(curriculum_units)

    chat_file_substr = get_chat_file_substr(count_of_curriculum_units)
    for unit_index, edu_unit in enumerate(curriculum_units):
        video_ids = edu_unit.get("video_ids", [])

        unverified_unit_id = edu_unit.get("id", None)
        if not isinstance(unverified_unit_id, (str, int)) or not unverified_unit_id:
            raise ValueError("unit_id must be a truthy string or int")
        unit_id = str(unverified_unit_id)

        flashcards_file_substr = get_flashcards_file_substr(unit_id)
        quizzes_file_substr = get_quizzes_file_substr(unit_id)
        slides_file_substr = get_slides_file_substr(unit_id)

        for video_index, video_id in enumerate(video_ids):
            transcript: List[TimeRangeWithText] = YouTubeTranscriptApi.get_transcript(
                video_id, languages=["en"]
            )

            # idk if space joining is necessary before sending to LLM
            # but, i did so it looks the same as what I manually pasted into ChatGPT UI
            transcript_text = " ".join([item["text"] for item in transcript])
            prompt_text = transcript_text

            with open(f"outputs/prompt-for-{chat_file_substr}.txt", "a") as f:
                f.write(f"\nunit name: {edu_unit['name']}")
                f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
                f.write(f"\ntext: {prompt_text}")

            with open(
                f"outputs/prompt-for-{flashcards_file_substr}-{unit_id}.txt", "a"
            ) as f:
                f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
                f.write(f"\ntext: {prompt_text}")

            with open(
                f"outputs/prompt-for-{quizzes_file_substr}-{unit_id}.txt", "a"
            ) as f:
                f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
                f.write(f"\ntext: {prompt_text}")

            with open(
                f"outputs/prompt-for-{slides_file_substr}-{unit_id}.txt", "a"
            ) as f:
                f.write(f"\nurl: https://youtube.com/shorts/{video_id}")
                f.write(f"\ntext: {prompt_text}")

            if openai.api_key:
                prompt_substrs: List[str] = [
                    chat_file_substr,
                    flashcards_file_substr,
                    quizzes_file_substr,
                    slides_file_substr,
                ]

                for prompt_substr in prompt_substrs:
                    reply = await get_llm_reply(prompt_substr)
                    parsed = json.loads(reply)

                    if not parsed:
                        print(
                            f"Error: invalid reply for {prompt_substr}. writing to file anyway"
                        )

                    with open(f"{prompt_substr}.json", "w") as f:
                        f.write(reply)
            elif has_not_shown_open_api_error:
                print(
                    "Error: OpenAI API key not found. Please manually submit the prompts to ChatGPT, as described in the README."
                )
                has_not_shown_open_api_error = False

            print(
                f"Finished {video_index+1} of {len(video_ids)} videos in unit {unit_index+1} of {count_of_curriculum_units}"
            )


if __name__ == "__main__":
    asyncio.run(main())
