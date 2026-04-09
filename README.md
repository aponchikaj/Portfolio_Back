# ⚙️ Portfolio — Backend

REST API powering my personal portfolio site. Handles contact form submissions, project data, and any dynamic content served to the frontend.

> ✍️ Built at **age 15** (2025)

---

## Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB / PostgreSQL *(update as needed)*
- **Deployment:** Railway / Render

---

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/projects` | Returns all projects |
| `POST` | `/api/contact` | Handles contact form submissions |

---

## Run Locally

```bash
git clone https://github.com/aponchikaj/Portfolio_Back
cd Portfolio_Back
npm install
cp .env.example .env  # fill in your vars
npm run dev
```

---

## Environment Variables

```env
PORT=3000
MONGO_URI=your_mongo_uri
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## Related

Frontend: [Portfolio](https://github.com/aponchikaj/Portfolio)

---

> 🇬🇪 Built in Tbilisi, Georgia by [Lazare Mirziashvili](https://github.com/aponchikaj)
