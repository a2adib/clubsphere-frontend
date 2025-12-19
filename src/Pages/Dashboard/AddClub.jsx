import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';
import { useContext } from 'react';

const AddClub = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosInstance = useAxios();
    const {user} = useContext(AuthContext);

    const onSubmit = async (data) => {
        const file = data.bannerImage[0];

        try {
            // Upload image to ImgBB
            const imageFormData = new FormData();
            imageFormData.append('image', file);
            const imgbbRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_APIKEY}`,
                imageFormData
            );
            const imageUrl = imgbbRes.data.data.display_url;

            // Prepare club data for backend
            const clubData = {
                clubName: data.clubName,
                category: data.category,
                location: data.location,
                membershipFee: parseFloat(data.membershipFee), // Ensure it's a number
                bannerImage: imageUrl,
                description: data.description,
                clubMangerEmail: user?.email,
                status: 'pending' // Default status for new clubs
            };
            
            
            // Send club data to backend
            await axiosInstance.post('/clubs', clubData);

            toast.success("Club added successfully and is pending approval!");
            reset(); // Clear the form

        } catch (error) {
            console.error("Error adding club:", error);
            toast.error("Failed to add club. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create New Club</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Club Name */}
                <div className="form-control">
                    <label className="label font-semibold">Club Name</label>
                    <input {...register("clubName", { required: true })} type="text" placeholder="e.g. Dhaka Photography Club" className="input input-bordered focus:border-blue-500" />
                    {errors.clubName && <span className="text-red-500 text-sm mt-1">Club name is required</span>}
                </div>

                {/* Category */}
                <div className="form-control">
                    <label className="label font-semibold">Category</label>
                    <select {...register("category", { required: true })} className="select select-bordered">
                        <option value="">Select Category</option>
                        <option value="Photography">Photography</option>
                        <option value="Sports">Sports</option>
                        <option value="Tech">Tech</option>
                        <option value="Hiking">Hiking</option>
                        <option value="Book Club">Book Club</option>
                    </select>
                </div>

                {/* Location */}
                <div className="form-control">
                    <label className="label font-semibold">Location (City/Area)</label>
                    <input {...register("location", { required: true })} type="text" placeholder="e.g. Dhanmondi, Dhaka" className="input input-bordered" />
                </div>

                {/* Membership Fee */}
                <div className="form-control">
                    <label className="label font-semibold">Membership Fee (USD)</label>
                    <input {...register("membershipFee", { required: true })} type="number" placeholder="0 for free" className="input input-bordered" />
                </div>

                {/* Banner Image */}
                <div className="form-control md:col-span-2">
                    <label className="label font-semibold">Club Banner Image</label>
                    <input {...register("bannerImage", { required: true })} type="file" className="file-input file-input-bordered file-input-primary w-full" />
                </div>

                {/* Description */}
                <div className="form-control md:col-span-2">
                    <label className="label font-semibold">Description</label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Tell us about your club..."></textarea>
                </div>

                {/* Submit Button */}
                <div className="form-control md:col-span-2 mt-4">
                    <button type="submit" className="btn btn-primary w-full text-lg">Submit Club for Approval</button>
                </div>
            </form>
        </div>
    );
};

export default AddClub;