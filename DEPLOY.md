# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd /home/molt/.openclaw/workspace/blindai
   vercel
   ```

4. **Set environment variable:**
   - Go to your project on vercel.com
   - Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = `your-api-key`
   - Redeploy: `vercel --prod`

### Option 2: GitHub + Vercel (Recommended for Production)

1. **Create GitHub repo:**
   ```bash
   gh repo create blindai --private --source=. --remote=origin
   git push -u origin master
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repo
   - Add environment variable: `ANTHROPIC_API_KEY`
   - Deploy!

3. **Auto-deployments:**
   Every push to master will automatically deploy

### Option 3: Other Platforms

#### Railway
```bash
npm i -g railway
railway login
railway init
railway up
```

#### Render
- Connect GitHub repo at render.com
- Add environment variable
- Deploy as Web Service

#### Netlify
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

## Post-Deployment

1. **Test the app:**
   - Visit your deployment URL
   - Sign up with a test account
   - Check admin dashboard at `/admin`

2. **Monitor:**
   - Check Vercel logs for errors
   - Monitor API usage (Anthropic console)

3. **Custom domain (optional):**
   - Vercel: Project Settings → Domains
   - Add your domain and configure DNS

## Database Note

**Current:** SQLite (local file) - works for MVP/testing

**For production:** 
- SQLite on Vercel is ephemeral (resets on redeploy)
- Migrate to PostgreSQL for persistence:
  - Vercel Postgres
  - Supabase
  - Railway
  - Neon

Migration guide coming soon.

## Troubleshooting

### Build fails
```bash
npm run build  # Test locally first
```

### API key issues
- Verify environment variable in Vercel dashboard
- Redeploy after adding env vars

### Database issues
- SQLite file location: `./blindai.db`
- Check write permissions
- Consider PostgreSQL for production

## Cost Estimate

- **Vercel:** Free tier (hobby projects)
- **Anthropic API:** ~$0.10-0.50 per match
- **Domain:** ~$12/year (optional)

**Total:** Nearly free for MVP/testing!
