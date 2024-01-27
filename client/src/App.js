import MainLoginPage from "./components/logInUser/mainLoginPage";
import { useSelector } from 'react-redux';
import Dashboard from "./components/dashboard/dashboard"


function App() {
  const userDetail = useSelector((state) => state?.user?.user?.data)

  return (
    <div>
      {typeof userDetail !== 'undefined' ? <Dashboard />
        : <MainLoginPage />}
    </div>
  );
}

export default App;
