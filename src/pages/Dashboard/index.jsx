import { useState } from "react";
import { useTestQuery } from "src/hooks/services/useDashboard";

const Dashboard = () => {
  const [params] = useState({
    days: 7,
    page: 1,
    limit: 10,
  });
  // const { data, isLoading, isError } = useTestQuery(["test", params]);

  return (
    <div className="m-5">
      <div className="text-[28px] mb-[30px] font-bold">Dashboard</div>
      {/* <div className="grid grid-cols-4 gap-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <div className="cursor-pointer flex flex-row shadow-[0_0_7.2px_0_rgba(0,0,0,0.1)] p-2 rounded-[5px]">
            <img
              className="bg-[#B0BDD4] px-[17px] py-[14px] rounded-[5px]"
              src="/assets/icon/people.svg"
              alt="people"
            />
            <div className="ms-[22px] flex flex-col justify-items-center my-auto">
              <div className="text-sm font-extrabold">KBB-1</div>
              <div className="text-sm  text-[#AEAEB3] font-bold">26</div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Dashboard;
