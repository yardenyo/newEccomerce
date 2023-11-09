import { useState, useEffect, useRef } from "react";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router-dom";

const Promotion = () => {
  const [copied, setCopied] = useState(false);
  const promotionTooltipRef = useRef(null);
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const endDate = new Date("2025-11-06 15:45:00").getTime();
    const now = new Date().getTime();
    const timeDifference = endDate - now;

    if (timeDifference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, offerEnded: true };
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, offerEnded: false };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const handleCopy = () => {
    navigator.clipboard.writeText("SUMMER30");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleNavigate = () => {
    navigate("/shop");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="flex flex-col-reverse md:flex-row py-4">
      <Tooltip
        ref={promotionTooltipRef}
        target=".promotion-tooltip"
        position="bottom"
      >
        <span data-pr-tooltip="Copy to clipboard">
          {copied ? "Copied!" : "Click to copy"}
        </span>
      </Tooltip>
      <div className="left-side w-full md:w-1/2 bg-[#1d0100] min-h-[50vh] flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dweltcoxk/image/upload/v1699276778/hqekeh2vy2zrc4ghnu96.png"
          alt="promotion"
          className="w-96 object-cover"
        />
      </div>
      <div className="right-side w-full md:w-1/2 bg-[#ffdd99] min-h-[50vh]">
        <div className="flex flex-col justify-center h-full space-y-4 p-4 md:px-20">
          <p className="text-lg">
            Promotion code -{" "}
            <span className="link promotion-tooltip" onClick={handleCopy}>
              SUMMER30
            </span>
          </p>
          <h2 className="text-3xl font-semibold">Hurry up! 30% OFF</h2>
          <p className="text-lg">
            Thousands of high tech products are waiting for you
          </p>
          <p className="text-lg">
            {timeLeft.offerEnded ? "Offer ended" : "Offer expires in:"}
          </p>
          {!timeLeft.offerEnded && (
            <div className="countdown">
              <div className="countdown-box">
                <span className="countdown-number">{timeLeft.days}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-number">{timeLeft.hours}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-number">{timeLeft.minutes}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-box">
                <span className="countdown-number">{timeLeft.seconds}</span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>
          )}
          <button
            className="btn btn-primary w-1/2 md:w-1/3"
            onClick={handleNavigate}
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Promotion;
