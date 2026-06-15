import { useState } from "react";
import { login, register } from "../api/transactions";
import toast from "react-hot-toast";

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.email || !form.password)
      return toast.error("All fields required");
    setLoading(true);
    try {
      const res = isLogin ? await login(form) : await register(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      toast.success(isLogin ? "Welcome back!" : "Account created!");
      onAuth();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "fixed",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-150px",
          left: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "28px",
            }}
          >
            💰
          </div>
          <h1
            style={{
              color: "white",
              fontSize: "28px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            Fintech Dashboard
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              margin: "0.5rem 0 0",
              fontSize: "14px",
            }}
          >
            Your personal finance tracker
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "2rem",
            boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          }}
        >
          {/* Tabs */}
          <div
            style={{
              display: "flex",
              background: "#f8fafc",
              borderRadius: "12px",
              padding: "4px",
              marginBottom: "1.5rem",
            }}
          >
            {["Sign In", "Register"].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setIsLogin(i === 0)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  transition: "all 0.2s",
                  background: (i === 0) === isLogin ? "white" : "transparent",
                  color: (i === 0) === isLogin ? "#6366f1" : "#94a3b8",
                  boxShadow:
                    (i === 0) === isLogin
                      ? "0 2px 8px rgba(0,0,0,0.1)"
                      : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {/* Email */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                  }}
                >
                  ✉️
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handle}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                  }}
                >
                  🔒
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handle}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  style={{
                    width: "100%",
                    padding: "12px 14px 12px 42px",
                    border: "1.5px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                    fontFamily: "Inter, sans-serif",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>
            </div>
          </div>

          <button
            onClick={submit}
            disabled={loading}
            style={{
              width: "100%",
              marginTop: "1.5rem",
              padding: "14px",
              background: loading
                ? "#a5b4fc"
                : "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              letterSpacing: "0.3px",
            }}
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Sign In →"
                : "Create Account →"}
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              color: "#94a3b8",
              marginTop: "1rem",
              marginBottom: 0,
            }}
          >
            {isLogin ? "New here? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: "none",
                border: "none",
                color: "#6366f1",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
