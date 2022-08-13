import React, { useState, useRef, useEffect } from "react";
import useApp from "../../hooks/general/useApp";

interface BannerProps {
  user: boolean;
}

const BannerContainer: React.FC<BannerProps> = function ({ user }) {
  const { handleModal } = useApp();
  const [hover, setHover] = useState(false);

  const btnElem = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const curr = btnElem.current;

    console.log(curr);
    function mouseOver() {
      console.log("hello???");
      if (!hover) {
        setHover(true);
      }
    }

    function mouseOut() {
      if (hover) {
        setHover(false);
      }
    }

    // if (btnElem) {
    //   btnElem.addEventListener("mouseover", mouseOver);
    //   btnElem.addEventListener("mouseout", mouseOut);
    // }

    return () => {
      // if (btnElem) {
      //   btnElem.removeEventListener("mouseover", mouseOver);
      //   btnElem.removeEventListener("mouseout", mouseOut);
      // }
    };
  }, [hover]);

  console.log(hover);

  return (
    <div className="banner-wrapper">
      <div className="max-wrapper">
        <div className="bg-img-wrapper">
          <div className="img-wrapper">
            {user ? (
              <div className="add-img-btn-wrapper">
                <button
                  ref={btnElem}
                  className="add-img__btn"
                  onClick={(e) => handleModal!(e, "user-photo")}
                >
                  {hover ? (
                    <span className="btn-text btn-text--inline">
                      add photos
                    </span>
                  ) : (
                    <span className="btn-text btn-text--none"></span>
                  )}
                  <i className="fa-solid fa-camera" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;
