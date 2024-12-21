import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-toastify";

const AddCourse = () => {
    const [lessons, setLessons] = useState<{ name: string, description: string, slug: string, videourl: string, courseId: string }[]>([{ name: "", description: "", slug: "", videourl: "", courseId: "" }]);

    const handleAddCourse = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent form submission

        const coursename = document.getElementById("coursename") as HTMLInputElement;
        const description = document.getElementById("description") as HTMLInputElement;
        //const published = document.getElementById("published") as HTMLInputElement;
        const author = document.getElementById("author") as HTMLInputElement;
        const thumbnail = document.getElementById("thumbnail") as HTMLInputElement;

        // Validate inputs
        if (!coursename.value || !description.value || !lessons.length) {
            alert("Course name, description, and lessons are required.");
            return;
        }

        const coursedata = {
            name: coursename.value.toString(),
            author: author.value.toString(),
            thumbnail: thumbnail.value.toString(),
            description: description.value.toString(),
            lessons: lessons.map(lesson => ({
                name: lesson.name,
                description: lesson.description,
                slug: lesson.slug,
                videourl: lesson.videourl,
                courseId: lesson.courseId, 
            })),
        };

        // Send data to the API
        try {
            const addNewCourse = await axios.post("/api/admin/course/coursefunctions", coursedata);
            toast.success("Course added successfully");
        } catch (error) {
            console.error(error);
            toast.error("Error adding course");
        }
    };

    const handleLessonChange = (index: number, field: string, value: string) => {
        const updatedLessons = [...lessons];
        updatedLessons[index][field as keyof typeof updatedLessons[number]] = value;
        setLessons(updatedLessons);
    };

    const handleAddLesson = () => {
        setLessons([...lessons, { name: "", description: "", slug: "", videourl: "", courseId: "" }]);
    };

    return (
        <form>
            <div className="grid gap-6">
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground font-bold font-3xl">
                        + Add a new course
                    </span>
                </div>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="coursename">Course Name</Label>
                        <Input
                            id="coursename"
                            type="text"
                            placeholder="Course Name"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="author">Author</Label>
                        <Input
                            id="author"
                            type="text"
                            placeholder="Author Name"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="thumbnail">Thumbnail</Label>
                        <Input
                            id="thumbnail"
                            type="text"
                            placeholder="Thumbnail URL"
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter your course's description.."
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lessons">Lessons</Label>
                        {lessons.map((lesson, index) => (
                            <div key={index} className="grid gap-2">
                                <Input
                                    id={`lesson-name-${index}`}
                                    type="text"
                                    placeholder="Lesson Name" 
                                    value={lesson.name}
                                    onChange={(e) =>
                                        handleLessonChange(index, "name", e.target.value)
                                    }
                                    required
                                />
                                <Textarea
                                    id={`lesson-description-${index}`}
                                    placeholder="Lesson Description"
                                    value={lesson.description}
                                    onChange={(e) =>
                                        handleLessonChange(index, "description", e.target.value)
                                    }
                                    required
                                />
                                <Input
                                    id={`lesson-slug-${index}`}
                                    type="text"
                                    placeholder="Lesson Slug"
                                    value={lesson.slug}
                                    onChange={(e) =>
                                        handleLessonChange(index, "slug", e.target.value)
                                    }
                                    required
                                />
                                <Input
                                    id={`lesson-videourl-${index}`}
                                    type="text"
                                    placeholder="Lesson URL"
                                    value={lesson.videourl}
                                    onChange={(e) =>
                                        handleLessonChange(index, "videourl", e.target.value)
                                    }
                                    required
                                />
                                <hr className="border-gray-800 my-4" />
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={handleAddLesson}
                            className="w-min justify-center items-center"
                        >
                            Add Lesson
                        </Button>
                    </div>
                    <Button
                        type="submit"
                        onClick={handleAddCourse}
                        className="w-min justify-center items-center"
                    >
                        <span className="text-xl">+</span> Add course
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default AddCourse;