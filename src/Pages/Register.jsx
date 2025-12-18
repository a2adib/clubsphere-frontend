import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { registerWithEmailPassword, handleUpdateProfile, handleGoogleSignin } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoInput = form.photo;
    const password = form.password.value;
    const file = photoInput.files[0];
    const role = form.role.value; // New: get role from form

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    if (role === "Choose Role") {
      toast.error("Please select a role");
      return;
    }

    try {
      // Correct ImgBB upload
      const imageFormData = new FormData();
      imageFormData.append('image', file);
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
        imageFormData
      );
      const imageUrl = imgbbRes.data.data.display_url;

      // Firebase registration
      await registerWithEmailPassword(email, password);
      await handleUpdateProfile(name, imageUrl);

      // Backend user creation (now includes role)
      const userDataForBackend = {
        name,
        email,
        imageUrl,
        role,
        password
      };
      await axios.post("http://localhost:3000/users", userDataForBackend);

      toast.success("Registered successfully");
      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Registration failed");
    }
  };

  const handleGoogleSignIn = () => {
    handleGoogleSignin()
      .then((res) => {
        console.log(res);
        toast.success("Registered successfully");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="file"
                name="photo"
                placeholder="photo url"
                className="input input-bordered"
              />
            </div>

            {/* NEW ROLE SELECT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select name="role" className="select select-bordered w-full">
                <option disabled selected>Choose Role</option>
                <option>Member</option>
                <option>Club Manager</option>
              </select>
            </div>
            {/* END NEW ROLE SELECT */}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <div className="card-body">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Login
              </Link>
            </p>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-primary"
            >
              Register with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
