import TrendCard from "../../components/TrendCard/TrendCard";
import NavIcons from "../../components/NavIcons/NavIcons";
import './Trend.css'

const Trend=()=>{
    return (
        <div className="trend-div">
            <div className="navbar-div"><NavIcons/></div>
            <TrendCard />
        </div>
    )
}

export default Trend