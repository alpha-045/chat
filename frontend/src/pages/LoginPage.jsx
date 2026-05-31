import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [info, setinfo] = useState({
    email: "",
    password: "",
  });
  const [err, seterr] = useState({});
  const [showpass, setshowpass] = useState(false);
  const [succes, setsuccess] = useState({});

  const {login} = useAuthStore();
  
 const validatefields = () => {
    if (!info.email.trim()) return toast.error("email darori...");
    if (!info.password.trim()) return toast.error("pass darori...");
    if (info.password.length < 6) return toast.error("pass tfout 6...");

    return true;
  };

  const sub = async (e) => {
    e.preventDefault();
    try{
        if (validatefields() == true) {
        login(info);
        }
    }catch(err){
      console.log(err)
    }
  
  };

  return (
    <form onSubmit={sub}>

        '
      <div>
        <Toaster />
      </div>
      '
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              account
            </p>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                email
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="@gmail.com"
                name="email"
                type="email"
                onChange={(e) => setinfo({ ...info, email: e.target.value })}
                value={info.email}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                placeholder="••••••••"
                id="password"
                  type={showpass ? "text" : "password"}
                onChange={(e) => setinfo({ ...info, password: e.target.value })}
                value={info.password}
              />

              <div className="flex justify-end p-2">
                <button
                  onClick={() => setshowpass(!showpass)}
                  className="relative bottom-10"
                >
                  {" "}
                  {showpass ? <Eye /> : <EyeOff />}
                </button>
              </div>
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
              type="submit"
            >
              sign in{" "}
            </button>
            <div class="flex flex-col mt-4 text-sm text-center dark:text-gray-300">
              <p>
                dont have account{" "}
                <a
                  href="/signup"
                  class="text-blue-400 transition hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
