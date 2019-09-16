// import React from 'react';
//
// class fetchDataFromApi extends React.Component{
//     column;
//
//     constructor(props) {
//         super(props);
//         this.state = {
//           items: [],
//             isLoaded : false
//         };
//         this.column = ['userId', 'id', 'title', 'completed'];
//     }
//
//     componentDidMount() {
//         fetch('https://jsonplaceholder.typicode.com/todos')
//             .then(res => res.json())
//             .then(json => {
//                 console.log("json====>",json);
//                 this.setState({
//                     items: json,
//                     isLoaded: true
//                 })
//             })
//     }
//
//     // renderTableHeader() {
//     //     let header = Object.keys(this.state.items[0])
//     //     return header.map((key, index) => {
//     //         return <th key={index}>{key.toUpperCase()}</th>
//     //     })
//     // }
//
//     renderTableData() {
//         return this.state.items.map((student, index) => {
//             const { id, completed, title, userId } = student //destructuring
//             return (
//                 <tr key={id}>
//                     <td>{id}</td>
//                     <td>{completed}</td>
//                     <td>{title}</td>
//                     <td>{userId}</td>
//                 </tr>
//             )
//         })
//     }
//
//
//     render() {
//         return (
//             <table id='students'>
//                 <tbody>
//                 {/*<tr>{this.renderTableHeader()}</tr>*/}
//                 {this.renderTableData()}
//                 </tbody>
//             </table>
//         );
//     }
// }
//
// export default fetchDataFromApi;
//
