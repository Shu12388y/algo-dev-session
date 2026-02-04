import { useParams } from "react-router";

function ProblemPage() {
  const id = useParams();

  return (
    <div className="bg-red-400 text-5xl text-red-800 mt-10">
      {JSON.stringify(id)}
    </div>
  );
}

export default ProblemPage;
