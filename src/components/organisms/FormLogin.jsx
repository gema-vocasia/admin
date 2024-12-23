import { useState } from "react";
import FormField from "../molecules/FormField";
import { Button, Judul, Left } from "../atoms";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../config/auth.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email tidak boleh kosong.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!password) {
      newErrors.password = "Password tidak boleh kosong.";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const user = await login(email, password);

      if (!user) {
        throw new Error("Login failed");
      }
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      if (error.message === "Wrong Email or Password") {
        toast.error("Password atau email yang Anda masukkan salah!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Terjadi kesalahan, silakan coba lagi.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen md:flex-row">
      <ToastContainer limit={1} />
      <Left />
      <div
        className="flex flex-col items-center justify-center flex-1 p-8"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <div
          className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <Judul />
          <h1
            className="text-xl md:text-3xl font-bold text-[#5E84C5] text-center mb-8"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            Selamat Datang Admin
          </h1>
          <form className="mt-6 space-y-6" onSubmit={handleLogin}>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="800"
            >
              <FormField
                label="Email"
                type="email"
                name="email"
                value={email}
                placeholder="Masukan Email"
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                required
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="1000"
            >
              <FormField
                label="Password"
                type="password"
                name="password"
                value={password}
                placeholder="Masukan Password"
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
              />
            </div>

            {errors.general && (
              <p
                className="text-sm text-center text-red-500"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="1200"
              >
                {errors.general}
              </p>
            )}

            <div
              className="flex justify-center pt-2"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="1400"
            >
              <Button
                type="submit"
                className="w-full py-3 text-white bg-[#5E84C5] hover:bg-[#4A6F98] rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Sedang Masuk...
                  </div>
                ) : (
                  "Masuk"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
