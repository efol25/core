import React from "react";
import { coursesRepository } from "../courses-repository";
import CourseItem from "../ui/course-item";
import { revalidatePath } from "next/cache";

const CoursesList = async ({
  revalidatePagePath,
}: {
  revalidatePagePath: string;
}) => {
  const courses = await coursesRepository.getCoursesList();

  const handleDelete = async (courseId: string) => {
    "use server";

    await coursesRepository.deleteCourseElement({ id: courseId });

    revalidatePath(revalidatePagePath);
  };

  return (
    <div className="flex flex-col gap-3">
      {courses.map((courseItem) => {
        return (
          <CourseItem
            key={courseItem.id}
            course={courseItem}
            onDelete={handleDelete.bind(null, courseItem.id)}
          />
        );
      })}
    </div>
  );
};

export default CoursesList;
