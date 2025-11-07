import React from 'react';
import { BsHexagonFill } from 'react-icons/bs'; // Icon for the logo
import { HiOutlineRefresh } from 'react-icons/hi';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Icon for the monitoring status

const Navbar = () => {
  return (
    // Main banner container: dark blue background and full width
    <header className="bg-blue-950 text-white w-full border-b border-gray-500">
      <div className="max-w-9xl  h-20 flex  gap-[60rem] items-center">
        
        {/* Left side: Logo and Title */}
        <div className="flex items-center space-x-3 pl-5">
          
          {/* Logo Icon: Purple Hexagon */}
          <div className="p-1 rounded-full bg-purple-600">
            <BsHexagonFill className="text-white text-3xl" />
          </div>
          
          {/* Title and Subtitle */}
          <div>
            <h1 className="text-xl font-semibold leading-none">
              Dark Web Monitoring
            </h1>
            <p className="text-sm text-gray-400 leading-none mt-1">
              Real-time threat intelligence
            </p>
          </div>
        </div>

        {/* Right side: Continuous Monitoring Status */}
        <div className="flex items-center space-x-2 text-pink-500 ">
          <FaEye className="text-sm animate-spin-slow" /> {/* Spinning Icon */}
          <span className="text-sm text-white">
            Continuously monitoring
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;