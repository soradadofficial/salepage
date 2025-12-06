# SORADAD x SHOPEEADS - Affiliate Sell Page Webapp

เว็บแอปพลิเคชันสำหรับทำหน้าขายสินค้า (Sell Page) รองรับ Affiliate (Shopee, Lazada, TikTok) เน้นความสวยงาม ทันสมัย และโหลดไว
พัฒนาด้วย **Vanilla HTML, CSS, JS** ทำให้สามารถนำไปวางบน Host ฟรีอย่าง **GitHub Pages** ได้ทันที โดยไม่ต้องมี Backend

![Cover Image](https://via.placeholder.com/800x400?text=SORADAD+x+SHOPEEADS+Preview)
*(คุณสามารถเปลี่ยนรูปนี้เป็นรูปหน้าเว็บจริงของคุณได้)*

## ✨ ฟีเจอร์หลัก (Features)

*   **Modern UI/UX**: ดีไซน์ทันสมัย สไตล์ Glassmorphism พร้อม Video Background สุดพรีเมียม
*   **Video Hero Section**: ส่วนหัวเว็บเล่นวิดีโออัตโนมัติ ดึงดูดสายตา
*   **Product Pagination**: แบ่งหน้าสินค้าอัตโนมัติ (10 ชิ้นต่อหน้า) เพื่อประสิทธิภาพการโหลด
*   **Product Detail Modal**: กดที่สินค้าเพื่อดูรายละเอียด, ราคา และปุ่มสั่งซื้อแบบ Pop-up
*   **Easy Config**: ตั้งค่าเว็บ (สี, โลโก้, SEO) ได้ง่ายๆ ผ่านไฟล์ `config.js`
*   **CSV Data Source**: เพิ่ม/ลบสินค้าได้ง่ายๆ ผ่านไฟล์ `products1.csv` (หรือเชื่อมต่อ Google Sheets)
*   **Responsive**: รองรับการแสดงผลสวยงามบนมือถือ แท็บเล็ต และคอมพิวเตอร์
*   **SEO Friendly**: รองรับการตั้งค่า Title, Description, Keywords

## 🚀 วิธีการติดตั้งและใช้งาน (Setup)

### 1. การเตรียมข้อมูลสินค้า
แก้ไขไฟล์ `products1.csv` ในโฟลเดอร์ โดยใช้โปรแกรม Excel หรือ Text Editor
*   **Format**: `name, price, image_url, shopee_link, lazada_link, tiktok_link`
*   **Tip**: คอลัมน์ `price` ถ้าใส่ข้อความยาวๆ (> 50 ตัวอักษร) ระบบจะแปลงเป็น **คำอธิบายสินค้า** โดยอัตโนมัติ

### 2. การตั้งค่าเว็บไซต์
เปิดไฟล์ `config.js` เพื่อแก้ไข:
```javascript
const AppConfig = {
    websiteName: "ชื่อร้านค้าของคุณ",
    logoUrl: "ลิงก์โลโก้ของคุณ",
    theme: {
        primary: "#ff4d4f", // สีหลัก
        // ...
    },
    // ...
};
```

### 3. การนำขึ้นออนไลน์ (Deploy to GitHub Pages)
1.  นำไฟล์ทั้งหมดเข้าสู่ GitHub Repository
2.  ไปที่ **Settings** > **Pages**
3.  เลือก Source เป็น **Deploy from a branch** (เลือก `main` / `root`)
4.  รอสักครู่ เว็บของคุณจะออนไลน์ทันที!

## 🔮 การต่อยอดในอนาคต (Future Roadmap)

โปรเจกต์นี้ถูกออกแบบมาให้ยืดหยุ่น สามารถพัฒนาต่อได้อีกไกล:

### 1. ระบบค้นหาและตัวกรอง (Search & Filter)
*   เพิ่มช่องค้นหาสินค้า (Search Bar) ที่ด้านบน
*   แยกหมวดหมู่สินค้า (Category) เช่น "ของใช้ในบ้าน", "แฟชั่น"

### 2. เปลี่ยนเป็น PWA (Progressive Web App)
*   ทำให้เว็บสามารถ **"ติดตั้ง"** ลงบนมือถือได้เหมือนแอปพลิเคชัน
*   ทำงานได้แบบ Offline เบื้องต้น

### 3. ระบบหลังบ้าน (Simple CMS)
*   หากสินค้าเยอะมาก อาจเปลี่ยนจาก CSV เชื่อมต่อกับ **Google Sheets API** เต็มรูปแบบ หรือใช้ **Strapi / Firebase** เพื่อให้มีหน้า Admin สำหรับจัดการสินค้าได้ง่ายขึ้น

### 4. ธีมมืด (Dark Mode)
*   เพิ่มปุ่มสลับ Dark/Light mode เพื่อถนอมสายตาผู้ใช้งานต

### 5. ระบบตะกร้าสินค้า (Shopping Cart)
*   หากต้องการขายเองโดยไม่ผ่าน Affiliate สามารถเพิ่มระบบตะกร้าและปุ่ม Checkout ส่งสรุปยอดเข้า LINE OA ได้

---
**Developed for SORADAD x SHOPEEADS**
