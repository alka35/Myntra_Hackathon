//react importsimports
import React , {useState,useEffect} from "react";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
// import { render } from "react-dom";

// css imports
import "./Friends.css";

// componenet imports
import ChatBox from "../chatbox/Chatbox";
import { FaUserPlus, FaSearch } from "react-icons/fa";

function Friends(props){

    const {
        phone_number,
        name
    } = props;

    // console.log(phone_number);

    const [search , setSearch] = useState("");
    const [show , setShow ] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [pendingRequest, setPendingRequest] = useState({});
    const [listOfFriends, setlistOfFriends] = useState({});
    const [load, setLoad] = useState(true);
    const [loading, setloading] = useState(true);
    const [prof, setprof] = useState([]);
    const [flag ,setFlag] = useState(true);
    const [roomId, setRoomId] = useState("");
    const [showwishlist, setShowWishlist] = useState({});
    const [fl ,setf] = useState(true);

    //funtions that load all the pending requests and list of friends on Load.
    useEffect(()=>{

        async function Load_request(){
            try{
                
                const response = await axios.post(
                    "http://localhost:3003/api/user/allPendingReq",
                    {
                        phone_no : phone_number
                    }
                )
    
                console.log(response.data.arr2);
                setPendingRequest(response.data.arr2);
                setLoad(false);
            }catch(error){
                console.log(error);
            }
        }

        async function Load_List_friends(){
            try{
                const response = await axios.post(
                    "http://localhost:3003/api/user/allFriends",
                    {
                        phone_no : phone_number
                    }
                )
                console.log(response.data.arr2);
                setlistOfFriends(response.data.arr2);
                setloading(false);
            }catch(error){
                console.log(error);
            }
        }

        Load_request();
        Load_List_friends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    


    //function to search through avalible users.
    const search_function =async(e)=>{
        e.preventDefault();

        try{
            const response = await axios.post(
                "http://localhost:3003/api/user/getnames",
                {
                    name : search,
                }
            )

            console.log(response);
            setSearchResults(response.data);
            setShow(true);
        }catch(error){
            console.log(error);
        }
    }

    //function to send Request to user.
    const sendRequest = async(e,phone)=>{
        console.log("made it into sendreq")
        e.preventDefault();
        try{
            console.log("phone",phone);
            console.log(phone_number);
            const response = await axios.post(
                "http://localhost:3003/api/user/sendFriendReq",
                {
                    f_phone_no : phone,
                    u_phone_no : phone_number
                }
            )

            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

    //function to accept friend request.
    const accept_Request = async(e, phone)=>{
        try{
            const response = await axios.post(
                "http://localhost:3003/api/user/AcceptFriendReq",
                {   
                    u_phone_no : phone_number,
                    f_phone_no : phone
                }
            )

            console.log(response);
        }catch(error){
            console.log(error);
        }
    }

    //funtion to load name of the user from user details.
    const load_Name = async(e,phone)=>{
        try{
            const response = await axios.post(
                "http://localhost:3003/api/user/getuser",
                {
                    phone_no : phone
                }
            )

            console.log(response);
            setprof(response.data.user1[0]);
            setFlag(false);
        }catch(error){
            console.log(error);
        }

        //function to show wishlist.
        try{
            const response = await axios.post(
                "http://localhost:3003/api/user/allproductsWishlist",
                {
                    phone_no : phone
                }
            )
            setShowWishlist(response.data.arr2);
            console.log(response);
            setf(false);
        }catch(error){
            console.log(error);
        }
    }

    let flagChatbox = false;
    const toggleChatbox = async(e) => {
        e.preventDefault();
        flagChatbox = !document.getElementById("chatbox").classList.toggle("disable-sth",flagChatbox);
        console.log(prof.phone_no);
        console.log(phone_number);
        try{
            const response = await axios.post(
                "http://localhost:3003/api/user/getRoomId",
                {
                    u_phone_no:phone_number,
                    f_phone_no:prof.phone_no
                }
            )

            console.log(response.data.x);
            setRoomId(response.data.x);
        }catch(error){
            console.log(error);
        }
    };


    return (
        <div className="container-fluid">
            <div className="col-xs-3 col-md-3 Left_div_friends">
                <h3 className="friend-list-head">FRIENDS LIST</h3>
                <div className="friend-list-body">
                    {loading ? (
                        <div>Loading</div>
                    ):(
                        <>
                            {listOfFriends.map((friend)=>{
                                return(
                                    <div className="friends_box">
                                        <div className="friend-list-pic" onClick={(e)=>load_Name(e,friend.phone_no)}>
                                            <img 
                                            src={`./img/${friend.img}`}
                                            alt="friend" />
                                        </div>
                                        <div className="info_tab" >
                                            <h6 onClick={(e)=>load_Name(e,friend.phone_no)}>{friend.name}</h6>
                                            <p>5 Mutual Friends</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
                <h3 className="friend-list-head">REQUESTS</h3>
                <div className="friend-list-body">
                    {/* !!!!! Use this one as template !!!! */}
                    {load ?(
                        <div>Loading</div>
                    ):(
                        <>
                            {pendingRequest.map((req)=>{
                                return(
                                    <div className="friends_box">
                                        <div className="friend-list-pic">
                                            <img 
                                            src={`./img/${req.img}`} 
                                            alt="friend" />
                                        </div>
                                        <div className="info_tab">
                                            <h6>{req.name}</h6>
                                            <p onClick={(e)=>accept_Request(e,req.phone_no)}>
                                                Accept Request
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>

            <div className="col-xs-9 col-md-9 right_div_friends">
                <div className="search_Bar">
                    <input
                        className="search_input"
                        placeholder="Search Friends"
                        value = {search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <FaSearch className="search-btn" onClick={search_function}/>
                </div>
                {show && search!=="" ? (
                    <div className="search_results">
                        <div className="results"> {/* profile list */}
                            {searchResults.map((result)=>{
                                return(
                                    <div className="profile_car"> {/* profiles */}
                                        <div className="oir">
                                            <div className="p-pic"></div>
                                            <div className="p-name">{result.name}</div>
                                        </div>
                                        {
                                            // ? Note: write onClick function in send-request class
                                        }
                                        <div className="send-request">
                                            <div className="send-btn">
                                                <div onClick={(e)=>sendRequest(e,result.phone_no)}>
                                                    <FaUserPlus/>
                                                </div>
                                                <h5>Send</h5>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ):(<></>)}
                {flag ? (
                    <>
                        Loading
                    </>
                ):(
                    <div className="WishlistNames">
                        <div className="circle_img">
                            <img src={`./img/${prof.img}`} alt="profile_pic"/>
                        </div>
                        <div className="in">
                            <h3>{prof.name}</h3>
                            <div className="bt">
                                <button>Remove Friend</button>
                                <button onClick={toggleChatbox} >Messages</button>
                            </div>
                        </div>
                    </div>
                )}
                {/* <hr className="line"/> */}
                <div className="help-dialogue">
                    <h4>
                        Help your friend choose better by rating items in
                        their wishlist
                    </h4>
                </div>
                <div className="friend_wishlist">
                    {fl ? (
                        <>
                            Loading.
                        </>
                    ):(
                        <>
                            {/* {showwishlist!==null?showwishlist.map((val)=>{
                                return(
                                    <div className="wishlist_card">
                                        <div className="card_left">
                                            <img
                                                className="prod_im"
                                                src={`./img/${val.img}`}
                                                alt="product_image"
                                            />
                                        </div>
                                        <div className="card_right">
                                            <h5 className="card-title">{val.p_name}</h5>
                                            <h5 className="card-brand">{val.p_brand}</h5>
                                            <h6
                                                className="card-cost"
                                                style={{
                                                    margin: "10px 0 0 0",
                                                    fontSize: "1.5rem",
                                                }}
                                            >
                                                {val.p_orig_price}
                                            </h6>
                                            <p
                                                style={{
                                                    color: "green",
                                                    fontSize: "1.1rem",
                                                }}
                                            >
                                                inclusive of all taxes
                                            </p>
                                            <ReactStars
                                                count={5}
                                                size={33}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                </div>
                                )
                            }):""} */}
                        </>
                    )}
                </div>
                <ChatBox flagChatbox={flagChatbox} toggleChatbox={toggleChatbox} roomId = {roomId} name={name}/>
            </div>
        </div>
    );
}

export default Friends;