// import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";
// import api from "../API";
// import PageTitle from "../PageTitle/PageTitle";
// import orders from '../../images/svg/orders.svg';


// const Orders = () => {
//     const [user] = useAuthState(auth);
//     const [orderList, setOrderList] = useState([])

//     useEffect(() => {
//         fetch(`${api}/orders/by-email/${user?.email}`)
//             .then((response) => response.json())
//             .then((result) => setOrderList(result))
//     }, [user?.email])

//     return (
//         <div className="container section">
//             <PageTitle title="কনফার্ম অর্ডার" />
//             <h4 className="title">কনফার্ম অর্ডার</h4>

//             <div className="row info">
//                 <div className="col-md-6 col-12">
//                     <img src={orders} className="img-fluid" alt='Sign In' />
//                 </div>
//                 <div className="col-md-6 col-12">

//                     {
//                         orderList?.products.map((order) => {
//                             return (<p>{order.name}</p>)
//                         })
//                     }



//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Orders;