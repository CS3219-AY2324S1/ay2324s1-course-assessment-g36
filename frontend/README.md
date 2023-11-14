## Getting Started

Install dependencies

```bash
npm install
```

Create a `.env.local` file in this directory with the following environment variables:

| Variable                                | Value                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_QUESTION_SERVICE_URI`      | URI for the question service, publicly accessible                                          |
| `NEXT_PUBLIC_USER_SERVICE_URI`          | URI for the user service, publicly accessible                                              |
| `NEXT_PUBLIC_MATCHING_SERVICE_URI`      | URI for the matching service, publicly accessible                                          |
| `NEXT_PUBLIC_COLLABORATION_SERVICE_URI` | URI for the matching service, publicly accessible                                          |
| `NEXT_PUBLIC_AGORA_APP_ID`              | Sign up for an app ID at <br/> https://console.agora.io/                                   |
| `NEXT_PUBLIC_AGORA_APP_CERTIFICATE`     | Sign up and retrieve the primary certificate at <br/> https://console.agora.io/            |
| `NEXT_PUBLIC_CODE_EXECUTION_API_KEY`    | Sign up for an API key at <br/> https://rapidapi.com/judge0-official/api/judge0-ce/pricing |
| `QUESTION_SERVICE_URI`                  | URI of the question service, accessible from the server                                    |

See `.env.template` for a copyable template.

Run the development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app
