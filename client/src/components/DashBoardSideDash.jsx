import React from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import { DashBoardSideDashutils } from '../utils/DashBoardUtils';
import { useLocation } from 'react-router-dom';
const DashBoardSideDash = () => {
  const location = useLocation();
  return (
    <div className="fixed top-0 left-0 min-h-screen w-64 border-style border-r-[1px] flex flex-col gap-5">
      <div className="w-full mt-10 p-6">
        {DashBoardSideDashutils.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="flex items-start justify-center gap-5 flex-col"
          >
            {Object.keys(section).map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-lg font-bold mb-4 text-nowrap">
                  {category}
                </h2>
                <ul className="space-y-3">
                  {section[category].map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center space-x-3 pl-3 pb-1 border-style border-b-[1px] -wfull"
                    >
                      {/* Render the icon dynamically */}
                      <item.icon className="text-xl text-red-400" />
                      <NavLink
                        to={item.path}
                        className={() =>
                          location.pathname === item.path
                            ? 'text-red-600'
                            : 'hover:underline'
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashBoardSideDash;
