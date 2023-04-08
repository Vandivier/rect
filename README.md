# rect by [ladderly](https://ladderly.io/) 🚀

ai-assisted transformer from social content to open educational material

Get Rect!! or smth... plz pr a better tagline

## table of contents 📚

1. background
2. design
3. running the app
4. contributing
5. misc notes

## background ✨

This application is an entry into the 2023 Supabase Hackathon on the theme of AI.

This solves a meaningful problem for open source educational development at [Ladderly](https://ladderly.io/).

Specifically, open source educational content in the [ladderly-slides](https://github.com/Vandivier/ladderly-slides) repository is sourced mainly from social media messages from John Vandivier, a TikTok Tech influencer and educator. This project automates the laborious work of transforming TikTok videos into four always-synchronized educational outputs:

1. Slides for [Ladderly-Slides](https://github.com/Vandivier/ladderly-slides)
2. Flash Cards
3. Quizzes
4. A Conversational AI Agent

The term `rect` comes from the fact that this application has four main points, or purposes, which are those four items named above.

## design 🧑‍🎨

(totally subject to radical change)

for the hackathon, we are prioritizing quiz generation because it pairs nicely with using Supabase. Ideally we get to all features, but this is the initial North Star. AI stuff in Python, GUIs in React+TypeScript using Blitz stack+Prisma+Supabase.

1. TikToks are uploaded to Google Drive via [Repurpose.io](https://repurpose.io/)
   a. in the future maybe Repurpose isn't needed if we open source a TikTok scraper, but for now let's let them do the heavy lifting and we get the nice Google API interface.

2. Somehow we transcribe the TikToks
   a. planning to use [Whisper from OpenAI](https://www.youtube.com/watch?v=ABFqbY_rmEk). We can use it as a service, or also we can have a local offline free version. Be sure to limit usage in either case until the dev pipeline works, then scale up videos later, bc i have thousands of tiktoks. Let's start with 1-10 and subsequent runs will take 10 away from the untranscribed ladderly-slides.
   b. in an alternative or complimentary design (out of hackathon scope), we could use a video summarizer AI instead of a transcriber followed by an LLM tool. many tiktok videos have a ton of value that is not discernable through audio transcription alone. Text on the screen and imagery are examples of TikTok info not communicated by transcription.

3. Text sources are compiled and shoved into an LLM
   a. text sources include TikTok transcriptions, the current state of [ladderly-slides](https://github.com/Vandivier/ladderly-slides), and maybe other sources like an arbitrary file (that would also be open sourced ofc).
   b. a notable other source would be the content of articles that are merely linked within ladderly-slides. We could use a web url AI/LLM retrieval agent to automate this task. [5 to 23 patterns](https://hackernoon.com/5-to-23-patterns-to-ace-any-coding-interview) is a great example article, and [here's an example](https://huggingface.co/spaces/deepset/retrieval-augmentation-svb) of an LLM with web url retrieval augmentation.
   c. ong i don't know which LLM to use rn. plz help. gpt4all? [Vicuna](https://www.reddit.com/r/ArtificialInteligence/comments/12dpzzb/vicuna_is_the_best_free_llm_right_now_full_pc/)? smth else?

4. Tuned prompts are used to generate outputs of interest.
   a. probably we need to store them in Supabase unless we are going to have this all stored locally. Supabase would help crash proof. We can also use "pause and resume" logic to help crash proof.
   b. seems like in the long run we want to support both, but idk for the hackathon.

5. Some validation or massing logic
6. presentable in a GUI for flash cards and the quiz etc
7. if we make a cert, definitaly real users that received the cert would have db account info that is not open sourced. maybe we can make two versions or smth and split fully offline-capable components out

#### how are we using supabase?

we are using it for auth, and also maybe a few other things:

1. save versions of inputs and outputs
2. save the current version of runtime data (eg current flashcards)
3. save who passed what version of quiz/cert

## running the app 🏃

## contributing 💖

Create a GitHub issue: To report a bug 🐞, suggest a new feature 🌟, or request assistance 🙋, create a GitHub issue in the Rect repository. This is the primary method for communication and collaboration on this project.

1. Join the Ladderly Discord server: If you have any questions or need further assistance, you can reach out on the Ladderly Discord server. This is an excellent platform for discussing ideas 💡, getting help 🆘, or collaborating with other contributors. To join the server, please follow this link: https://vandivier.github.io/not-johns-linktree/

2. Before submitting a pull request, verify that your changes align with the project's roadmap and goals. For large changes, it will help to expedite 🏎️‍💨 code review and merge if you talk with John or other maintainers first. This is a suggestion, not a hard requirement. If you're interested in becoming a maintaer, give use a shout 🗣️ on the Discord mentioned above!

## misc notes 📝

1. we're on the waitlist for copilot4prs and copilot for documentation
