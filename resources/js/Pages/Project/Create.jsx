import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

const Create = ({ auth }) => {
  const projectStatusKeys = Object.keys(PROJECT_STATUS_TEXT_MAP);
  const { data, setData, post, errors, reset } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();

    post(route("project.store"));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Create new Project
        </h2>
      }
    >
      <Head title="Create Project" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="flex flex-col gap-4 p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="flex flex-col gap-2">
                <InputLabel htmlFor="project_name" value="Project Name" />
                <TextInput
                  className="block w-full"
                  id="project_name"
                  type="text"
                  name="name"
                  isFocused={true}
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} />
              </div>

              <div className="flex flex-col gap-2">
                <InputLabel
                  htmlFor="project_image_path"
                  value="Project Image"
                />
                <TextInput
                  className="block w-full"
                  id="project_image_path"
                  type="file"
                  name="image"
                  value={data.image}
                  onChange={(e) => setData("image", e.target.value)}
                />
                <InputError message={errors.image} />
              </div>

              <div className="flex flex-col gap-2">
                <InputLabel
                  htmlFor="project_description"
                  value="Project Description"
                />
                <TextAreaInput
                  className="block w-full"
                  id="project_description"
                  name="description"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} />
              </div>

              <div className="flex flex-col gap-2">
                <InputLabel
                  htmlFor="project_due_date"
                  value="Project Due Date"
                />
                <TextInput
                  className="block w-full"
                  id="project_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} />
              </div>

              <div className="flex flex-col gap-2">
                <InputLabel htmlFor="project_status" value="Project Status" />
                <SelectInput
                  className="block w-full"
                  id="project_status"
                  name="status"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value=""></option>
                  {projectStatusKeys.map((statusName) => (
                    <option value={statusName} key={statusName}>
                      {PROJECT_STATUS_TEXT_MAP[statusName]}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.status} />
              </div>

              <div className="flex justify-end gap-2">
                <Link
                  className="block bg-gray-100 py-1 px-3 text-gray-800 rounded transition-all hover:bg-gray-200"
                  href={route("project.index")}
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Create;
