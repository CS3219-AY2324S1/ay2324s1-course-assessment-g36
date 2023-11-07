## Getting Started

Install dependencies

```bash
npm install
```

Create a file with environment variables in the root directory: `.env.local`
| Variable | Value |
| ------------- |-------------|
| NEXT_PUBLIC_CODE_EXECUTION_API_KEY | Sign up for an API key at <br/> https://rapidapi.com/judge0-official/api/judge0-ce/pricing |

The content of `.env.local` should look like this:

```
NEXT_PUBLIC_CODE_EXECUTION_API_KEY='YOUR_API_KEY'
```

Run the development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app
