# 💰 Fintech Dashboard

A full-stack personal finance tracker built with **Spring Boot** (backend) and **React** (frontend). Users can register, log in, and manage their own transactions privately with JWT-based authentication.

---

## 🌟 Features

- 🔐 **User Authentication** — Register & login with JWT tokens
- 💸 **Transaction Management** — Add, view, filter, and delete transactions
- 📊 **Dashboard Summary** — Total income, expenses, and net balance
- 🥧 **Spending Chart** — Pie chart breakdown by category
- 💡 **Smart Insight** — Rule-based financial advice based on your data
- 🔍 **Filters** — Filter transactions by category and date range
- 👤 **User-Specific Data** — Each user sees only their own transactions

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17, Spring Boot 3, Spring Security |
| Authentication | JWT (JSON Web Tokens) |
| Database | MySQL 8 |
| ORM | Spring Data JPA / Hibernate |
| Frontend | React 18, Vite |
| Styling | Tailwind CSS, Inline Styles |
| Charts | Recharts |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
fintech-dashboard/
├── fintech-dashboard/          # Spring Boot Backend
│   ├── src/main/java/com/fintech/
│   │   ├── controller/         # REST Controllers
│   │   ├── dto/                # Request/Response DTOs
│   │   ├── model/              # JPA Entities
│   │   ├── repository/         # Spring Data Repositories
│   │   ├── security/           # JWT Auth Filter & Config
│   │   └── service/            # Business Logic
│   └── src/main/resources/
│       └── application.properties
└── fintech-frontend/           # React Frontend
    └── src/
        ├── api/                # Axios API calls
        ├── components/         # React Components
        └── App.jsx
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Java 17+
- Maven
- MySQL 8
- Node.js 18+

---

### 🗄️ Database Setup

```sql
CREATE DATABASE fintech_db;
CREATE USER 'fintech_user'@'localhost' IDENTIFIED BY 'fintech123';
GRANT ALL PRIVILEGES ON fintech_db.* TO 'fintech_user'@'localhost';
FLUSH PRIVILEGES;
```

---

### 🚀 Backend Setup

1. Navigate to the backend folder:
```bash
cd fintech-dashboard
```

2. Configure `src/main/resources/application.properties`:
```properties
server.port=8081

spring.datasource.url=jdbc:mysql://localhost:3306/fintech_db
spring.datasource.username=fintech_user
spring.datasource.password=fintech123
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

jwt.secret=fintech_super_secret_key_2024_very_long_string_for_security
jwt.expiration=86400000
```

3. Run the backend:
```bash
./mvnw spring-boot:run
```

Backend runs on: `http://localhost:8081`

---

### 🎨 Frontend Setup

1. Navigate to the frontend folder:
```bash
cd fintech-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Transactions (🔒 Requires JWT)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions?category=Food` | Filter by category |
| GET | `/api/transactions?startDate=2024-01-01&endDate=2024-01-31` | Filter by date |
| POST | `/api/transactions` | Add a transaction |
| DELETE | `/api/transactions/{id}` | Delete a transaction |
| GET | `/api/transactions/summary` | Get dashboard summary |

### Auth Header
```
Authorization: Bearer <your_jwt_token>
```

---

## 📸 Screenshots

### Login Page
Clean and modern authentication with register/login toggle.

### Dashboard
- Summary cards showing income, expenses, and net balance
- Smart financial insight based on spending ratio
- Pie chart of spending by category
- Transaction list with filters and delete option

---

## 🔐 Security

- Passwords are hashed using **BCrypt**
- JWT tokens expire after **24 hours**
- Each user can only access their own transactions
- All transaction endpoints are protected by Spring Security

---

## 👨‍💻 Author

**Sayel Abbash**
- GitHub: [@sayelabbash](https://github.com/sayelabbash)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
