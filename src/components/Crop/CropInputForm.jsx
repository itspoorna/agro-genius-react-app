import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CropInputForm = () => {

  const navigate = useNavigate();

  const [fieldData, setData] = useState({
    "nitrogen" : 0,
    "potassium" : 0,
    "phosphorous" : 0,
    "ph": 0,
    "city" : ""
  });

  const handleChange = (event) =>{
    const { name, value} = event.target;
    setData( (prevData) => ({...prevData, [name] : value}))
  }
  
  const handleSubmit = (event)=>{
      event.preventDefault();
      try {
          const fetchResponse = async () =>{
              const response = await fetch(`http://127.0.0.1:5000/crop-predict`,{
                method : "POST",
                headers : {
                  "Content-Type" : "application/json"
                },
                body : JSON.stringify(fieldData)
              })
              const data = await response.json();
              console.log(data);
              navigate('/crop-result', { state: data });
              // setData(data);
            }
            
            fetchResponse();
      
          } catch (error) {
              console.log(error);
          }
  }
  return (
    <>
      <div className="container vh-100">
        <div className="row">
        <form className="col-md-6 offset-md-3 g-3 mt-5">
            <h4 className="text-center">Enter the following details</h4>
          <div className="col-md-12 my-4">
            <input type="number" className="form-control" name="nitrogen" placeholder="Nitrogen" onChange={handleChange}/>
          </div>
          <div className="col-md-12 mb-4">
            <input
              type="number"
              className="form-control"
              name="potassium"
              placeholder="Potasium"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-4">
            <input
              type="number"
              className="form-control"
              name="phosphorous"
              placeholder="Phosphorous"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-4">
            <input
              type="number"
              className="form-control"
              name="ph"
              placeholder="Enter your soil ph Value"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 mb-4">
            <input type="text" className="form-control" name="city" placeholder="City" onChange={handleChange}/>
          </div>
          <div className="col-md-12 mb-4 mt-2">
            <button type="submit" className="btn btn-primary col-sm-12" onClick={handleSubmit}>
              Get Recommendation
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default CropInputForm;
