# 🚀 MERN File Upload Template using Cloudinary and Multer 

A **powerful, reusable, and beginner-friendly** template for handling **file uploads** in a MERN stack application using **Multer, Cloudinary, and Express.js**. This setup allows seamless upload of **images, videos, PDFs, ZIPs, and other files** with a clean folder structure and robust **error handling**.

---

## 🌟 Features  

✅ **Supports All File Types** (Images, Videos, Documents, ZIPs, etc.)  
✅ **Cloudinary Integration** for secure and optimized storage  
✅ **Multer for handling file uploads**  
✅ **Express.js Backend API** for smooth operations  
✅ **Centralized Error Handling Middleware**  
✅ **Auto File Deletion** from local storage after uploading  
✅ **Reusable & Scalable Folder Structure**  

---

## 🛠️ Tech Stack  

| **Technology** | **Usage** |
|---------------|----------|
| **Node.js**   | Backend Runtime |
| **Express.js** | Server & API Handling |
| **Multer**     | File Upload Middleware |
| **Cloudinary** | Cloud Storage & Optimization |
| **MongoDB (Optional)** | If you need database storage |
| **Dotenv**    | Environment Variable Management |

---

## 📂 Folder Structure  

```
📦 backend
 ┣ 📂 config
 ┃ ┗ 📜 cloudinary.js   # Cloudinary configuration
 ┣ 📂 middlewares
 ┃ ┗ 📜 errorHandler.js  # Centralized error handling
 ┣ 📂 routes
 ┃ ┗ 📜 fileRoutes.js    # File upload routes
 ┣ 📂 controllers
 ┃ ┗ 📜 uploadController.js  # File upload logic
 ┣ 📜 .env   # Environment variables
 ┣ 📜 server.js  # Express.js entry point
 ┗ 📜 package.json  # Project dependencies
```

---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
```

---

### 2️⃣ Set Up Environment Variables  

Create a `.env` file in the **root directory** and add your **Cloudinary credentials**:  

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

---

### 3️⃣ Start the Server  

```bash
npm run dev
```

Your backend will be running at: **http://localhost:5000** 🎉  

---

### 4️⃣ Upload a File  

#### 🔹 **API Endpoint:**  
```http
POST /api/files/upload
```

#### 🔹 **Request Type:**  
- **Multipart Form-Data**  
- **File Field Name:** `file`  

#### 🔹 **Example using Postman:**  
1. Open **Postman**  
2. Select **POST** request  
3. Set URL: `http://localhost:5000/api/files/upload`  
4. Go to **Body → Form-Data**  
5. Set **Key** as `file` and select a file to upload  
6. Click **Send** ✅  

---

## 🔥 How It Works  

1️⃣ **User uploads a file** → `multer` processes it.  
2️⃣ **File is stored in Cloudinary** using `cloudinary.uploader.upload`.  
3️⃣ **Local file is deleted** after successful upload.  
4️⃣ **Response includes file URL** for easy access.  

---

## 📬 API Response Example  

**📤 On Success**  
```json
{
  "success": true,
  "message": "File uploaded successfully!",
  "fileUrl": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
}
```

**📤 On Error (No File Uploaded)**  
```json
{
  "success": false,
  "message": "No file uploaded."
}
```

---

## 🎯 Contributing  

🔥 If you find this useful, feel free to **fork**, improve, and contribute!  
✅ Open a PR with your improvements 🚀  

---

## 🔗 Connect with Me  

[![GitHub](https://img.shields.io/badge/GitHub-azzayshakya-blue?style=for-the-badge&logo=github)](https://github.com/azzayshakya)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ajay%20Shakya-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/azzayshakya)  
[![Twitter](https://img.shields.io/badge/Twitter-@azzayshakya-blue?style=for-the-badge&logo=twitter)](https://twitter.com/azzayshakya)  

---
