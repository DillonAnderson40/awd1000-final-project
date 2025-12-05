import { useParams } from "react-router-dom";

export default function EditStock() {
  const { id } = useParams();
  return <h1>Edit Stock #{id}</h1>;
}
