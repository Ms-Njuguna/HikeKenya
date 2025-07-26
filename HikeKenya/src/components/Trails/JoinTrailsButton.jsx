import React, { useEffect, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'sonner';
import {  Tooltip,  TooltipContent,  TooltipProvider,  TooltipTrigger } from "../ui/tooltip";

function JoinTrailsButton({ trailId }) {
  const { user } = useContext(AuthContext);
  const userId = user?.id;

  const [joined, setJoined] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setJoined(data.joinedTrails || []));
  }, [userId]);

  function handleJoinClick(e) {
    e.preventDefault();

    if (!userId) {
      navigate("/login-signup");
      return;
    }

    const normalizedJoined = joined.map(Number);

    if (normalizedJoined.includes(Number(trailId))) return;

    const updated = [...new Set([...normalizedJoined, Number(trailId)])];

    fetch(`http://localhost:3000/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ joinedTrails: updated }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update joined trails");
        }
        return res.json();
      })
      .then((data) => {
        setJoined(data.joinedTrails);
        toast.success("Successfully joined trail!", {
          description: "You’ll find it in your dashboard.",
        });
      })
      .catch((error) => {
        console.error("Join trail error:", error);
        toast.error("Could not join trail", {
          description: error.message,
        });
      });
  }

  if (!userId) {
    return <p className="text-sm text-gray-500">Log in to join this trail</p>;
  }

  const alreadyJoined = joined.includes(Number(trailId));

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleJoinClick}
            disabled={alreadyJoined}
            className={`px-3 py-1 rounded-[8px] ${
              alreadyJoined
                ? "bg-gray-300 text-black cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-#1F3B29"
            }`}
          >
            {alreadyJoined ? "Joined" : "Join Trail"}
          </button>
        </TooltipTrigger>
        {alreadyJoined && (
          <TooltipContent side="top">
            Trail has already been added to your trail list in your dashboard! <br></br> You can check it out and pay for it! 
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}


export default JoinTrailsButton; 