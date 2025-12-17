import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const { loginWithEmailPassword, handleGoogleSignin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        loginWithEmailPassword(email, password)
            .then(res => {
                toast.success("Logged in successfully",res.data);
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message));
    }

    const handleGoogleSignIn = () => {
        handleGoogleSignin()
            .then(res => {
                toast.success("Logged in successfully",res.data);
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message));
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome back! Log in to access your dashboard, manage your jobs, and connect with other freelancers.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="card-body">
                        <p>Dont have an account? <Link to="/register" className="link link-primary">Register</Link></p>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary">Login with Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;