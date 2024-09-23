import error404 from "@/assets/404_images/404.png";
import cloud404 from "@/assets/404_images/404_cloud.png";
import "./styles.scss";
import { FC } from "react";

const Page404:FC = () => {

  const message = "The webmaster said that you can not enter this page...";

  return (
    <div className="wscn-http404-container">
      <div className="wscn-http404">
        <div className="pic-404">
          <img className="pic-404__parent" src={error404} alt="404" />
          <img className="pic-404__child left" src={cloud404} alt="404" />
          <img className="pic-404__child mid" src={cloud404} alt="404" />
          <img className="pic-404__child right" src={cloud404} alt="404" />
        </div>
        <div className="bullshit">
          <div className="bullshit__oops">OOPS!</div>
          <div className="bullshit__info">All rights reserved
            <a style={{"color": "#20a0ff"}} href="https://wallstreetcn.com" target="_blank">wallstreetcn</a>
          </div>
          <div className="bullshit__headline">{ message }</div>
          <div className="bullshit__info">Please check that the URL you entered is correct, or click the button below to return to the homepage.</div>
          <a href="" className="bullshit__return-home">Back to home</a>
        </div>
      </div>
    </div>
  )
}

export default Page404;