# Vefforritun 2, 2025, Hópverkefni 2
Byggð á API frá hópverkefni 1

### Admin
"email": "admin@workout.com",
"password": "admin123"

### Notuð tækni

- Next.js (App router + SSR)
- TypeScript
- CSS Modules 
- Hono (API)
- AWS S3 + Imgix (myndavistun)
- Vercel + Render (hýsing)
- ESLint


### Run

Búa til .env skrá og setja upp backend api
Sækja pakka og keyra:

```bash
npm run dev
```

Run lint
```bash
npm run lint
```

### Notes
Hægt er að uploada images í exercises með því að nota id af exercise.
Það er gert með imgix og AWS.
/admin/exercises/<id>/image

Notað var stórt mállíkan (LLM, „gervigreind“, t.d. ChatGTP) notað til að hjálpa

### Hýsing
Vercel:
https://vef2-2025-h2.vercel.app/

API:
https://vef2-2025-h1.onrender.com/
https://github.com/dbg14hi/vef2-2025-h1

### Hópavinna
Solo með samþykkingu frá Óla
