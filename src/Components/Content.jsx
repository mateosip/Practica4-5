import React, { useState, useEffect } from "react";
import axios from "axios";
import cloneDeep from "clone-deep";

const Content = (props) => {
  const URL = `https://www.youtube.com/embed/${props.videoSeleccionado}`;
  const [relatedToVideoID, setRelatedToVideoID] = useState(null);

  useEffect(() => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: process.env.REACT_APP_KEY,
          part: "snippet",
          relatedToVideoId: props.videoSeleccionado,
          type: "video",
        },
      })
      .then((response) => {
        setRelatedToVideoID(response.data.items);
      });
  }, [props.videoSeleccionado]);


  return (
    <div className="videoFrame">
      <div className="cabeceraContent">
        <div className="salir" onClick={() => props.setVideoSeleccionado(null)}>
          x
        </div>
        <iframe
          src={URL}
          width="420"
          height="345"
          className="videoFrame"
        ></iframe>
      </div>
      <div className="relacionados">
        {relatedToVideoID
          ? relatedToVideoID.map((videoRel) => {
              return (
                <div
                  onClick={() =>
                    props.setVideoSeleccionado(videoRel.id.videoId)
                  }
                  key={videoRel.etag}
                  className="miniatura"
                >
                  {videoRel.snippet.title}
                  <img
                    className="imagenMiniatura"
                    src={videoRel.snippet.thumbnails.medium.url}
                  ></img>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Content;
