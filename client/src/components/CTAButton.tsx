import React from "react";

type CTAButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const CTAButton: React.FC<CTAButtonProps> = ({ label, type, onClick }) => {
  return (
    <div className="input-field mt-4">
      <button
        onClick={onClick}
        type={type}
        className={`w-full px-4 py-2 bg-black/80 hover:bg-black text-white rounded-md focus:outline-none focus:ring`}
      >
        {label}
      </button>
    </div>
  );
};

export default CTAButton;
