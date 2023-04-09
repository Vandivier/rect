# rect transcript_service

install poetry and navigate to the `transcript_service` directory.

for VS Code, consider running:

```bash
poetry shell
poetry config virtualenvs.in-project true
```

then you can (ctrl / cmd)+shift+p and pick `Python: Select Interpreter` and pick the path within `transcript_service/.venv`

i found the executable in my system at `transcript_service/.venv/Lib/python`

next, confirm poetry is active by running:

```bash
poetry env list
poetry install
python main.py
```

## contributing

run the black formatter on your code like `black .` from the `transcript_service/` dir
