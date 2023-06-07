import ImageGenerate from "../../components/ImageGenerate/ImageGenerate";
import NavIcons from "../../components/NavIcons/NavIcons";
import './ImageGen.css'

const ImageGen=()=>{
    return(
        <div className="ImageGen">
        <div className="navbar-div"><NavIcons/></div>
        <div className="tagLine">
        Let the AI make your imagination into visualization
        </div>
        <ImageGenerate/>
        </div>
    )
}

export default ImageGen