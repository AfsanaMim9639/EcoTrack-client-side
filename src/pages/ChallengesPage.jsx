import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActiveChallenges from "../components/ActiveChallenges";
import GlobalSpinner from "../components/GlobalSpinner";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ecotrack-server-side.vercel.app';

const ChallengesPage = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    sortBy: "date",
    startDate: "",
    endDate: "",
    minParticipants: "",
    maxParticipants: ""
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalChallenges: 0
  });

  const fetchChallenges = async () => {
    try {
      setLoading(true);
      setError(null); // Reset error

      const params = new URLSearchParams();
      
      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      if (filters.category) params.append("category", filters.category);
      if (filters.difficulty) params.append("difficulty", filters.difficulty);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);
      if (filters.minParticipants) params.append("minParticipants", filters.minParticipants);
      if (filters.maxParticipants) params.append("maxParticipants", filters.maxParticipants);
      params.append("page", pagination.currentPage);
      params.append("limit", 20);

      const url = `${API_BASE_URL}/api/challenges?${params.toString()}`;
      console.log("🔗 Fetching:", url);

      const res = await fetch(url);

      if (!res.ok) {
        const errText = await res.text();
        console.error("❌ Fetch error:", res.status, errText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("✅ Response:", result);

      if (result.success) {
        setChallenges(result.data || []);
        setPagination(result.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalChallenges: result.data?.length || 0
        });
      } else if (Array.isArray(result)) {
        setChallenges(result);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalChallenges: result.length
        });
      } else {
        console.error("❌ Error:", result.message);
        setChallenges([]);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message);
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchChallenges();
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filters, pagination.currentPage]);

  
  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to page 1
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setFilters({
      category: "",
      difficulty: "",
      sortBy: "date",
      startDate: "",
      endDate: "",
      minParticipants: "",
      maxParticipants: ""
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

   
  

  if (loading) return <GlobalSpinner />;
  return (
    <div className="min-h-screen bg-forest text-white py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 mt-10">
          All Challenges
        </h1>
        <p className="text-center text-white/70 mb-12 text-lg">
          Join challenges and make a positive impact on the environment
        </p>

        {/* Search Bar + Add Challenge Button */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-2/3 lg:w-3/4">
            <div className="relative">
              {/* Search Icon */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Search Input */}
              <input
                type="text"
                placeholder="Search challenges by name, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(10, 46, 31, 0.8), rgba(16, 43, 30, 0.8))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(74, 222, 128, 0.3)",
                }}
              />

              {/* Clear Button */}
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Add Challenge Button */}
          <button
            onClick={() => navigate("/add-challenges")}
            className="group relative w-full md:w-auto px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--leaf))",
              color: "white",
              boxShadow: "0 8px 30px rgba(74, 222, 128, 0.4)",
            }}
          >
            <svg className="w-5 h-5 transform group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="relative z-10">Add Challenge</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Category Filter - Multiple selection using $in */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              style={{
                background: "rgba(10, 46, 31, 0.8)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                color: "white"
              }}
            >
              <option value="">All Categories</option>
              <option value="Waste Reduction">Waste Reduction</option>
              <option value="Water Conservation">Water Conservation</option>
              <option value="Energy Conservation">Energy Conservation</option>
              <option value="Sustainable Transport">Sustainable Transport</option>
              <option value="Green Living">Green Living</option>
              <option value="Tree Planting">Tree Planting</option>
              <option value="Carbon Reduction">Carbon Reduction</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange("difficulty", e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              style={{
                background: "rgba(10, 46, 31, 0.8)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                color: "white"
              }}
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Start Date Filter - Using $gte */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Start Date (From)</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              style={{
                background: "rgba(10, 46, 31, 0.8)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                color: "white",
                colorScheme: "dark"
              }}
            />
          </div>

          {/* End Date Filter - Using $lte */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Start Date (To)</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              style={{
                background: "rgba(10, 46, 31, 0.8)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                color: "white",
                colorScheme: "dark"
              }}
            />
          </div>

          {/* Min Participants Filter - Using $gte */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Min Participants</label>
            <input
              type="number"
              placeholder="e.g., 10"
              value={filters.minParticipants}
              onChange={(e) => handleFilterChange("minParticipants", e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              style={{
                background: "rgba(10, 46, 31, 0.8)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                color: "white"
              }}
            />
          </div>

          {/* Max Participants Filter - Using $lte */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Max Participants</label>
            <input
              type="number"
              placeholder="e.g., 1000"
              value={filters.maxParticipants}
              onChange={(e) => handleFilterChange("maxParticipants", e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              style={{
                background: "rgba(10, 46, 31, 0.8)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                color: "white"
              }}
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
              style={{
                background: "rgba(10, 46, 31, 0.8)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                color: "white"
              }}
            >
              <option value="date">Newest First</option>
              <option value="popularity">Most Popular</option>
              <option value="participants">Most Participants</option>
              <option value="duration">Shortest Duration</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <div className="flex items-end">
            {(searchQuery || filters.category || filters.difficulty || filters.sortBy !== "date" || 
              filters.startDate || filters.endDate || filters.minParticipants || filters.maxParticipants) && (
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(239, 68, 68, 0.2)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  color: "white"
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || filters.category || filters.difficulty || filters.startDate || 
          filters.endDate || filters.minParticipants || filters.maxParticipants) && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-white/70">Active Filters:</span>
            {searchQuery && (
              <span className="px-3 py-1 rounded-full text-xs bg-accent/20 border border-accent/40 text-white">
                Search: "{searchQuery}"
              </span>
            )}
            {filters.category && (
              <span className="px-3 py-1 rounded-full text-xs bg-accent/20 border border-accent/40 text-white">
                Category: {filters.category}
              </span>
            )}
            {filters.difficulty && (
              <span className="px-3 py-1 rounded-full text-xs bg-accent/20 border border-accent/40 text-white">
                Difficulty: {filters.difficulty}
              </span>
            )}
            {filters.startDate && (
              <span className="px-3 py-1 rounded-full text-xs bg-accent/20 border border-accent/40 text-white">
                From: {filters.startDate}
              </span>
            )}
            {filters.endDate && (
              <span className="px-3 py-1 rounded-full text-xs bg-accent/20 border border-accent/40 text-white">
                To: {filters.endDate}
              </span>
            )}
            {filters.minParticipants && (
              <span className="px-3 py-1 rounded-full text-xs bg-accent/20 border border-accent/40 text-white">
                Min Participants: {filters.minParticipants}
              </span>
            )}
            {filters.maxParticipants && (
              <span className="px-3 py-1 rounded-full text-xs bg-accent/20 border border-accent/40 text-white">
                Max Participants: {filters.maxParticipants}
              </span>
            )}
          </div>
        )}

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-white/60">
            Showing {challenges.length} of {pagination.totalChallenges} challenges
          </p>
          <p className="text-sm text-white/60">
            Page {pagination.currentPage} of {pagination.totalPages}
          </p>
        </div>
      </div>

      {/* Challenges Display */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-center text-lg text-white/80">Loading challenges...</p>
        </div>
      ) : challenges.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="w-24 h-24 text-white/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-center text-xl text-white/70 mb-2">No challenges found</p>
          <p className="text-center text-sm text-white/50">
            {error ? `Error: ${error}` : "Try adjusting your filters or search term"}
          </p>
          <button
            onClick={fetchChallenges}
            className="mt-4 px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "var(--accent)",
              color: "white"
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <ActiveChallenges showAll={true} challenges={challenges} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: pagination.hasPrevPage ? "var(--accent)" : "rgba(74, 222, 128, 0.2)",
                  color: "white"
                }}
              >
                Previous
              </button>
              
              <span className="text-white/80">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: pagination.hasNextPage ? "var(--accent)" : "rgba(74, 222, 128, 0.2)",
                  color: "white"
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Back to Home Button */}
      <div className="text-center mt-16">
        <button
          onClick={() => navigate("/")}
          className="group px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 hover:scale-105 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(34, 197, 94, 0.2))",
            color: "white",
            border: "2px solid rgba(74, 222, 128, 0.3)",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </span>
          <div className="absolute inset-0 bg-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
        </button>
      </div>
    </div>
  );
};

export default ChallengesPage;