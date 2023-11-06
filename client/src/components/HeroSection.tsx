import Navbar from "@/components/Navbar";
import HeroSectionImg from "@/assets/images/herosection.png";

function HeroTitle() {
  return (
    <h1 className="text-4xl md:text-5xl font-semibold md:w-3/5">
      <span>Elevate your digital</span>
      <span className="text-[#377dff]"> lifestyle</span>
      <span> with our technology.</span>
    </h1>
  );
}

function HeroDescription() {
  return <p>Find the perfect tech solutions tailored to your unique needs.</p>;
}

function HeroSection() {
  return (
    <div className="relative bg-gradient overflow-hidden px-4 flex flex-col">
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row text-center md:text-left pt-20 px-10 items-center justify-center">
        <img
          src={HeroSectionImg}
          alt="hero-section"
          className="w-full md:w-2/5"
        />
        <div className="flex flex-col space-y-4 items-center justify-center md:items-start md:justify-start">
          <HeroTitle />
          <HeroDescription />
          <button className="btn btn-primary w-1/2 md:w-1/3">Shop Now</button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
