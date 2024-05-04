import "./App.css";
import OrderTable from "./components/orderTable";
function App() {
  return (
    <div className="bg-slate-50 h-screen font-mono">
      <div className="container max-w-[1300px] mx-auto pt-[30px]">
        <div className="text-3xl font-semibold">Menu</div>
        <OrderTable />
      </div>
      {/* <div className="flex h-full">
        <div className="sidebar w-[300px] shadow-md"></div>
        <div className="content"></div>
      </div> */}
    </div>
  );
}

export default App;
