import { SquarePen, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

const CardNote = ({ title, description, id, date, onDelete, deletingId }) => {
  return (
    <div className="card bg-base-300 w-full">
      <div className="card-body">
        <h2 className="card-title text-accent font-bold lg:text-2xl">
          {title}
        </h2>
        <p className="text-amber-50">{description}</p>
        <div className="flex justify-between items-center mt-6">
          <time dateTime={date}>{date}</time>
          <div className="flex gap-4">
            <NavLink to={`/editNote/${id}`}>
              <SquarePen className="text-white cursor-pointer hover:text-accent"></SquarePen>
            </NavLink>
            {deletingId === id ? (
              <span className="loading loading-spinner text-error"></span>
            ) : (
              <Trash
                className="text-red-400 cursor-pointer hover:text-red-600"
                onClick={() => onDelete(id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardNote;
