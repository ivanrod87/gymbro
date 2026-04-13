export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-900">
      <div className="card-base w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">GymBro Login</h1>
        
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-gray-50 placeholder-gray-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-gray-50 placeholder-gray-400 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full mt-6"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Pilot Stage: Predefined credentials only
        </p>
      </div>
    </div>
  );
}
