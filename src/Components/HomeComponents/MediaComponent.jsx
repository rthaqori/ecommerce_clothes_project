import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import ImgOne from "../../assets/IMG1.jpg";
import ImgTwo from "../../assets/IMG2.jpg";
import ImgThree from "../../assets/IMG3.jpg";
import ImgFour from "../../assets/IMG4.jpg";
import ImgFive from "../../assets/IMG5.jpg";

const MediaComponent = () => {
  const images = [ImgOne, ImgTwo, ImgThree, ImgFour, ImgFive];

  const imgList = images.map((img, index) => {
    return (
      <div key={index} className="group">
        <img
          className="h-full w-full rounded-md object-cover group-hover:animate-bounce"
          src={img}
          alt="image"
        />
      </div>
    );
  });

  return (
    <section className="py-15">
      <div className="mb-5 flex w-full items-center justify-center gap-2 pb-5">
        <InstagramIcon />
        <p className="text-base-1 font-semibold">Follow Us on @ Insta</p>
      </div>
      <div className="grid grid-cols-5 gap-4 p-4">{imgList}</div>
    </section>
  );
};

export default MediaComponent;
