import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";

type Lesson = {
  name: string;
  description: string;
  slug: string;
  videoUrl?: string; // Assuming video is optional
};

const addCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const coursedata = req.body;

    // Input validation
    if (
      !coursedata.name ||
      !coursedata.authorId ||
      !coursedata.thumbnail ||
      !coursedata.description ||
      !coursedata.lessons ||
      !coursedata.slug
    ) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required." });
    }

    try {
      // Ensure slug is unique
      const existingCourse = await prisma.course.findUnique({
        where: { slug: coursedata.slug },
      });
      if (existingCourse) {
        return res
          .status(400)
          .json({ success: false, error: "Slug already exists." });
      }

      // Create the course with lessons
      const course = await prisma.course.create({
        data: {
          name: coursedata.name,
          description: coursedata.description,
          thumbnail: coursedata.thumbnail,
          slug: coursedata.slug,
          authorId: coursedata.authorId,
          published: coursedata.published || false,
          lessons: {
            create: coursedata.lessons.map((lesson: Lesson) => ({
              name: lesson.name,
              description: lesson.description,
              slug: lesson.slug,
              video: lesson.videoUrl
                ? {
                    create: { url: lesson.videoUrl },
                  }
                : undefined, // Optional video relation
            })),
          },
        },
      });

      return res
        .status(201)
        .json({ success: true, message: "Course added successfully", data: course });
    } catch (error) {
      console.error("Error adding course:", error);
      return res
        .status(500)
        .json({ success: false, error: "An error occurred while adding the course." });
    }
  } else {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
};

const updateCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { id, name, description, published } = req.body;

    if (!id || !name || !description) {
      return res
        .status(400)
        .json({ success: false, error: "ID, name, and description are required." });
    }

    try {
      const course = await prisma.course.update({
        where: { id: Number(id) },
        data: {
          name,
          description,
          published: published ?? undefined,
        },
      });

      return res
        .status(200)
        .json({ success: true, message: "Course updated successfully", data: course });
    } catch (error) {
      console.error("Error updating course:", error);
      return res
        .status(500)
        .json({ success: false, error: "An error occurred while updating the course." });
    }
  } else {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
};

const deleteCourse = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, error: "ID is required." });
    }

    try {
      const course = await prisma.course.delete({
        where: { id: Number(id) },
      });

      return res
        .status(200)
        .json({ success: true, message: "Course deleted successfully", data: course });
    } catch (error) {
      console.error("Error deleting course:", error);
      return res
        .status(500)
        .json({ success: false, error: "An error occurred while deleting the course." });
    }
  } else {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      return addCourse(req, res);
    case "PUT":
      return updateCourse(req, res);
    case "DELETE":
      return deleteCourse(req, res);
    default:
      return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}