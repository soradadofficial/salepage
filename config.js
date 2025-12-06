/**
 * Sell Page Configuration
 * -----------------------
 * Edit this file to customize your website.
 */

const CONFIG = {
    // Website Details
    websiteName: "Best Deals Shop",
    logoUrl: "https://placehold.co/150x50/ff0000/ffffff?text=SHOP+LOGO", // Replace with your logo URL

    // Theme Colors (Use Hex codes)
    theme: {
        primary: "#ff4d4f",   // Main color (Buttons, Highlights) - Default: Shopee-like Red/Orange
        secondary: "#1890ff", // Secondary color
        background: "#f0f2f5", // Page background
        text: "#333333"       // Main text color
    },

    // Google Sheet Data Source
    // This should be the "Published to Web" CSV link of your Google Sheet
    sheetUrl: "./products1.csv",

    // SEO Settings
    seo: {
        description: "ศูนย์รวมดีลเด็ด สินค้าคุณภาพ ราคาคุ้มค่า", // Meta Description
        keywords: "shopee, lazada, tiktok, สินค้าลดราคา, ดีลเด็ด" // Meta Keywords
    },

    // Analytics & Tracking (Leave empty string "" if not used)
    analytics: {
        googleAnalyticsId: "", // e.g., G-XXXXXXXXXX
        googleTagManagerId: "", // e.g., GTM-XXXXXXX
        facebookPixelId: ""     // e.g., 123456789012345
    },

    // Social Links (for Footer/Contact)
    social: {
        line: "",
        facebook: ""
    }
};

// Export to window for global access
window.AppConfig = CONFIG;
