import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, Edit, Clock, Activity } from 'lucide-react';
import EditTripForm from '../Forms/EditTripForm';
import ExcursionForm from '../Forms/ExcursionForm';
import Layout from '../Layout/Layout';

export default function TripDetail() {
  const { id } = useParams<{ id: string }>();
  const { trips, bookings, excursions, loading } = useData();
  const [editingTrip, setEditingTrip] = React.useState(false);
  const [showExcursionForm, setShowExcursionForm] = React.useState(false);

  const trip = trips.find(t => t.id === id);
  const tripBookings = bookings.filter(b => b.trip_id === id);
  const tripExcursions = excursions.filter(e => e.trip_id === id);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!trip) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Trip not found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The trip you're looking for doesn't exist or may have been deleted.
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

  const isUpcoming = new Date(trip.departure_date) > new Date();
  const isPast = new Date(trip.return_date) < new Date();

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
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{trip.title}</h1>
                <p className="text-sm text-gray-600">{trip.destination}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowExcursionForm(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Activity className="h-4 w-4 mr-2" />
                Add Excursion
              </button>
              <button
                onClick={() => setEditingTrip(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Trip
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trip Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Trip Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Departure</div>
                    <div className="text-gray-600">{new Date(trip.departure_date).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Return</div>
                    <div className="text-gray-600">{new Date(trip.return_date).toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Duration</div>
                    <div className="text-gray-600">{trip.duration_days} days</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Max Participants</div>
                    <div className="text-gray-600">{trip.max_participants}</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <DollarSign className="h-4 w-4 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Base Price</div>
                    <div className="text-gray-600">£{trip.base_price} per person</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    isPast ? 'bg-gray-400' : isUpcoming ? 'bg-green-400' : 'bg-yellow-400'
                  }`}></div>
                  <div>
                    <div className="font-medium text-gray-900">Status</div>
                    <div className="text-gray-600">
                      {isPast ? 'Completed' : isUpcoming ? 'Upcoming' : 'In Progress'}
                    </div>
                  </div>
                </div>
              </div>

              {trip.description && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-sm text-gray-600">{trip.description}</p>
                </div>
              )}

              {trip.itinerary && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Itinerary</h3>
                  <div className="text-sm text-gray-600 whitespace-pre-line">{trip.itinerary}</div>
                </div>
              )}
            </div>

            {/* Excursions */}
            {tripExcursions.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Available Excursions</h2>
                <div className="space-y-4">
                  {tripExcursions.map((excursion) => (
                    <div key={excursion.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900">{excursion.name}</h3>
                          {excursion.description && (
                            <p className="text-sm text-gray-600 mt-1">{excursion.description}</p>
                          )}
                          {excursion.supplier && (
                            <p className="text-sm text-blue-600 mt-1">
                              Supplier: {excursion.supplier.name}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">£{excursion.price}</div>
                          <div className="text-xs text-gray-500">per person</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                        {excursion.duration_hours && (
                          <span>Duration: {excursion.duration_hours}h</span>
                        )}
                        {excursion.max_participants && (
                          <span>Max: {excursion.max_participants} people</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Trip Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Bookings</span>
                  <span className="text-lg font-semibold text-gray-900">{tripBookings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Revenue</span>
                  <span className="text-lg font-semibold text-green-600">
                    £{tripBookings.reduce((sum, b) => sum + b.total_price, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Participants</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {tripBookings.reduce((sum, b) => sum + b.participant_count, 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Available Excursions</span>
                  <span className="text-lg font-semibold text-purple-600">{tripExcursions.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings for this Trip */}
        {tripBookings.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Bookings for this Trip</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School
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
                  {tripBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/schools/${booking.school_id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {booking.school?.name || 'Unknown School'}
                        </Link>
                        <div className="text-sm text-gray-500">
                          {booking.contact_email}
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

        {editingTrip && (
          <EditTripForm 
            trip={trip} 
            onClose={() => setEditingTrip(false)} 
          />
        )}
        
        {showExcursionForm && (
          <ExcursionForm 
            tripId={trip.id}
            tripTitle={trip.title}
            onClose={() => setShowExcursionForm(false)} 
          />
        )}
      </div>
    </Layout>
  );
}