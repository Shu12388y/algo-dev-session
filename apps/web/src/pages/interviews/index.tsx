import { useParams } from "react-router";
import TechnicalPage from "./_components/technicalPage";
function Interviews() {
  const { id } = useParams();
  console.log(id)

  if(id === "technical"){
    return(
        <TechnicalPage/>
    )
  }
  return (
    <div>
      {id === "technical" && <TechnicalPage />}
      {id === "behavioral" && <>Behaviour </>}
    </div>
  );
}

export default Interviews;
