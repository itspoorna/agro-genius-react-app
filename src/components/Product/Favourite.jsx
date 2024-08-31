import React, { useState } from 'react';

const Favourite = () => {

    const fillHeart = "bi-heart-fill";
    const emptyHeart = "bi-heart";

    const [heart, setHeart] = useState(emptyHeart);

    const addFavourite = () =>{
        heart === emptyHeart ? setHeart(fillHeart) : setHeart(emptyHeart);
    }

  return (
    <span className={"bi "+heart} onClick={addFavourite}></span>
  );
}

export default Favourite;
