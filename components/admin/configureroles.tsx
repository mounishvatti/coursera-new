import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ConfigureRoles() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form submission
        setLoading(true); // Set loading state
        setError(null); // Reset error state
        const email = document.getElementById("email") as HTMLInputElement;
        const role = document.getElementById("role") as HTMLSelectElement;
        // Validate inputs
        if (!email.value || !role.value) {
            toast.error("Both email and role are required.");
            setLoading(false);
            return;
        }

        const data = {
            email: email.value,
            role: role.value,
        };

        try {
            await axios.post("/api/admin/configurerole", data);
            toast.success("Role updated successfully! 🎉");
            setEmail(""); // Reset email field
            setRole(""); // Reset role field
        } catch (err) {
            console.error(err);
            toast.error("Failed to update role. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">
                    🙇🏻‍♂️ Update Roles
                </h2>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="w-min border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="" disabled>Select a role</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 mt-4 font-semibold rounded-lg shadow-lg ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-stone-900 text-white hover:bg-stone-800"
                        }`}
                    >
                        {loading ? `Setting role to ${role}...` : `Set Role`}
                    </Button>
                </div>
            </div>
        </form>
    );
}
