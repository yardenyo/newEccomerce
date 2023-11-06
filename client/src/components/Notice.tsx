import { Tooltip } from "primereact/tooltip";
import { useRef, useState } from "react";

type Props = {
  showNotice: boolean;
  setShowNotice: (showNotice: boolean) => void;
};

const Notice = ({ showNotice, setShowNotice }: Props) => {
  const [copied, setCopied] = useState(false);
  const noticeTooltipRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText("SUMMER30");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const handleNotice = () => {
    setShowNotice(false);
  };

  return (
    <>
      <Tooltip
        ref={noticeTooltipRef}
        target=".custom-tooltip"
        position="bottom"
      >
        <span data-pr-tooltip="Copy to clipboard">
          {copied ? "Copied!" : "Click to copy"}
        </span>
      </Tooltip>
      <div
        className={`notice top-0 left-0 w-full bg-gray-100 text-center py-2 z-50 ${
          showNotice ? "fixed" : "hidden"
        }`}
      >
        <span
          className="float-right mr-4 hover:cursor-pointer"
          onClick={handleNotice}
        >
          <i className="pi pi-times"></i>
        </span>
        <span className="font-semibold">
          <div className="wrapper flex justify-center items-center space-x-2">
            <div className="message-wrapper flex items-center space-x-2">
              <i className="pi pi-tags"></i>
              <span>
                30% off storewide —{" "}
                <span className="hidden md:inline-block"> Limited time!</span>{" "}
              </span>
            </div>
            <div className="code-wrapper flex items-center space-x-2">
              <span className="hidden md:inline-block">Use code: </span>
              <span className="navbar-link custom-tooltip" onClick={handleCopy}>
                SUMMER30
              </span>
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default Notice;
