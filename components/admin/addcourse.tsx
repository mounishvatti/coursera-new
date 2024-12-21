import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AddCourse = () => {
    const handleAddCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent form submission
        const name = document.getElementById("name") as HTMLInputElement;
        const description = document.getElementById(
            "description",
        ) as HTMLInputElement;
        const published = document.getElementById(
            "published",
        ) as HTMLInputElement;

        // Validate inputs
        if (!name.value || !description.value) {
            alert("Both name and description are required.");
            return;
        }

        const data = {
            name: name.value,
            description: description.value,
            published: published.checked,
        };

        // Send data to the API
        fetch("/api/courses", {
            method: "POST",
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Course added successfully");
            })
            .catch((error) => {
                console.error(error);
                alert("Error adding course");
            });
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
                        <Textarea
                            id="lessons"
                            placeholder="Enter your course's lessons.."
                            required
                        />
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
