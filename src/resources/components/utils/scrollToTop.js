// import { useEffect } from 'react';
// // import { withRouter } from "react-router-dom";

// import { useLocation, useParams } from 'react-router-dom';

// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let location = useLocation();
//         let params = useParams();
//         return <Component {...props} router={{ location, params }} />;
//     }

//     return ComponentWithRouterProp;
// }

// const ScrollToTop = ({ children, location }) => {
//     useEffect(() => {
//         window.scrollTo({
//             top: 0,
//             left: 0,
//             behavior: 'smooth'
//         });
//     }, [location]);
//     return children || null;
// };

// export default withRouter(ScrollToTop);
