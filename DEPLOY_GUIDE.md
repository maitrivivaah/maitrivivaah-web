# 🪷 MaitriVivaah — How to Put This Live (Simple Steps)

No coding knowledge needed. Just follow these steps one by one.
Each step tells you exactly where to go and what to click.

---

## ⏱️ Total Time: About 30–45 minutes

---

## STEP 1 — Download & Install Node.js (One time only)

Node.js is a free tool that lets your computer run the website files.

1. Open your browser and go to: **https://nodejs.org**
2. Click the big green button that says **"LTS"** (the recommended version)
3. Download the file and open it
4. Click **Next → Next → Install** (just keep clicking Next, don't change anything)
5. When done, click **Finish**

✅ Done! You only ever need to do this once.

---

## STEP 2 — Extract the ZIP file

1. Find the file **maitrivivaah-web.zip** that you downloaded
2. Right-click on it
3. Click **"Extract All"**
4. Choose your Desktop as the location
5. Click **Extract**

You will now see a folder called **maitrivivaah-web** on your Desktop.

---

## STEP 3 — Open the folder in Terminal

The Terminal is like a text command box. Don't worry — you'll only type 2 things!

1. Click the Windows Start button (bottom left)
2. Type **cmd** and press Enter
3. A black window will open — this is the Terminal
4. Type this exactly and press Enter:
   ```
   cd Desktop\maitrivivaah-web
   ```
5. Then type this and press Enter:
   ```
   npm install
   ```
6. Wait — it will download some things automatically. Takes 1–2 minutes.

✅ Done when you see no red errors.

---

## STEP 4 — Put the website on GitHub

GitHub is where your website files are stored online (you already have an account).

1. Go to **https://github.com** and log in
2. Click the **+** button (top right) → **New repository**
3. Name it: **maitrivivaah-web**
4. Make sure it says **Public**
5. Click **Create repository**
6. You'll see a page with instructions — look for the section that says **"…or push an existing repository"**
7. Copy those 3–4 lines of code it shows you
8. Paste them into your Terminal (the black window from Step 3) and press Enter

✅ Your files are now on GitHub!

---

## STEP 5 — Deploy to Vercel (Makes it live on the internet)

Vercel is the same service your current site uses. It's free.

1. Go to **https://vercel.com** and log in with your GitHub account
2. Click **"Add New Project"**
3. Find **maitrivivaah-web** in the list and click **Import**
4. On the next screen, look for **"Environment Variables"** — click to expand it
5. Add this one variable:
   - Name: `VITE_API_URL`
   - Value: `http://localhost:8000` *(we'll update this later)*
6. Click **Deploy**
7. Wait 1–2 minutes

✅ Your new React website is now LIVE! Vercel gives you a link like **maitrivivaah-web.vercel.app**

---

## STEP 6 — Connect to your Backend (API)

The website needs the Python backend to actually work (login, profiles, matches etc.)
This is a separate step we will do together in the next session.

For now, the website itself is live and you can see how it looks.

---

## 🎉 What You Now Have

- A beautiful React JS website with all pages:
  - 🏠 Home page
  - 🔐 Login & Signup (with Google)
  - 📋 Registration form (all Jain-specific fields)
  - 💑 Matches page with filters
  - 💎 Plans page
  - ℹ️ About page
  - 🔧 Admin panel (dashboard, users, team)

---

## ❓ Something went wrong?

**"npm is not recognized"** — Node.js didn't install properly. Restart your computer and try Step 1 again.

**"Permission denied"** — Right-click on cmd and choose "Run as administrator"

**Can't find the ZIP** — Check your Downloads folder

**Vercel shows an error** — Take a screenshot and share it here, I'll fix it immediately.

---

## 📱 Next Steps (We'll do these together)

1. Set up the Python backend on Railway (free hosting)
2. Connect the website to the backend
3. Test login, registration, and matches end to end
4. Set up the React Native mobile app for iOS and Android
