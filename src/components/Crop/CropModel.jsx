import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CropModel = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);

  const images = {
    apple : "https://tse3.mm.bing.net/th?id=OIP.kzo22vGPqcf7d5w_QJhrfQHaFj&pid=Api&P=0&h=180",
    banana : "http://upload.wikimedia.org/wikipedia/commons/b/b9/Banana_Tree_2.jpg",
    blackgram : "https://tse4.mm.bing.net/th?id=OIP.Pq5TCwTaGfFEUnriz_j7PgHaES&pid=Api&P=0&h=180",
    chickpea : "https://tse1.mm.bing.net/th?id=OIP.MOzXLiQygvRlaZ50neFnAgHaFj&pid=Api&P=0&h=180",
    coconut : "https://tse2.mm.bing.net/th?id=OIP.4YWVYV1iBpvbCwOMxsNyqgHaEH&pid=Api&P=0&h=180",
    coffee : "https://www.thoughtco.com/thmb/rkMuni0DYnhjO94mqy5fzbRxDXU=/2233x1256/smart/filters:no_upscale()/GettyImages-936840910-5c8ea8b2c9e77c0001ff0ae6.jpg",
    cotton : "https://tse3.mm.bing.net/th?id=OIP.PZkYktql-4AU5XoBMhpKiwHaE5&pid=Api&P=0&h=180",
    grapes : "https://tse3.mm.bing.net/th?id=OIP.ako7sJwyCmhhpnm1McmZqgHaE8&pid=Api&P=0&h=180",
    jute : "https://as2.ftcdn.net/v2/jpg/03/09/09/89/1000_F_309098926_9nbiDQvEeVMyJZbxH7koU4RWFoC7v50v.jpg",
    kidneybeans : "https://www.agrifarming.in/wp-content/uploads/2019/09/Comp1-20.jpg",
    lentil : "https://tse4.mm.bing.net/th?id=OIP.VwYNTz3d_1wuRoQF0BVhjgHaEK&pid=Api&P=0&h=180",
    maize : "https://frutasyverduras.info/wp-content/uploads/2019/04/mazorca-de-maiz-1024x730.jpg",
    mango : "https://tse2.mm.bing.net/th?id=OIP.t_xk-ud9yp818q-6UhqHcQAAAA&pid=Api&P=0&h=180",
    mothbeans : "https://thumbs.dreamstime.com/b/moth-sprouts-bean-vigna-aconitifolia-vigna-aconitifolia-drought-resistant-legume-commonly-grown-arid-semi-arid-regions-156881002.jpg",
    mungbean : "https://tse1.mm.bing.net/th?id=OIP.tsr134XdXIxYclXAy3hkKQHaE8&pid=Api&P=0&h=180",
    muskmelon : "https://tse1.mm.bing.net/th?id=OIP.cf8j_OfJr0FsnW_L4mb5aAHaE6&pid=Api&P=0&h=180",
    orange : "https://i-invdn-com.akamaized.net/news/Oranges_800x533_L_1421584771.jpg",
    papaya : "https://thumbs.dreamstime.com/b/papaya-tree-20724096.jpg",
    pigeonpeas : "https://gardenerspath.com/wp-content/uploads/2022/02/Pigeon-Peas-Growing-in-the-Garden.jpg",
    pomegranate : "https://plantix.net/en/library/assets/custom/crop-images/pomegranate.jpeg",
    rice : "https://tse2.mm.bing.net/th?id=OIP.rAvhbuZHiyo7nCj2DRBUwwHaD4&pid=Api&P=0&h=180",
    watermelon : "https://tse2.mm.bing.net/th?id=OIP.TuS26XRavLz8TyIV1T2x_gHaFB&pid=Api&P=0&h=180"
  }

  return (
    <div className="container vh-100">
      <div className="row">
        <div className="col-md-6 my-3 m-auto">
          {data && (
            <div className="card" style={{ width: "18rem" }}>
              <img src={images[data.result]} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text text-center">{data.result}</p>
              </div>
            </div>
          )}
          {!data && <h2>Internal server Error!!</h2>}
        </div>
      </div>
    </div>
  );
};

export default CropModel;
