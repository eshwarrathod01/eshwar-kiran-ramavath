# 🚀 Deploy Your Portfolio to GitHub Pages

## Step 1: Create GitHub Account (if you don't have one)
1. Go to: https://github.com/signup
2. Create your account
3. Verify your email

## Step 2: Create a New Repository

### Option A: For Personal Website (Recommended)
1. Go to: https://github.com/new
2. Repository name: **`your-username.github.io`** (replace `your-username` with your GitHub username)
   - Example: If username is `eshwarkiran`, name it: `eshwarkiran.github.io`
3. Set to **Public**
4. Click "Create repository"
5. **Your site will be live at**: `https://your-username.github.io`

### Option B: For Project Website
1. Go to: https://github.com/new
2. Repository name: **`portfolio`** (or any name you like)
3. Set to **Public**
4. Click "Create repository"
5. **Your site will be live at**: `https://your-username.github.io/portfolio`

## Step 3: Deploy Using PowerShell

Open PowerShell in your portfolio folder and run these commands:

```powershell
# Step 1: Initialize Git repository
git init

# Step 2: Add all files
git add .

# Step 3: Create first commit
git commit -m "Initial portfolio deployment"

# Step 4: Rename branch to main
git branch -M main

# Step 5: Connect to GitHub (REPLACE WITH YOUR REPO URL)
# For personal site:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git

# OR for project site:
# git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Step 6: Push to GitHub
git push -u origin main
```

When prompted:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (see Step 4 below)

## Step 4: Create GitHub Personal Access Token

GitHub requires a token instead of password:

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Note: "Portfolio deployment"
4. Select scopes: Check **`repo`** (full control of private repositories)
5. Click "Generate token"
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under "Source":
   - Branch: Select **`main`**
   - Folder: Select **`/ (root)`**
5. Click **Save**
6. Wait 1-2 minutes
7. Your site will be live! 🎉

## Step 6: Get Your Live URL

### For Personal Site:
```
https://your-username.github.io
```

### For Project Site:
```
https://your-username.github.io/portfolio
```

## 🔄 Updating Your Portfolio Later

Whenever you make changes:

```powershell
git add .
git commit -m "Update portfolio"
git push
```

Changes will appear in 1-2 minutes!

## ⚡ Quick Commands Summary

```powershell
# Navigate to your portfolio folder
cd "d:\Rathod Eshwar protfolio"

# Initialize and deploy
git init
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

## 🎯 Next Steps After Deployment

1. ✅ Test your live site
2. ✅ Add the URL to your LinkedIn profile
3. ✅ Add the URL to your resume
4. ✅ Share with potential employers/clients

## 🆘 Troubleshooting

**Error: "remote origin already exists"**
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
```

**Error: Authentication failed**
- Make sure you're using a Personal Access Token, not your password
- Generate a new token: https://github.com/settings/tokens

**Site not showing up?**
- Wait 2-3 minutes after pushing
- Check Settings → Pages is enabled
- Make sure branch is set to "main"

## 💡 Pro Tips

1. **Custom Domain**: After deployment, you can add a custom domain like `www.eshwarkiran.com`
2. **Free Forever**: GitHub Pages is completely free for public repositories
3. **SSL Included**: Your site automatically gets HTTPS
4. **Resume Bonus**: Having a GitHub portfolio shows technical skills!

---

Need help? I can run the commands for you in the terminal!
