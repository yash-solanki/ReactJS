import React, {Component} from 'react';

// class NavBar extends Component {
//     render() { 
//         return (
//           <nav className="navbar navbar-light bg-light">
//             <a className="navbar-brand" href="#">
//               NavBar{" "}
//               <span className="badge badge-pill badge-secondary">
//                 {this.props.totalCounter}
//               </span>
//             </a>
//           </nav>
//         );
//     }
// }

const NavBar = ({totalCounter}) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="#">
        NavBar{" "}
        <span className="badge badge-pill badge-secondary">
          {totalCounter}
        </span>
      </a>
    </nav>
  );
};
 
 
export default NavBar;