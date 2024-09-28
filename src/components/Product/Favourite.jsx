import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';

const Favourite = ({id}) => {

  const [auth] = useAuth();

  const url = import.meta.env.VITE_AGRO_GENIUS_URL;;

    const fillHeart = "bi-heart-fill";
    const emptyHeart = "bi-heart";

    const [heart, setHeart] = useState(emptyHeart);

    const addFavourite = async() =>{
      try {
        const response =  await axios.post(`${url}/wishlist/user/${auth?.email}/product/${id}`,{
          headers: {
            Authorization: auth?.token,
          },
        });
        toast.success(response.data, {
          position: "top-right",
          autoClose: 3000,
        });
        heart === emptyHeart ? setHeart(fillHeart) : setHeart(emptyHeart);
        
      } catch (error) {
        toast.warning("Failed to add product to your favorites.", {
          position: "top-right",
          autoClose: 3000,
        });
      }

    }

  return (
    <span className={"bi "+heart} onClick={addFavourite}></span>
  );
}

export default Favourite;
