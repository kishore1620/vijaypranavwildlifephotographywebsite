import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileForm = () => {
    const [formData, setFormData] = useState({
        profilePicture: null,
        name: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        state: "",
        district: "",
        extraInfo: "",
    });

    const [savedProfile, setSavedProfile] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?._id) {
            setUserId(storedUser._id);
            axios
                .get(`http://localhost:5000/api/profile/${storedUser._id}`)
                .then((res) => {
                    if (res.data) {
                        setFormData(res.data);
                        setSavedProfile(res.data);
                    }
                })
                .catch((err) => console.error("Profile not found yet:", err));
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
            setFormData({ ...formData, profilePicture: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("User not logged in!");
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        data.append("userId", userId);

        try {
            const res = await axios.post(
                "http://localhost:5000/api/profile/save",
                data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setSavedProfile(res.data);
            alert("✅ Profile saved successfully!");
        } catch (err) {
            console.error(err);
            alert("❌ Error saving profile");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center fw-bold mb-5 text-secondary" style={{ marginTop: "150px" }}>
                Manage Your Profile
            </h2>

            <div className="row">
                {/* Profile Form */}
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            <h4 className="mb-3 text-dark">Edit Profile</h4>
                            <form onSubmit={handleSubmit} className="row g-3">
                                <div className="col-12">
                                    <label className="form-label fw-semibold">
                                        Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="profilePicture"
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label fw-semibold">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold">Address</label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">Country</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">State</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label fw-semibold">District</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label fw-semibold">
                                        Extra Information
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        name="extraInfo"
                                        value={formData.extraInfo}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>

                                <div className="col-12 d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-lg"
                                        style={{
                                            backgroundColor: "#ff6600",
                                            color: "white",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        Save Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Profile Preview */}
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-sm border-0 rounded-4">
                        <div className="card-body p-4">
                            {/* Center only the image */}
                            <div className="d-flex justify-content-center mb-3">
                                <img
                                    src={
                                        savedProfile?.profilePicture
                                            ? `http://localhost:5000/${savedProfile.profilePicture}`
                                            : "https://via.placeholder.com/150"
                                    }
                                    alt="Profile"
                                    className="rounded-circle border border-3"
                                    style={{ width: "280px", height: "300px", objectFit: "cover" }}
                                />
                            </div>

                            {/* Text remains left-aligned */}
                            <h4 className="mt-2 text-dark" style={{textAlign:"center"}} >
                                {savedProfile?.name || "No name yet"}
                            </h4>
                            <p className="text-muted mb-1">
                                <strong>Email:</strong> {savedProfile?.email || "Not set"}
                            </p>
                            <p className="text-muted mb-1">
                                <strong>Phone:</strong> {savedProfile?.phone || "Not set"}
                            </p>
                            <p className="text-muted mb-1">
                                <strong>Address:</strong> {savedProfile?.address || "Not set"}
                            </p>
                            <p className="text-muted mb-1">
                                <strong>Country:</strong> {savedProfile?.country || "Not set"}
                            </p>
                            <p className="text-muted mb-1">
                                <strong>State:</strong> {savedProfile?.state || "Not set"}
                            </p>
                            <p className="text-muted mb-1">
                                <strong>District:</strong> {savedProfile?.district || "Not set"}
                            </p>
                            <p className="text-muted">
                                <strong>Extra Info:</strong> {savedProfile?.extraInfo || "Not set"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileForm;
