import { Spinner } from "react-bootstrap";
import "bootstrap"

const Loader = () => {
    return (<>
        <div className=" d-flex flex-column align-items-center justify-content-center  text-center mx-auto">
            <Spinner
                animation="border"
                role="status"
                style={{
                    width: "75px",
                    height: "75px",
                    display: "block",
                    margin: "auto"

                }}
                className="spinner"
            ></Spinner>
            
        </div>

    </>)
}

export default Loader;