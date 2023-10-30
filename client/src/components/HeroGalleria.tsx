import { Image } from "@/types";
import { Galleria } from "primereact/galleria";
import images from "@/constants/HeroSectionImages";

const HeroGalleria = () => {
  const itemTemplate = (item: Image) => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxHeight: "60vh",
          overflow: "hidden",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img
          src={item.source}
          alt={item.alt}
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>
    );
  };

  const thumbnailTemplate = (item: Image) => {
    return (
      <img src={item.source} alt={item.alt} style={{ display: "block" }} />
    );
  };

  return (
    <div className="container mx-auto">
      <Galleria
        value={images}
        numVisible={5}
        circular
        showThumbnails={false}
        showItemNavigators
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
};

export default HeroGalleria;
