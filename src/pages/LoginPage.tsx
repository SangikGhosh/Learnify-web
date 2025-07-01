import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Section - Login */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md text-center">
            <h1 className="text-5xl font-bold mb-6">Use Rareblocks</h1>

            <div className="flex justify-center -space-x-2 mb-4">
              {[...Array(8)].map((_, i) => (
                <img
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-white hover:scale-110 transition-transform"
                  src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                  alt="user"
                />
              ))}
            </div>
            <p className="text-lg mb-8 text-gray-700">
              See what other <strong className="text-black">4600+ Developers</strong> are doing
            </p>

            <form className="space-y-5">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
              />
              <input
                type="password"
                placeholder="Password (min. 8 characters)"
                className="w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
              />

              <div className="flex justify-between items-center text-base">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" /> Remember me
                </label>
                <a href="#" className="text-gray-500 hover:text-black transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-900 transition-all text-lg font-medium"
              >
                Login
              </button>

              <p className="text-center text-base">
                Don't have an account?{" "}
                <a className="font-semibold hover:underline" href="#">
                  Create for Free
                </a>
              </p>
            </form>
          </div>
        </div>

        {/* Right Section - Features */}
        <div className="space-y-12">
          <h2 className="text-4xl font-bold leading-tight">
            Grow your business fast <br /> with Rareblocks UI Kit.
          </h2>

          <div className="space-y-8">
            <div className="flex items-start gap-5">
              <img 
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/icon-thumb.png" 
                alt="thumb" 
                className="w-10 h-10 mt-1 flex-shrink-0" 
              />
              <div>
                <p className="font-semibold text-xl mb-2">Proven success rate.</p>
                <p className="text-gray-600 text-lg">
                  Consec tetur adipis cing elit. Sit ornare adipiscing nunc, est nec, neque aliquet maecenas mi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <img 
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/icon-mailbox.png" 
                alt="mailbox" 
                className="w-10 h-10 mt-1 flex-shrink-0" 
              />
              <div>
                <p className="font-semibold text-xl mb-2">Get reports every week.</p>
                <p className="text-gray-600 text-lg">
                  Tetur adipis cing elit. Sit ornare adipiscing nunc, est nec, neque aliquet maecenas mi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <img 
                src="https://cdn.rareblocks.xyz/collection/clarity/images/sign-up/1/icon-sand-clock.png" 
                alt="sand clock" 
                className="w-10 h-10 mt-1 flex-shrink-0" 
              />
              <div>
                <p className="font-semibold text-xl mb-2">Task manager.</p>
                <p className="text-gray-600 text-lg">
                  Tetur adipis cing elit. Sit ornare adipiscing nunc, est nec, neque aliquet maecenas mi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;