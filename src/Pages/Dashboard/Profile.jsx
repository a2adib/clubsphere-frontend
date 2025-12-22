import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/${user.email}`)
                .then(res => {
                    setUserData(res.data);
                    setSelectedDistrict(res.data.selectedDistrict || '');
                    setSelectedUpazila(res.data.selectedUpazila || '');
                })
                .catch(err => console.error("Error fetching user data:", err));
        }

        // Fetch location data
        axios.get("/districts.json").then(res => setDistricts(res.data.districts)).catch(err => console.error("Error fetching districts:", err));
        axios.get("/upazilas.json").then(res => setUpazilas(res.data.upazilas)).catch(err => console.error("Error fetching upazilas:", err));

    }, [user, axiosSecure]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const blood = form.blood.value;
        const imageUrl = userData.imageUrl; // Assuming image update is a separate process or not allowed via this form

        const updatedData = {
            name,
            blood,
            selectedDistrict,
            selectedUpazila,
            imageUrl
        };

        try {
            await axiosSecure.patch(`/users/${user.email}`, updatedData);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
            // Refresh user data after update
            axiosSecure.get(`/users/${user.email}`)
                .then(res => setUserData(res.data))
                .catch(err => console.error("Error re-fetching user data:", err));
        } catch (err) {
            toast.error("Failed to update profile.");
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-end mb-4">
                    {!isEditing ? (
                        <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                            Edit Profile
                        </button>
                    ) : (
                        <button onClick={handleUpdateProfile} type="submit" className="btn btn-success">
                            Save Changes
                        </button>
                    )}
                </div>
                <form onSubmit={handleUpdateProfile}>
                    <div className="form-control mb-4">
                        <label className="label">Name</label>
                        <input type="text" name="name" defaultValue={userData.name} className="input input-bordered" disabled={!isEditing} />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Email</label>
                        <input type="email" name="email" defaultValue={userData.email} className="input input-bordered" disabled />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Avatar</label>
                        {userData.imageUrl && <img src={userData.imageUrl} alt="User Avatar" className="w-24 h-24 rounded-full object-cover mb-2" />}
                        {/* Optionally add image upload functionality here if needed */}
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Blood Group</label>
                        <select name="blood" className="select select-bordered w-full" defaultValue={userData.blood} disabled={!isEditing}>
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
                    <div className="form-control mb-4">
                        <label className="label">District</label>
                        <select name="district" className="select select-bordered w-full" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!isEditing}>
                            <option value="" disabled>Select District</option>
                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Upazila</label>
                        <select name="upazila" className="select select-bordered w-full" value={selectedUpazila} onChange={(e) => setSelectedUpazila(e.target.value)} disabled={!isEditing}>
                            <option value="" disabled>Select Upazila</option>
                            {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>
                    {!isEditing && (
                        <div className="form-control mt-6">
                            <button className="btn btn-outline" disabled>Update Profile</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;
