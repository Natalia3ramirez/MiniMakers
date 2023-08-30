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
          <div className="mason">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 3, 750: 4, 1020: 7 }}
              className="responsive"
            >
              <Masonry className='mason' gutter="10px">
                <img
                  src='https://i.pinimg.com/564x/bd/dc/f3/bddcf31fdb1edb050ade7801397a52fe.jpg'
                  alt='Photo 1'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/564x/22/d1/a4/22d1a4b95758e4ccd9389c5076a86496.jpg'
                  alt='Photo 2'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/736x/07/01/5d/07015d702eda67080700b0d57c1b644a.jpg'
                  alt='Photo 3'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/d3/5d/85/d35d850035a7e084480645d9c4b88400.jpg'
                  alt='Photo 4'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/4c/ff/e4/4cffe4c1e7feda4174c14b21a7cc0ea9.jpg'
                  alt='Photo 5'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/50/d4/8a/50d48ac10e4bca3671f8f887439f29dd.jpg'
                  alt='Photo 6'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/474x/e0/3b/83/e03b837dfc16bf31182034311afc14f2.jpg'
                  alt='Photo 7'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/e2/54/37/e254373beba1fce948e86539873dc169.jpg'
                  alt='Photo 1'
                  className="splash-image1"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/de/88/67/de8867a6e127ed747faba6550c6569ae.jpg'
                  alt='Photo 2'
                  className="splash-image2"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/d7/ec/2e/d7ec2ee1d62207ffb9daebc4342c3b02.jpg'
                  alt='Photo 3'
                  className="splash-image3"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/fc/be/6a/fcbe6af63f918ae66783a233eccb3be7.jpg'
                  alt='Photo 4'
                  className="splash-image4"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/19/a0/ea/19a0ea81d40b48243989b4bb43b0ebdb.jpg'
                  alt='Photo 5'
                  className="splash-image5"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/c8/33/b8/c833b8413f8f1b025005ec91d57f9137.jpg'
                  alt='Photo 6'
                  className="splash-image6"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/564x/8e/7c/b0/8e7cb070ae0f8196100b404cd20054ba.jpg'
                  alt='Photo 7'
                  className="splash-image7"
                  style={{ height: '400px' }}
                />


              </Masonry>
            </ResponsiveMasonry>
          </div>
          {/* <div className="mason">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 3, 750: 4, 1020: 7 }}
              className="responsive"
            >
              <Masonry className='mason' gutter="10px">
                <img
                  src='https://i.pinimg.com/564x/bd/dc/f3/bddcf31fdb1edb050ade7801397a52fe.jpg'
                  alt='Photo 1'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/564x/22/d1/a4/22d1a4b95758e4ccd9389c5076a86496.jpg'
                  alt='Photo 2'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/736x/07/01/5d/07015d702eda67080700b0d57c1b644a.jpg'
                  alt='Photo 3'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/d3/5d/85/d35d850035a7e084480645d9c4b88400.jpg'
                  alt='Photo 4'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/4c/ff/e4/4cffe4c1e7feda4174c14b21a7cc0ea9.jpg'
                  alt='Photo 5'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/50/d4/8a/50d48ac10e4bca3671f8f887439f29dd.jpg'
                  alt='Photo 6'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/474x/e0/3b/83/e03b837dfc16bf31182034311afc14f2.jpg'
                  alt='Photo 7'
                  className="splash-image"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/e2/54/37/e254373beba1fce948e86539873dc169.jpg'
                  alt='Photo 1'
                  className="splash-image1"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/de/88/67/de8867a6e127ed747faba6550c6569ae.jpg'
                  alt='Photo 2'
                  className="splash-image2"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/d7/ec/2e/d7ec2ee1d62207ffb9daebc4342c3b02.jpg'
                  alt='Photo 3'
                  className="splash-image3"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/fc/be/6a/fcbe6af63f918ae66783a233eccb3be7.jpg'
                  alt='Photo 4'
                  className="splash-image4"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/19/a0/ea/19a0ea81d40b48243989b4bb43b0ebdb.jpg'
                  alt='Photo 5'
                  className="splash-image5"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/236x/c8/33/b8/c833b8413f8f1b025005ec91d57f9137.jpg'
                  alt='Photo 6'
                  className="splash-image6"
                  style={{ height: '400px' }}
                />
                <img
                  src='https://i.pinimg.com/564x/8e/7c/b0/8e7cb070ae0f8196100b404cd20054ba.jpg'
                  alt='Photo 7'
                  className="splash-image7"
                  style={{ height: '400px' }}
                />


              </Masonry>
            </ResponsiveMasonry>
          </div> */}

        </div>
      </div>
      <div className="fade-effect"></div>
    </div>
  );
}

export default SplashPage;
