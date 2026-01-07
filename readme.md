# Scripture Source Website - Complete Setup Guide

## 📁 File Structure

Create this exact folder structure:

```
scripture-source/
├── index.html
├── articles.html
├── resources.html
├── shop.html
├── gallery.html
├── thankyou.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── (your images go here)
```

## 🚀 Quick Start

### Step 1: Create Folders
1. Create a main folder called `scripture-source`
2. Inside it, create folders: `css`, `js`, and `images`

### Step 2: Copy Files
1. Save `style.css` in the `css` folder
2. Save `script.js` in the `js` folder
3. Save all HTML files in the root `scripture-source` folder

### Step 3: Test Locally
1. Double-click `index.html` to open in your browser
2. Test navigation between pages
3. Test the shopping cart
4. Verify all links work

## ⚙️ Configuration Required

### 1. Update Gumroad Links (IMPORTANT!)
Edit `js/script.js` and replace all Gumroad links:

```javascript
const gumroadLinks = {
    'Complete Romans Study': 'YOUR_ACTUAL_GUMROAD_LINK',
    '40 Days of Prayer': 'YOUR_ACTUAL_GUMROAD_LINK',
    // ... update all links
};
```

### 2. Update Social Media Links
Edit all HTML files (in footer section):

```html



```

Replace with your actual social media URLs.

### 3. Update Email Address
In `thankyou.html`, update:

```html
support@scripturesource.org
```

Replace with your actual support email.

## 🌐 How to Deploy

### Option 1: Netlify (Recommended - FREE!)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free
3. Drag and drop your `scripture-source` folder
4. Done! You get a free URL like: `yoursite.netlify.app`
5. Can add custom domain (scripturesource.org) later

### Option 2: GitHub Pages (FREE!)
1. Create GitHub account
2. Create new repository: `scripture-source`
3. Upload all files
4. Go to Settings > Pages
5. Enable GitHub Pages
6. URL: `yourusername.github.io/scripture-source`

### Option 3: Traditional Web Hosting
1. Buy hosting (Bluehost, SiteGround, etc.)
2. Use FTP/File Manager to upload files
3. Upload all files to `public_html` folder
4. Access via your domain

## 🎨 Customization Guide

### Change Colors
Edit `css/style.css`:

```css
/* Main header gradient */
background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);

/* Primary button color */
background: #3498db;

/* Accent color */
color: #27ae60;
```

### Add Your Logo
Replace the ✝ emoji in header with:

```html
 Scripture Source
```

### Change Fonts
Add to `<head>` in all HTML files:

```html

```

Then update in `style.css`:

```css
body {
    font-family: 'Merriweather', serif;
}
```

## 📧 Email Integration

### For Newsletter Signup
Integrate with email service in `js/script.js`:

**Mailchimp Example:**
```javascript
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value;
    
    // Mailchimp API call
    fetch('YOUR_MAILCHIMP_API_ENDPOINT', {
        method: 'POST',
        body: JSON.stringify({ email: email })
    });
}
```

**Services to use:**
- Mailchimp (free up to 500 subscribers)
- ConvertKit (great for creators)
- Substack (simple, all-in-one)

## 💳 Payment Setup

### Gumroad Setup (Recommended)
1. Go to [gumroad.com](https://gumroad.com)
2. Sign up
3. Create product for each e-book
4. Upload PDF files
5. Set prices
6. Copy each product link
7. Update in `js/script.js`

**Create Discount Codes in Gumroad:**
1. Go to product
2. Click "Offer Codes"
3. Create codes: WELCOME10, FLASH40, etc.
4. Set discount percentage
5. Save

## 📱 Testing Checklist

Before going live, test:

- [ ] All navigation links work
- [ ] Shopping cart adds/removes items
- [ ] Cart persists between pages
- [ ] Countdown timer displays
- [ ] Newsletter signup shows success message
- [ ] Social share buttons work
- [ ] Mobile responsive (test on phone)
- [ ] All product prices correct
- [ ] Gumroad links work
- [ ] Filter buttons work on all pages

## 🔧 Common Issues & Fixes

### Cart doesn't persist between pages
**Fix:** Make sure `script.js` is included on every page:
```html

```

### CSS not loading
**Fix:** Check file path in HTML:
```html

```

### JavaScript errors
**Fix:** Open browser console (F12) to see errors

### Images not showing
**Fix:** Save images in `images/` folder and use:
```html

```

## 📊 Analytics Setup

### Google Analytics
1. Get tracking code from Google Analytics
2. Add before `</head>` in all HTML files:

```html



  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');

```

## 🎯 SEO Optimization

Already included in each page:
- Meta descriptions
- Title tags
- Semantic HTML
- Alt text ready for images

**Next steps:**
1. Submit sitemap to Google Search Console
2. Create robots.txt file
3. Add Open Graph tags for social sharing

## 📞 Support

If you need help:
1. Check browser console for errors (F12)
2. Verify all file paths are correct
3. Test in different browsers
4. Check that all folders are correctly named

## 🎉 Launch Checklist

Before going live:

- [ ] Buy domain name (scripturesource.org)
- [ ] Set up Gumroad account
- [ ] Upload all e-book PDFs to Gumroad
- [ ] Update all Gumroad links in code
- [ ] Set up email service (Mailchimp/ConvertKit)
- [ ] Create social media accounts
- [ ] Update all social media links
- [ ] Test all features
- [ ] Deploy to hosting/Netlify
- [ ] Connect custom domain
- [ ] Set up Google Analytics
- [ ] Submit to Google Search Console
- [ ] Announce launch on social media!

## 📝 License

This website template is for your personal/commercial use.

---

**Need help?** The code is well-commented. Look through the files and you'll see explanations of what each section does!

**Good luck with your Bible study ministry! 🙏**