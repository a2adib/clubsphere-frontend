import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";
import useAxios from "../hooks/useAxios";

const Register = () => {
  const { registerWithEmailPassword, handleUpdateProfile, handleGoogleSignin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  
  // State for location data
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('');
  

  // Fetch location data on mount
  useEffect(() => {
    axios.get("/districts.json").then(res => setDistricts(res.data.districts)).catch(err => console.error("Error fetching districts:", err));
    axios.get("/upazilas.json").then(res => setUpazilas(res.data.upazilas)).catch(err => console.error("Error fetching upazilas:", err));
  }, []); 



  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoInput = form.photo;
    const password = form.password.value;
    const file = photoInput.files[0];
    const blood = form.blood.value;
    

    // --- Validations ---
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
    if (blood === "Choose blood group") {
      toast.error("Please select a blood group");
      return;
    }
   

    try {
      // 1. Image Upload
      const imageFormData = new FormData();
      imageFormData.append('image', file);
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
        imageFormData
      );
      const imageUrl = imgbbRes.data.data.display_url;

      // 2. Firebase Registration
      await registerWithEmailPassword(email, password);
      await handleUpdateProfile(name, imageUrl);

      // 3. Backend User Creation
      const userDataForBackend = {
        name,
        email,
        imageUrl,
        blood,
        selectedDistrict,
        selectedUpazila,
        password
      };
      console.log(userDataForBackend);
      

      await axiosInstance.post("/users", userDataForBackend);

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
              <label className="label"><span className="label-text">Name</span></label>
              <input type="text" name="name" placeholder="name" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" name="email" placeholder="email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Photo URL</span></label>
              <input type="file" name="photo" placeholder="photo url" className="input input-bordered" />
            </div>

            {/* Blood Group Dropdown */}
            <div className="form-control">
              <label className="label"><span className="label-text">Blood Group</span></label>
              <select name="blood" className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>Choose blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            
            {/* District Dropdown */}
            <div className="form-control">
              <label className="label"><span className="label-text">District</span></label>
              <select name="district" className="select select-bordered w-full" onChange={(e) => setSelectedDistrict(e.target.value)} defaultValue="selectedDistrict">
                <option value="selectedDistrict" disabled>Select District</option>
                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>

            {/* Upazila Dropdown */}
            <div className="form-control">
              <label className="label"><span className="label-text">Upazila</span></label>
              <select name="upazila" onChange={(e) => setSelectedUpazila(e.target.value)} className="select select-bordered w-full" disabled={!selectedDistrict} defaultValue="selectedUpazila">
                <option value="selectedUpazila" disabled>Select Upazila</option>
                {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" name="password" placeholder="password" className="input input-bordered" />
            </div>
            
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <div className="card-body">
            <p>Already have an account? <Link to="/login" className="link link-primary">Login</Link></p>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary">Register with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
