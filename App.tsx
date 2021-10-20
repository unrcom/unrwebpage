import React from "react";
import DumyMain from "./components/DumyMain";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import CompanyProfile from "./components/CompanyProfile";
// import MaterialUiSample from "./components/MaterialUiSample";
// import LinePlot from "./components/LinePlot";
// import PiePlot from "./components/PiePlot";
// import BarPlot from "./components/BarPlot";
// import RadarPlot from "./components/RadarPlot";
// import BubblePlot from "./components/BubblePlot";

function App() {
  return (
    <div className="App">
      <DumyMain />
      {/* <MaterialUiSample />
      <LinePlot />
      <PiePlot />
      <BarPlot />
      <RadarPlot />
      <BubblePlot />
      <Router>
        <Switch>
          <Route path="/" component={PersistentDrawerLeft} exact />
          <Route path="/companyprofile" component={CompanyProfile} exact />
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
