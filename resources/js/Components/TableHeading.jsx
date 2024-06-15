import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export const TableHeading = ({
  fieldName,
  fieldLabel,
  sortable = true,
  sort_field = null,
  sort_direction = null,
  sortChanged = () => {},
}) => {
  return (
    <th onClick={(e) => sortChanged(fieldName)} className="px-3 py-3">
      <div className={sortable ? "flex items-center gap-2 cursor-pointer" : ""}>
        {fieldLabel}
        {sortable && (
          <div className="flex flex-col items-center">
            <HiChevronUp
              className={`w-4 h-4 ${
                sort_field === fieldName &&
                sort_direction === "asc" &&
                "text-white w-5 h-5"
              }`}
            />
            <HiChevronDown
              className={`w-4 h-4 -mt-2 ${
                sort_field === fieldName &&
                sort_direction === "desc" &&
                "text-white w-5 h-5"
              }`}
            />
          </div>
        )}
      </div>
    </th>
  );
};
