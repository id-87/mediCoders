# Frontend Deployment Guide (Netlify) 🚀

Since your backend is already deployed, here is how to deploy **only the Frontend** to Netlify and connect it.

## 1. Push to GitHub
1.  Commit and push your latest changes to your GitHub repository.

## 2. Deploy to Netlify
1.  Log in to [Netlify](https://www.netlify.com/).
2.  Click **Add new site** -> **Import from Git**.
3.  Select your **mediCoders** repository.
4.  **Build Settings** (should be auto-detected):
    *   **Base directory**: `Frontend`
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
5.  **Environment Variables**:
    *   Click **Show advanced** -> **New Variable**
    *   **Key**: `VITE_API_URL`
    *   **Value**: (Enter your deployed Backend URL here, e.g., `https://your-backend.com` or your tunnel URL `https://upset-cases-trade.loca.lt`)
6.  Click **Deploy site**.

## 3. Get Your Link
Netlify will generate a link like `https://medicoders-123.netlify.app`. You can now share this link!
