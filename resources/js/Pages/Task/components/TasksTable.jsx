import { Link, router } from "@inertiajs/react";

import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";

import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { TableHeading } from "@/Components/TableHeading";
import { Pagination } from "@/Components/Pagination";

export const TasksTable = ({
  tasks,
  queryParams = null,
  routeName = "project.index",
  routeParam,
  hideProjectColumn = false,
}) => {
  queryParams = queryParams || {};
  const projectStatusKeys = Object.keys(PROJECT_STATUS_TEXT_MAP);
  const searchFieldChanged = (fieldName, value) => {
    if (value) queryParams[fieldName] = value;
    else delete queryParams[fieldName];

    router.get(route(routeName, routeParam), queryParams, {
      preserveScroll: true,
    });
  };

  const onKeyPress = (fieldName, event) => {
    if (event.key !== "Enter") return;

    searchFieldChanged(fieldName, event.target.value);
  };

  const sortChanged = (fieldName) => {
    if (fieldName === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = fieldName;
      queryParams.sort_direction = "asc";
    }

    router.get(route(routeName, routeParam), queryParams, {
      preserveScroll: true,
    });
  };

  return (
    <div className="overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <TableHeading
              fieldName="id"
              fieldLabel="ID"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            />
            <TableHeading
              fieldName="image_path"
              fieldLabel="Image"
              sortable={false}
            />
            {!hideProjectColumn && (
              <TableHeading
                fieldName="project.name"
                fieldLabel="Project Name"
                sortable={false}
              />
            )}
            <TableHeading
              fieldName="name"
              fieldLabel="Name"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            />
            <TableHeading
              fieldName="status"
              fieldLabel="Status"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            />
            <TableHeading
              fieldName="created_at"
              fieldLabel="Create Date"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            />
            <TableHeading
              fieldName="due_date"
              fieldLabel="Due Date"
              sort_field={queryParams.sort_field}
              sort_direction={queryParams.sort_direction}
              sortChanged={sortChanged}
            />
            <TableHeading
              fieldName="created_by"
              fieldLabel="Created By"
              sortable={false}
            />
            <TableHeading
              fieldName="actions"
              fieldLabel="Actions"
              sortable={false}
            />
          </tr>
        </thead>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
          <tr className="text-nowrap">
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            {!hideProjectColumn && <th className="px-3 py-3"></th>}

            <th className="px-3 py-3">
              <TextInput
                className="w-full"
                placeholder="Task Name"
                defaultValue={queryParams.name}
                onBlur={(e) => searchFieldChanged("name", e.target.value)}
                onKeyPress={(e) => onKeyPress("name", e)}
              />
            </th>
            <th className="px-3 py-3">
              <SelectInput
                className="w-full"
                defaultValue={queryParams.status}
                onChange={(e) => searchFieldChanged("status", e.target.value)}
              >
                <option value="">Select Status</option>
                {projectStatusKeys.map((statusName) => (
                  <option value={statusName} key={statusName}>
                    {PROJECT_STATUS_TEXT_MAP[statusName]}
                  </option>
                ))}
              </SelectInput>
            </th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
            <th className="px-3 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.data.map((task) => (
            <tr
              key={task.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th className="px-3 py-2">{task.id}</th>
              <td className="px-3 py-2">
                <img className="w-[60px]" src={task.image_path} alt="" />
              </td>
              {!hideProjectColumn && (
                <td className="px-3 py-2">{task.project.name}</td>
              )}
              <td className="px-3 py-2">{task.name}</td>
              <td className="px-3 py-2">
                <span
                  className={`px-2 py-1 rounded text-white
                            ${PROJECT_STATUS_CLASS_MAP[task.status]}
                          `}
                >
                  {PROJECT_STATUS_TEXT_MAP[task.status]}
                </span>
              </td>
              <td className="px-3 py-2">{task.created_at}</td>
              <td className="px-3 py-2">{task.due_date}</td>
              <td className="px-3 py-2">{task.createdBy.name}</td>
              <td className="px-3 py-2 text-right">
                <Link
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                  href={route("task.edit", task.id)}
                >
                  Edit
                </Link>
                <Link
                  className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                  href={route("task.destroy", task.id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination links={tasks.meta.links} />
    </div>
  );
};
