import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./SplashPage.css";

function SplashPage() {
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Redirect to="/home" />;

  return (

    <div className="splash-container">
      <div className="splash">
        <h1 className="splash-title">Get your next</h1>
        <h2 className="splash-sub-title">activity for your kids</h2>
      </div>
      <div className="splash-images">
        <div className="splash-images-container">
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 1020: 7 }}
        >
          <Masonry gutter="10px">
          <img
                src='https://i.pinimg.com/564x/bd/dc/f3/bddcf31fdb1edb050ade7801397a52fe.jpg'
                alt='Photo 1'
                className="splash-image"
                style={{ height: '350px' }}
              />
            <img
                src='https://i.pinimg.com/564x/22/d1/a4/22d1a4b95758e4ccd9389c5076a86496.jpg'
                alt='Photo 2'
                className="splash-image"
                style={{ height: '275px'}}
              />
              <img
                src='https://i.pinimg.com/736x/07/01/5d/07015d702eda67080700b0d57c1b644a.jpg'
                alt='Photo 3'
                className="splash-image"
                style={{ height: '230px'}}
              />
              <img
                src='https://i.pinimg.com/236x/d3/5d/85/d35d850035a7e084480645d9c4b88400.jpg'
                alt='Photo 4'
                className="splash-image"
                style={{ height: '150px'}}
              />
              <img
                src='https://i.pinimg.com/236x/4c/ff/e4/4cffe4c1e7feda4174c14b21a7cc0ea9.jpg'
                alt='Photo 5'
                className="splash-image"
                style={{ height: '230px'}}
              />
              <img
                src='https://i.pinimg.com/236x/50/d4/8a/50d48ac10e4bca3671f8f887439f29dd.jpg'
                alt='Photo 6'
                className="splash-image"
                style={{ height: '275px'}}
              />
              <img
                src='https://i.pinimg.com/474x/e0/3b/83/e03b837dfc16bf31182034311afc14f2.jpg'
                alt='Photo 6'
                className="splash-image"
                style={{ height: '350px'}}
              />


          </Masonry>
        </ResponsiveMasonry>
        </div>
      </div>
      <div className="fade-effect"></div>
    </div>
  );
}

export default SplashPage;
