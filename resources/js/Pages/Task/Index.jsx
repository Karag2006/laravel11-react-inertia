import { Head, Link, router } from "@inertiajs/react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Pagination } from "@/Components/Pagination";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { TableHeading } from "@/Components/TableHeading";

const Index = ({ auth, tasks, queryParams = null }) => {
  queryParams = queryParams || {};
  const taskStatusKeys = Object.keys(TASK_STATUS_TEXT_MAP);
  const searchFieldChanged = (fieldName, value) => {
    if (value) queryParams[fieldName] = value;
    else delete queryParams[fieldName];

    router.get(route("task.index"), queryParams);
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

    router.get(route("task.index"), queryParams);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Tasks
        </h2>
      }
    >
      <Head title="Tasks" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
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
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          placeholder="Task Name"
                          defaultValue={queryParams.name}
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          {taskStatusKeys.map((statusName) => (
                            <option value={statusName} key={statusName}>
                              {TASK_STATUS_TEXT_MAP[statusName]}
                            </option>
                          ))}
                          {/* <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option> */}
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
                          <img
                            className="w-[60px]"
                            src={task.image_path}
                            alt=""
                          />
                        </td>
                        <td className="px-3 py-2">{task.name}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`px-2 py-1 rounded text-white
                            ${TASK_STATUS_CLASS_MAP[task.status]}
                          `}
                          >
                            {TASK_STATUS_TEXT_MAP[task.status]}
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
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
