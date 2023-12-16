import { useState, useEffect } from "react";

import classes from "./ProductImages.module.css";

import { useParams } from "react-router-dom";

function ProductImages({ imagesArray, name }) {
  const { id } = useParams();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  const changeImageHandler = function (index) {
    setSelectedImageIndex(index);
  };

  return (
    <div className={classes.product__container__images}>
      <div className={classes.product__container__big__image}>
        <img
          src={imagesArray[selectedImageIndex].imageSrc}
          alt={name}
          className={`${classes.product__big__img} ${
            selectedImageIndex === 1 ? classes.product__big__img__bigger : ""
          }`}
        />
      </div>
      {imagesArray.length > 1 && (
        <div className={classes.product__container__small__images}>
          {imagesArray.map((img, i) => {
            return (
              <div
                key={img._id}
                onClick={() => changeImageHandler(i)}
                className={`${classes.product__container__image__small} ${
                  i === selectedImageIndex
                    ? classes.product__container__image__small__active
                    : ""
                }`}
              >
                <img
                  src={img.imageSrc}
                  className={`${classes.product__small__img} ${
                    i === 0 ? classes.product__small__img__smaller : ""
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ProductImages;
