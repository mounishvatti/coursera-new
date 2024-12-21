import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BlacklistUsers = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [currentBlockStatus, setCurrentBlockStatus] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch current block status when email is set
  useEffect(() => {
    if (email) {
      setLoading(true);  // Start loading when email is entered
      axios
        .get("/api/admin/blacklistuser", { params: { email } })
        .then((response) => {
          setCurrentBlockStatus(response.data?.blacklisted ?? null);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to fetch block status.");
        })
        .finally(() => setLoading(false));  // Stop loading once request is complete
    }
  }, [email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);  // Reset error state

    if (!email) {
      toast.error("Please provide a valid email.");
      setLoading(false);
      return;
    }

    try {
      const data = {
        email,
        blockStatus: currentBlockStatus ? "false" : "true", // Toggle block status
      };

      await axios.post("/api/admin/blacklistuser", data);
      toast.success(currentBlockStatus ? "User unblocked successfully!" : "User blocked successfully!");
      setEmail(""); // Reset email field
    } catch (err) {
      console.error(err);
      toast.error("Failed to update block status. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Update Block Status
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
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

          <Button
            type="submit"
            disabled={loading || currentBlockStatus === null || !email}
            className={`w-full py-3 mt-4 font-semibold rounded-lg shadow-lg ${
              loading || currentBlockStatus === null
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-stone-900 text-white hover:bg-stone-800"
            }`}
          >
            {loading
              ? "Processing..."
              : currentBlockStatus
              ? "Unblock user"
              : "Block user"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default BlacklistUsers;