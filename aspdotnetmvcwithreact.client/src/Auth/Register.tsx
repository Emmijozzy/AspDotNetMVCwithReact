import { Link } from "react-router-dom"
import UserRegister from "../Hooks/UseRegister"

const Register = () => {

  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    loading,
    resErrMes,
  } = UserRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
        <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h1>
            <h4 className="mt-2 text-center text-sm text-gray-600">Create a new account</h4>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="text-red-500">{resErrMes}</div>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="userName" className="sr-only">Username</label>
                    <input id="userName" name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
                    <span className="text-red-500">{errors.userName}</span>
                </div>
                <div>
                    <label htmlFor="email" className="sr-only">Email</label>
                    <input id="email" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
                    <span className="text-red-500">{errors.email}</span>
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input id="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    <span  className="text-red-500">{errors.password}</span>
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
                    <span className="text-red-500">{errors.confirmPassword}</span>
                </div>
            </div>
            <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </span>
                    {loading ? "Loading..." : "Register"}
                </button>
            </div>
        </form>
        <div className="text-center">
            Alreadly have an account:  <Link to="../Login"  className="text-sm text-indigo-600 hover:text-indigo-500 mx-2">Login</Link>
        </div>
    </div>
</div>
  )
}
export default Register