# 📌 **SupportFlow Helpdesk -- MERN Stack Ticketing System**

SupportFlow is a full-stack **Helpdesk & Ticket Management System**
built using the **MERN stack**.\
It enables organizations to manage customer issues smoothly through a
role-based workflow with **Admin**, **Agent**, and **User** access
levels.


## 🚀 **Features**

### 👤 **User Features**

-   Create new support tickets\
-   Add comments / replies to tickets\
-   Track ticket status (Open, In-Progress, Closed)\
-   View ticket history\
-   Secure authentication (JWT)



### 🧑‍💼 **Agent Features**

-   View all assigned tickets\
-   Change ticket status\
-   Add internal/external comments\
-   Prioritize tickets\
-   Close resolved tickets



### 👨‍💼 **Admin Features**

-   Manage all tickets\
-   Create departments\
-   Assign agents\
-   Manage users\
-   Set priority levels\
-   View support analytics



## 🏗️ **Tech Stack**

### **Frontend**

-   React.js\
-   Vite\
-   Axios\
-   Context API

### **Backend**

-   Node.js\
-   Express.js\
-   MongoDB + Mongoose\
-   JWT\
-   Bcrypt

### **Database**

-   MongoDB Atlas



## ⚙️ **Setup Instructions**

### Backend

    cd backend  
    npm install  
    npm run dev  

### Frontend

    cd client/vite-project  
    npm install  
    npm run dev  



## 🔐 **Environment Variables**

**Backend `.env`:**

    MONGO_URI=
    JWT_SECRET=
    PORT=5000


