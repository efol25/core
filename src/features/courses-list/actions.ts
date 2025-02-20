"use server";

import { revalidatePath } from "next/cache";
import { coursesRepository } from "./courses-repository";

export const courseCreateAction = async (
  revalidatePagePath: string,
  command: CreateListElementCommand,
) => {
  await coursesRepository.createCourseElement(command);
  revalidatePath(revalidatePagePath);
};
