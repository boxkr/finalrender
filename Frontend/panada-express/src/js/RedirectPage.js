import React, {useEffect} from 'react'
import { useNavigate, useLocation } from "react-router-dom";

export default function RedirectPage() {
  const navigate = useNavigate();
  const currentState = useLocation().state;
  useEffect(() => {
    navigate(currentState.redirectDest, {"state": currentState});
  })
 return (
    <div> </div>
  )
}
