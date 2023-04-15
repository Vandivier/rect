# rect transcript_service

this service takes social media content, extracts text for LLMs, and then houses the output of LLM interactions.

## installing and running the service

install poetry and navigate to the `transcript_service` directory. Run:

```bash
poetry config virtualenvs.in-project true
poetry install
```

With `virtualenvs` configured that way, when you `poetry install`, a local `.venv` folder is created. You can verify this by running `ls -a`.

Now, reference the Python binary inside that `.venv` as your IDE Python interpreter in order for your IDE to access the poetry installed module context. In VS Code, the shortcut is `cmd+shift+p` and you will want to make sure the Python extension is installed.

now you can either `poetry run` your commands, or open a poetry shell to get access to all the modules in the poetry virtual context, which i recommend:

```bash
poetry shell
```

then you can (ctrl / cmd)+shift+p and pick `Python: Select Interpreter` and pick the path within `transcript_service/.venv`

i found the executable in my system at `transcript_service/.venv/Lib/python`

next, confirm poetry is active by running:

```bash
poetry env list
```

Once poetry is confirmed to be running, you can run the main file as follows:

```bash
poetry run python main.py
```

## contributing

run the black formatter on your code like `black .` from the `transcript_service/` dir

## output generation

output generation is currently largely manual. Here are the steps:

1. Run the main file as described in `installing and running the service`
   a. This should result in the creation of outputs like `prompt-*.txt`
2. Take the prompts one-by-one and run them through ChatGPT

   a. Currently, the per-request token limit on ChatGPT GUI submission appears to be about 4,500 tokens.

   b. Educational units are broken up such that the core ladderly-slides CURRICULUM.md follows a 5x5 heuristic. Analysis of current slide content shows that the 5x5 heuristic roughly maps to [750 tokens](https://platform.openai.com/tokenizer) of information.

   c. To be safe and extensible, this service supports up to 3350 tokens for a single educational unit. That is [approximately equal to 2500 words](https://platform.openai.com/docs/introduction/tokens) of content, or [5 single-spaced pages](https://wordcounter.net/words-per-page) of content.

   d. Note that GPT-3 models have a shared token limit of about 4,090 tokens. This context limit counts both the prompt tokens and also the GPT response token length. GPT-4 allegedly [supports up to 8,000 tokens](https://help.openai.com/en/articles/7127966-what-is-the-difference-between-the-gpt-4-models), although rect hasn't been used with such large educational units.

3. output `.json` files are constructed as the result of LLM processing of the associated `.txt` file.

   a. For example, ChatGPT will consume `prompt-for-quizzes.txt` and the response, provided it is well-formed, is saved as `quizzes.json`

   b. It's common and expected that rect users, acting as [prompt engineers](https://en.wikipedia.org/wiki/Prompt_engineering), will need to prompt ChatGPT to "continue" in order to receive completed outputs.
