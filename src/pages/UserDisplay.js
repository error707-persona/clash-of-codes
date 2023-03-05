import React, { useState } from "react";
import "../components/CSS/UserDisplay.css";
import Tilt from "react-vanilla-tilt";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function UserDisplay({ id, image,image1,image2,image3, title, description, rate }) {
  const [wish, setWish] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="productright" onMouseLeave={() => setWish(false)}>
      <Tilt
        style={{ margin: "0px", padding: "0px" }}
        options={{ scale: 2, glare: true, "max-glare": 1, max: 25 }}
      >
        <div className="product_containers">
          <div className="product_cards">
            <div className="product_contents">
              <img
                src=""
                alt=""
                onMouseEnter={() => setWish(true)}
              />
              {wish && (
                <Button className="wishlist_button">
                  <FavoriteBorderIcon /> Wishlist
                </Button>
              )}
            </div>
            <div className="product_text ">
              <h4>Saurabh Yadav</h4>
              <p>Software Engineer</p>
              <span>Single</span>
            </div>
            <div className={`product_button `}>
              <Button className="button">
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
}

export default UserDisplay;
