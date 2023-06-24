import {TailSpin,ThreeDots} from 'react-loader-spinner';
import styles from "./Loader.module.css";

function Loader({text}) {
  return (
    <div className={styles.loaderWrapper}>
        <h2>Loading {text}...</h2>
        {/* <TailSpin 
        width={80}
        height={80}
        radius={1}
        color={"#3861fb"}
        /> */}
        <ThreeDots 
        height="80" 
        width="80" 
        radius="9"
        color="#89CFF0" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        />
    </div>
  )
}

export default Loader