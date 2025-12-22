import React from 'react';

const Blog = () => {
    return (
        <div className="container mx-auto my-16">
            <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Add your blog posts here */}
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">The Importance of Blood Donation</h2>
                        <p>Discover why donating blood is a crucial act of kindness that saves lives and supports your community.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Read More</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Who Can Donate Blood?</h2>
                        <p>Learn about the eligibility requirements for blood donation and find out if you can be a lifesaver.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Read More</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">The Blood Donation Process</h2>
                        <p>A step-by-step guide to what you can expect during the blood donation process, from registration to recovery.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
