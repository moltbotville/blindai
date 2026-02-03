'use client';

import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, matchesRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/matches')
      ]);

      const usersData = await usersRes.json();
      const matchesData = await matchesRes.json();

      setUsers(usersData.users || []);
      setMatches(matchesData.matches || []);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-gray-900">{users.length}</div>
            <div className="text-gray-600">Total Users</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-gray-900">{matches.length}</div>
            <div className="text-gray-600">Total Matches</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-gray-900">
              {matches.filter(m => m.status === 'accepted').length}
            </div>
            <div className="text-gray-600">Accepted Dates</div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Matches Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Matches</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User 1</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User 2</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {matches.map(match => (
                  <tr key={match.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{match.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{match.user1_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{match.user2_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {Math.round(match.compatibility_score * 100)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        match.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        match.status === 'proposed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {match.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(match.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
