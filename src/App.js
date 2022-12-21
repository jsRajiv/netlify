import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { Button, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getFirebaseToken, onMessageListener } from "./firebase";

export default function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });
  const [isTokenFound, setTokenFound] = useState(false);
  getFirebaseToken(setTokenFound);

  onMessageListener()
    .then((payload) => {
      console.log("payload is", payload);
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload);
    })
    .catch((err) => console.log("failed: ", err));

  return (
    <div className="App">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <header className="App-header">
        {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
        {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
        <h1>{notification && notification.body}</h1>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Button onClick={() => setShow(true)}>Show Toast</Button> */}
      </header>
    </div>
  );
}

// export default function App() {
//   const [show, setShow] = useState(false);
//   const [isTokenFound, setTokenFound] = useState(false);

//   getFirebaseToken(setTokenFound);
//   console.log("is token found is", isTokenFound);
//   return (
//     <div className="App">
//       <Toast
//         onClose={() => setShow(false)}
//         show={show}
//         delay={3000}
//         autohide
//         animation
//         style={{
//           position: "absolute",
//           top: 20,
//           right: 20,
//         }}
//       >
//         <Toast.Header>
//           <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
//           <strong className="mr-auto">Notification</strong>
//           <small>12 mins ago</small>
//         </Toast.Header>
//         <Toast.Body>There are some new updates that you might love!</Toast.Body>
//       </Toast>
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Button onClick={() => setShow(true)}>Show Toast</Button>
//       </header>
//       {isTokenFound && <div> Notification permission enabled 👍🏻</div>}
//       {!isTokenFound && <div> Need notification permission ❗️</div>}
//     </div>
//   );
// }
