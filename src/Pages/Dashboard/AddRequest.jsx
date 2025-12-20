import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxios from "../../hooks/useAxios";

const AddRequest = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxios();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // Fetch location data on mount
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data.districts))
      .catch((err) => console.error("Error fetching districts:", err));
    axios
      .get("/upazilas.json")
      .then((res) => setUpazilas(res.data.upazilas))
      .catch((err) => console.error("Error fetching upazilas:", err));
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to create a request.");
      return;
    }

    const requestData = {
      requesterName: user.displayName,
      requesterEmail: user.email,
      recipientName: data.recipientName,
      bloodGroup: data.bloodGroup,
      selectedDistrict,
      selectedUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending", // Default status
    };

    await axiosInstance.post("/requests", requestData)
    .then(res => {
      toast.success("Donation request created successfully!");
      alert(res.data.insertedId ? "Request ID: " + res.data.insertedId : "Request submitted.");
      reset();
    })
    .catch(err => {
      console.error("Error creating request:", err);
      toast.error("Failed to create donation request. Please try again.");
    });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-10 bg-white shadow-xl rounded-2xl border">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
        Create Donation Request
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Requester Info (Read Only) */}
        <div className="form-control">
          <label className="label font-semibold">Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="input input-bordered bg-gray-100"
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold">Requester Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered bg-gray-100"
          />
        </div>

        {/* Recipient Info */}
        <div className="form-control">
          <label className="label font-semibold">Recipient Name</label>
          <input
            {...register("recipientName", { required: true })}
            type="text"
            placeholder="Enter recipient name"
            className="input input-bordered"
          />
        </div>

        {/* Blood Group Selector */}
        <div className="form-control">
          <label className="label font-semibold">Blood Group</label>
          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered"
            defaultValue=""
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">District</span>
          </label>
          <select
            name="district"
            className="select select-bordered w-full"
            onChange={(e) => setSelectedDistrict(e.target.value)}
            defaultValue="selectedDistrict"
          >
            <option value="selectedDistrict" disabled>
              Select District
            </option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila Dropdown */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upazila</span>
          </label>
          <select
            name="upazila"
            onChange={(e) => setSelectedUpazila(e.target.value)}
            className="select select-bordered w-full"
            disabled={!selectedDistrict}
            defaultValue="selectedUpazila"
          >
            <option value="selectedUpazila" disabled>
              Select Upazila
            </option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital & Address */}
        <div className="form-control">
          <label className="label font-semibold">Hospital Name</label>
          <input
            {...register("hospitalName", { required: true })}
            type="text"
            placeholder="e.g. Dhaka Medical College"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold">Full Address</label>
          <input
            {...register("fullAddress", { required: true })}
            type="text"
            placeholder="Zahir Raihan Rd, Dhaka"
            className="input input-bordered"
          />
        </div>

        {/* Date & Time */}
        <div className="form-control">
          <label className="label font-semibold">Donation Date</label>
          <input
            {...register("donationDate", { required: true })}
            type="date"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label font-semibold">Donation Time</label>
          <input
            {...register("donationTime", { required: true })}
            type="time"
            className="input input-bordered"
          />
        </div>

        {/* Request Message */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold">
            Request Message (Details)
          </label>
          <textarea
            {...register("requestMessage", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Why do you need blood?"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-control md:col-span-2 mt-4">
          <button
            type="submit"
            className="btn bg-red-600 hover:bg-red-700 text-white border-none w-full text-lg uppercase"
          >
            Request Blood
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRequest;
