/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
// react imports.
import React,{useEffect,useState} from "react";
import axios from "axios";
//css imports
import "./Product.css";
import path from 'path'
// icon imports
import { FaHeart } from "react-icons/fa";
import { BsFillBagPlusFill } from "react-icons/bs";

function Product(props){

    const {
        phone_number
    } = props;

    const [product,setProduct]=useState([]);
    const [loadproduct,setloadProduct]=useState(true);

    


    //Function to load All products on Home Screen onLoad.
    useEffect(()=>{

        async function Load_Products(){
            try{
                const response = await axios.get(
                    "http://localhost:3003/api/user/getAllproduct"
                    
                     
                )
    
                console.log(response.data.product1);
                setProduct(response.data.product1);
                setloadProduct(false);
            }catch(error){
                console.log(error);
            }
        }

        
        Load_Products();


        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const addToWishlist = async(e, idy) => {
        e.preventDefault();
        console.log(idy);
        console.log(phone_number);
        try{
            const response = await axios.post(
                "http://localhost:3003/api/user/addtowishlist",
                {
                    phone_no : phone_number,
                    product_id : idy
                }
            )

            console.log(response);
        }catch(error){
            console.log(error);
        }
    };


    return(
        <div className="products">
        {loadproduct ?(
            <>
                loading . . .
            </>
        ):(
            <>
                {product.map((pr)=>{
                    const img_path = "C:\\prjct\\Myntra-HackerRamp-main\\client\\src\\img\\jordan.jpg"
                    return (
                        <div className="product-card">
                            <img
                                className="card-img-top"
                                // src={`${img_path}/img/${pr.img}`}
                                src={`${img_path}`}
                                alt="Card image cap"
                            />
                            <div className="card-body">
                                <h5 className="card-title"><strong>{pr.p_name}</strong></h5>
                                <p className="card-text">{pr.p_brand}</p>
                                <p className="card-text">
                                    <strong>Rs {pr.p_dis_price}</strong>
                                    &nbsp;&nbsp;
                                    <strike>{pr.p_orig_price}</strike>
                                    &nbsp;&nbsp;
                                    <span style={{ color: "red" }}>
                                        ({pr.p_discount}% off)
                                    </span>
                                </p>
                                <div className="btn-box">
                                    <button className="card-btn wishlist-btn" onClick={(e)=>addToWishlist(e,pr.p_id)}>
                                        <FaHeart className="cardbtn-icons"/>
                                        <span>
                                            Favourite
                                        </span>
                                    </button>
                                    <button className="card-btn buy-btn">
                                        <BsFillBagPlusFill className="cardbtn-icons"/>
                                        <span>
                                            Buy
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </>
        )}
        </div>

    )
}

export default Product;