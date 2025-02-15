import { useSelector } from "react-redux";

export const RequestStatus = () => {
  const status = useSelector((state) => state.status);

  return (
    <div>
      <h3>Request status</h3>
      <p id="request-status">{status}</p>
    </div>
  );
};