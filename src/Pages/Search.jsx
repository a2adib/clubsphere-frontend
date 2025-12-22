import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from '../hooks/useAxios';

const Search = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedUpazila, setSelectedUpazila] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [donors, setDonors] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        axios.get("/districts.json").then(res => setDistricts(res.data.districts)).catch(err => console.error("Error fetching districts:", err));
        axios.get("/upazilas.json").then(res => setUpazilas(res.data.upazilas)).catch(err => console.error("Error fetching upazilas:", err));
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        const searchParams = {
            bloodGroup,
            district: selectedDistrict,
            upazila: selectedUpazila,
        };
        try {
            const res = await axiosInstance.get('/users', { params: searchParams });
            setDonors(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold text-center mb-8">Search for Donors</h1>
            <form onSubmit={handleSearch} className="mb-8 p-4 bg-gray-100 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Blood Group Dropdown */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Blood Group</span></label>
                        <select name="blood" className="select select-bordered w-full" onChange={(e) => setBloodGroup(e.target.value)} defaultValue="">
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
                        <select name="district" className="select select-bordered w-full" onChange={(e) => setSelectedDistrict(e.target.value)} defaultValue="">
                            <option value="" disabled>Select District</option>
                            {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                        </select>
                    </div>

                    {/* Upazila Dropdown */}
                    <div className="form-control">
                        <label className="label"><span className="label-text">Upazila</span></label>
                        <select name="upazila" onChange={(e) => setSelectedUpazila(e.target.value)} className="select select-bordered w-full" disabled={!selectedDistrict} defaultValue="">
                            <option value="" disabled>Select Upazila</option>
                            {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                        </select>
                    </div>

                    <div className="form-control mt-auto">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>

            {/* Donor List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {donors.map(donor => (
                    <div key={donor.email} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{donor.name}</h2>
                            <p>Blood Group: {donor.blood}</p>
                            <p>Location: {donor.selectedUpazila}, {donor.selectedDistrict}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
