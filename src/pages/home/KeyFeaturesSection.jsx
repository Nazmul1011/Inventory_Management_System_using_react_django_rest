import React from "react";
import {
  HiOutlineCube,
  HiOutlineChartBar,
  HiOutlineRefresh,
} from "react-icons/hi";

export const KeyFeaturesSection = () => {
  return (
    <div className="py-10 px-8 lg:px-10">
      <h1 className="text-4xl font-bold">Key Features</h1>
      <p className="text-gray-400 mt-4 max-w-2xl">
        StockWise offers a comprehensive suite of tools to help you manage your
        inventory effectively.
      </p>

      {/* Card container */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {/* Card 1 */}
        <div
          className="card bg-base-100 shadow-md rounded-lg p-6 
  group hover:bg-blue-400 transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col items-start gap-3">
            {/* Icon */}
            <HiOutlineCube className="text-4xl text-primary transition-colors duration-300 group-hover:text-white" />

            {/* Heading */}
            <h2 className="text-xl font-bold transition-colors duration-300 group-hover:text-white">
              Real-time Tracking
            </h2>

            {/* Paragraph */}
            <p className="text-gray-500 transition-colors duration-300 group-hover:text-white">
              Monitor your stock levels in real-time, ensuring you always have
              the right amount of product on hand.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          className="card bg-base-100 shadow-md rounded-lg p-6 
  group hover:bg-blue-400 transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col items-start gap-3">
            {/* Icon */}
            <HiOutlineChartBar className="text-4xl text-primary transition-colors duration-300 group-hover:text-white" />

            {/* Heading */}
            <h2 className="text-xl font-bold transition-colors duration-300 group-hover:text-white">
              Sales Analytics
            </h2>

            {/* Paragraph */}
            <p className="text-gray-500 transition-colors duration-300 group-hover:text-white">
              Analyze sales trends and identify best-selling products to
              optimize your inventory strategy.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          className="card bg-base-100 shadow-md rounded-lg p-6 
  group hover:bg-blue-400 transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col items-start gap-3">
            {/* Icon */}
            <HiOutlineRefresh className="text-4xl text-primary transition-colors duration-300 group-hover:text-white" />

            {/* Heading */}
            <h2 className="text-xl font-bold transition-colors duration-300 group-hover:text-white">
              Automated Reordering
            </h2>

            {/* Paragraph */}
            <p className="text-gray-500 transition-colors duration-300 group-hover:text-white">
              Set up automated reordering rules to ensure you never run out of
              essential items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
