import { faBan, faFlag, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type React from "react";

interface FlaggedUserCardProps {
  userId: string;
  name: string;
  ban: boolean;
  mute: boolean;
  flagCount: number;
}

const FlaggedUserCard: React.FC<FlaggedUserCardProps> = ({
  userId,
  name,
  ban,
  mute,
  flagCount,
}) => {
  return (
    <div
      className="bg-pubnub-dark shadow overflow-hidden rounded-lg p-4 mb-2 flex justify-between items-center"
      key={userId}
    >
      <p className="text-md text-pubnub-white font-medium text-gray-900 overflow-hidden whitespace-nowrap overflow-ellipsis">
        {name}
      </p>
      <div className="flex items-center min-w-[100px] justify-end">
        {ban && (
          <div className="tooltip" data-tip="Banned">
            <FontAwesomeIcon icon={faBan} className="text-pubnub-red ml-2" />
          </div>
        )}
        {mute && (
          <div className="tooltip" data-tip="Muted">
            <FontAwesomeIcon
              icon={faVolumeMute}
              className="text-pubnub-light-grey ml-2"
            />
          </div>
        )}
        {flagCount > 0 && (
          <div className="tooltip" data-tip={`Flagged ${flagCount} times`}>
            <FontAwesomeIcon
              icon={faFlag}
              className="text-pubnub-yellow ml-2"
            />
            <span className="text-pubnub-white ml-1">{flagCount}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlaggedUserCard;
