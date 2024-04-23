/*****************
 * <div class="parent">
 *    <div class="clild">
 *        <h1>I'm h1 tag</h1>
 *    </div>
 * </div>
 * 
 * 
 * 
 * *************************/ 

const parent = React.createElement("div",{id:"parent"},
   [React.createElement("div",{id:"child"},
   [React.createElement("h1",{},"I'm h1 tag"),React.createElement("h2",{},"I'm h2 tag")]),
   React.createElement("div",{id:"child1"},
   [React.createElement("h1",{},"I'm h1 tag"),React.createElement("h2",{},"I'm h2 tag")])
]);



const Head = ReactDOM.createRoot(document.getElementById("header"));

Head.render(parent);