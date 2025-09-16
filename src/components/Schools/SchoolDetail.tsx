import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ArrowLeft, School, Mail, Phone, Globe, MapPin, Edit, Calendar, Users } from 'lucide-react';
import EditSchoolForm from '../Forms/EditSchoolForm';
import Layout from '../Layout/Layout';

export default function SchoolDetail() {
  const { id } = useParams<{ id: string }>();
  const { schools, bookings, loading } = useData();
  const [editingSchool, setEditingSchool] = React.useState(false);

  const school = schools.find(s => s.id === id);
  const schoolBookings = bookings.filter(b => b.school_id === id);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!school) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <School className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">School not found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The school you're looking for doesn't exist or may have been deleted.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <School className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{school.name}</h1>
                {school.contact_person && (
                  <p className="text-sm text-gray-600">Contact: {school.contact_person}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setEditingSchool(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit School
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* School Information */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">School Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <a href={`mailto:${school.email}`} className="text-blue-600 hover:text-blue-800">
                        {school.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Phone</div>
                      <a href={`tel:${school.phone}`} className="text-blue-600 hover:text-blue-800">
                        {school.phone}
                      </a>
                    </div>
                  </div>

                  {school.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Website</div>
                        <a 
                          href={school.website.startsWith('http') ? school.website : `https://${school.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {school.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start text-sm">
                    <MapPin className="h-4 w-4 mr-3 text-gray-400 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900">Address</div>
                      <div className="text-gray-600">
                        {school.address}<br />
                        {school.city} {school.postcode}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {school.notes && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600">{school.notes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Bookings</span>
                  <span className="text-lg font-semibold text-gray-900">{schoolBookings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="text-lg font-semibold text-green-600">
                    £{schoolBookings.reduce((sum, b) => sum + b.total_price, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Participants</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {schoolBookings.reduce((sum, b) => sum + b.participant_count, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings History */}
        {schoolBookings.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Booking History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trip
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schoolBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/bookings/${booking.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {booking.trip?.title || 'Unknown Trip'}
                        </Link>
                        <div className="text-sm text-gray-500">
                          {booking.trip?.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'enquiry' ? 'bg-gray-100 text-gray-800' :
                          booking.status === 'quoted' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'paid' ? 'bg-green-100 text-green-800' :
                          booking.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1 text-gray-400" />
                          {booking.participant_count}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{booking.total_price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editingSchool && (
          <EditSchoolForm 
            school={school} 
            onClose={() => setEditingSchool(false)} 
          />
        )}
      </div>
    </Layout>
  );
}