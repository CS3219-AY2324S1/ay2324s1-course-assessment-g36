## Getting Started

Install dependencies

```bash
npm install
```

Create a file with environment variables in the root directory: `.env.local`
| Variable | Value |
| ------------- |-------------|
| NEXT_PUBLIC_CODE_EXECUTION_API_KEY | Sign up for an API key at <br/> https://rapidapi.com/judge0-official/api/judge0-ce/pricing |
| NEXT_PUBLIC_AGORA_APP_ID | Sign up for an app ID at <br/> https://console.agora.io/ |
| NEXT_PUBLIC_AGORA_APP_CERTIFICATE | Sign up and retrieve the primary certificate at <br/> https://console.agora.io/ |

The content of `.env.local` should look like this:

```
NEXT_PUBLIC_CODE_EXECUTION_API_KEY='YOUR_API_KEY'
NEXT_PUBLIC_AGORA_APP_ID='YOUR_AGORA_APP_ID'
NEXT_PUBLIC_AGORA_APP_CERTIFICATE='YOUR_AGORA_APP_CERT'
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
