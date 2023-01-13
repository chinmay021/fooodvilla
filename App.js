import React from "react";
import ReactDOM from "react-dom/client";

//React.createElement => Object => HTML(DOM)

const heading = React.createElement(
  "h1",
  {
    id: "title",
  },
  "Heading 1"
);

const heading2 = React.createElement(
  "h2",
  {
    id: "title",
  },
  "Heading 2"
);

const container = React.createElement(
  "div",
  {
    id: "container",
  },
  [heading, heading2]
);

console.log(heading);

//JSX

//we can write in different formats
const HeaderComponent = function () {
  return (
    <div>
      <h1> Namaste React Functional Component</h1>
      <h2> This is a h2 tag </h2>
    </div>
  );
};

//using arrow function
const HeaderComponent2 = () => {
  return (
    <div>
      <h1> Namaste React Functional Component</h1>
      <h2> This is a h2 tag </h2>
    </div>
  );
};

//using arrow function (more minified version)
const HeaderComponent3 = () => (
  <div>
    <h1> Namaste React Functional Component</h1>
    <h2> This is a h2 tag </h2>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

//passing a react element inside the root

//async defer

//root.render(container);
root.render(<HeaderComponent />);
