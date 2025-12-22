import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* Banner */}
            <header className="bg-red-600 text-white text-center p-20">
                <h1 className="text-5xl font-extrabold mb-4">Be a Hero, Donate Blood</h1>
                <p className="text-xl mb-8">Your donation can save up to three lives. Join our community of heroes today.</p>
                <div className="flex justify-center gap-4">
                    <Link to="/register" className="bg-white text-red-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                        Become a Donor
                    </Link>
                    <Link to="/search" className="bg-red-800 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-red-700 transition-colors">
                        Search for Donors
                    </Link>
                </div>
            </header>

            {/* Featured Section */}
            <section className="container mx-auto my-20">
                <h2 className="text-4xl font-bold text-center mb-12">Why Your Donation Matters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-3">Critical Support</h3>
                        <p>Provide life-saving blood for surgeries, cancer treatments, and chronic illnesses.</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-3">Community Resilience</h3>
                        <p>A ready blood supply is crucial for emergencies and natural disasters.</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-3">A Gift of Life</h3>
                        <p>Each donation is a selfless act that gives someone a second chance at life.</p>
                    </div>
                </div>
            </section>

            {/* How to Donate Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-12">Simple Steps to Donate</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl text-red-600 mb-4">1</div>
                            <h3 className="text-xl font-semibold">Register</h3>
                            <p>Sign up online to become a donor.</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl text-red-600 mb-4">2</div>
                            <h3 className="text-xl font-semibold">Screening</h3>
                            <p>A quick health check to ensure you're eligible.</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl text-red-600 mb-4">3</div>
                            <h3 className="text-xl font-semibold">Donate</h3>
                            <p>The donation itself takes only about 10 minutes.</p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl text-red-600 mb-4">4</div>
                            <h3 className="text-xl font-semibold">Refresh</h3>
                            <p>Enjoy a snack and a drink on us after your donation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                    <p className="mb-4">Have questions or need support? We're here to help.</p>
                    <p>Email: <a href="mailto:info@blooddonation.com" className="text-red-600">info@blooddonation.com</a></p>
                    <p>Phone: 123-456-7890</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center p-6">
                <p>&copy; 2025 Blood Donation. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;