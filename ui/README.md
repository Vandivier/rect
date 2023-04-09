# rect ui

Blitz.js + React + Next.js web gui for rect

this README contains ui-specific run instructions. see the [top-level README](https://github.com/Vandivier/rect#readme) for everything else

## running the app 🏃

1. get postgres db creds and put them in a `.env.local` file. Use `.env` as a template. I recommend [Supabase](https://supabase.com/).
2. `yarn && blitz prisma migrate dev && blitz dev`
