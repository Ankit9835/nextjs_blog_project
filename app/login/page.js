"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("ryan@gmail.com");
  const [password, setPassword] = useState("rrrrrr");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Login success");
      router.push(callbackUrl);
    }
  };
  return (
    <main>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-itemscenter
    vh-100"
        >
          <div className="col-lg-5 bg-light p-5 shadow">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mb-2"
                placeholder="Your email"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mb-2"
                placeholder="Your password"
              />
              <button
                className="btn btn-primary"
                disabled={loading || !email || !password}
              >
                {loading ? "Please wait.." : "Submit"}
              </button>
              <button
                className="btn btn-danger mb-4"
                onClick={() => signIn("google", { callbackUrl })}
              >
                Sign in with Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
