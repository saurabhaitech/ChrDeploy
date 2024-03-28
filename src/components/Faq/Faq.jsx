import React from "react";
import { FaAngleDown } from "react-icons/fa";

const QuesList = [
  {
    Ques: "What are the factors affecting your credit score?",
    Ans: "Regularly checking your credit score helps you stay on top of your creditworthiness and financial health. It allows you to see where you stand in terms of your credit profile and helps you identify areas that need improvement or attention. Checking your credit score allows you to identify any errors or inaccuracies on your credit report. If you find an error, you can report it to the credit bureau and get it corrected, which can improve your score and creditworthiness.",
  },
  {
    Ques: "Why should you take credit report from us?",
    Ans: "Regularly checking your credit score helps you stay on top of your creditworthiness and financial health. It allows you to see where you stand in terms of your credit profile and helps you identify areas that need improvement or attention. Checking your credit score allows you to identify any errors or inaccuracies on your credit report. If you find an error, you can report it to the credit bureau and get it corrected, which can improve your score and creditworthiness.",
  },
  {
    Ques: "How is my Credit Score determined?",
    Ans: "Regularly checking your credit score helps you stay on top of your creditworthiness and financial health. It allows you to see where you stand in terms of your credit profile and helps you identify areas that need improvement or attention. Checking your credit score allows you to identify any errors or inaccuracies on your credit report. If you find an error, you can report it to the credit bureau and get it corrected, which can improve your score and creditworthiness.",
  },
  {
    Ques: "What affects my Credit Score?",
    Ans: "Regularly checking your credit score helps you stay on top of your creditworthiness and financial health. It allows you to see where you stand in terms of your credit profile and helps you identify areas that need improvement or attention. Checking your credit score allows you to identify any errors or inaccuracies on your credit report. If you find an error, you can report it to the credit bureau and get it corrected, which can improve your score and creditworthiness.",
  },
  {
    Ques: "How does my Credit Score affect my ability to get credit?",
    Ans: "Regularly checking your credit score helps you stay on top of your creditworthiness and financial health. It allows you to see where you stand in terms of your credit profile and helps you identify areas that need improvement or attention. Checking your credit score allows you to identify any errors or inaccuracies on your credit report. If you find an error, you can report it to the credit bureau and get it corrected, which can improve your score and creditworthiness.",
  },
];

const Faq = () => {
  return (
    <div className="flex flex-col md:flex-row py-20 gap-6 px-4 md:px-10 xl:px-32">
      <div className="md:w-[20%] text-secondary text-center font-bold text-3xl">
        Frequently Asked Questions
      </div>
      <div className="flex flex-col gap-4 md:w-[75%]">
        {QuesList.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center border-neutral10 border-[1px] rounded-[8px] px-4 py-6"
          >
            <div
              className="flex flex-row w-[100%] justify-between items-center text-[14px] font-semibold"
              onClick={() => {
                document
                  .getElementById(`ans${index}`)
                  .classList.toggle("hidden");
                document
                  .getElementById(`arrow${index}`)
                  .classList.toggle("rotate-[180deg]");
              }}
            >
              <span className="w-[80%]">{item.Ques}</span>
              <div
                id={`arrow${index}`}
                className="transition-all duration-500 bg-neutral10 w-[32px] h-[32px] flex flex-col items-center rounded-[50%]"
              >
                <FaAngleDown className="m-auto" size={20} />
              </div>
            </div>
            <div
              id={`ans${index}`}
              className="hidden mt-4 text-balance text-[13px]"
            >
              {item.Ans}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
