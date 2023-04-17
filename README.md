# rect by [ladderly](https://ladderly.io/) 🚀

What's the point of rect? There are four points, as in a rectangle!

🎥 [Video overview here!](https://www.youtube.com/watch?v=Nx4z97DaK0s) 🎥

Rect is an AI-powered tool for transforming social content into educational material!

Rect takes short-form social media content as an input, and produces four kinds of educational output material. Specifically, Rect is an AI-powered assistant that will produce flash cards, quizzes, slideshows, and a chatbot assistant.

Rect accomplishes this by applying LLM transformation onto transcripted social media content like YouTube shorts, TikTok videos, Instagram reels, and more!

This application is an entry into the [2023 Supabase Hackathon on the theme of AI](https://supabase.com/blog/launch-week-7-hackathon).

<img src="./ui/public/rect-rectangular.png" alt="Rect Logo" width="100"/>

Get Rect!! or smth... plz pr a better tagline

~20 hour long [YouTube Playlist for hackathon live coding here](https://youtube.com/playlist?list=PL4hsXTgWARMzhf6cSFYOC_3AzzMUVkuU_)!

## table of contents 📚

1. background
2. design
3. running the app
4. contributing
5. misc notes

## background ✨

This application is an entry into the [2023 Supabase Hackathon on the theme of AI](https://supabase.com/blog/launch-week-7-hackathon).

This solves a meaningful problem for open source educational development at [Ladderly](https://ladderly.io/).

Specifically, open source educational content in the [ladderly-slides](https://github.com/Vandivier/ladderly-slides) repository is sourced mainly from social media messages from John Vandivier, a TikTok Tech influencer and educator. This project automates the laborious work of transforming TikTok videos into four always-synchronized educational outputs:

1. Slides for [Ladderly-Slides](https://github.com/Vandivier/ladderly-slides)
2. Flash Cards
3. Quizzes
4. A Conversational AI Agent

The term `rect` comes from the fact that this application has four main points, or purposes, which are those four items named above.

## design 🧑‍🎨

Rect is a monorepo combining a Blitz.js app and Python scripts for data engineering.

The main use case is to combine these tools, but you could use them independently if you want.

The `ui` Blitz.js app, which is actually a fullstack TypeScript app, empowers users to consume educational material, study, learn, take exams, and showscase those accomplishments in a public profile.

The `be` Python logic takes YouTube Shorts specified into educational curriculum units and produces output that can serve as seed data for the `ui` app, or used for other purposes.

Both the `be` and `ui` folders have their own additional `README.md` files with more detail!

How can this app support sources other than YouTube Shorts? Through [Repurpose.io](https://repurpose.io/)! Content creators on all sorts of short-form content platforms can leverage that tool to get their content into YouTube Short form, and rect can take it from there.

In the future, `be` could be extended to directly use OpenAI's Whisper, or other tools, to generate content directly from other sources without using `Repurpose.io` or the `YouTubeTranscriptApi`.

#### how are we using supabase?

Currently, `rect-ui` uses Supabase as a runtime data store for authentication, storing quizzes, allowing users to take quizzes, save the results of their quiz attempts, and which quizzes they have passed. This is well-positioned for feature-rich extension in the future.

## contributing 💖

Create a GitHub issue: To report a bug 🐞, suggest a new feature 🌟, or request assistance 🙋, create a GitHub issue in the Rect repository. This is the primary method for communication and collaboration on this project.

1. Join the Ladderly Discord server: If you have any questions or need further assistance, you can reach out on the Ladderly Discord server. This is an excellent platform for discussing ideas 💡, getting help 🆘, or collaborating with other contributors. To join the server, please follow this link: https://vandivier.github.io/not-johns-linktree/

2. Before submitting a pull request, verify that your changes align with the project's roadmap and goals. For large changes, it will help to expedite 🏎️‍💨 code review and merge if you talk with John or other maintainers first. This is a suggestion, not a hard requirement. If you're interested in becoming a maintaer, give use a shout 🗣️ on the Discord mentioned above!

## misc notes 📝

1. we're on the waitlist for copilot4prs and copilot for documentation
