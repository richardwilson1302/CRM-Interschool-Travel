import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ArrowLeft, Calendar, Users, Phone, Mail, MapPin, Edit, DollarSign } from 'lucide-react';
import EditBookingForm from '../Forms/EditBookingForm';
import ActivityLog from '../Activities/ActivityLog';
import { statusColors, statusLabels } from '../../utils/constants';
import Layout from '../Layout/Layout';

export default function BookingDetail() {
  const { id } = useParams<{ id: string }>();
  const { bookings, loading } = useData();
  const [editingBooking, setEditingBooking] = React.useState(false);

  const booking = bookings.find(b => b.id === id);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!booking) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Booking not found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The booking you're looking for doesn't exist or may have been deleted.
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
              <Calendar className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {booking.school?.name || 'Unknown School'}
                </h1>
                <p className="text-sm text-gray-600">
                  {booking.trip?.title} - {booking.trip?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[booking.status]}`}>
                {statusLabels[booking.status]}
              </span>
              <button
                onClick={() => setEditingBooking(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Booking
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Participants</div>
                      <div className="text-gray-600">{booking.participant_count}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Total Price</div>
                      <div className="text-gray-600">£{booking.total_price.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Contact Email</div>
                      <a href={`mailto:${booking.contact_email}`} className="text-blue-600 hover:text-blue-800">
                        {booking.contact_email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Contact Phone</div>
                      <a href={`tel:${booking.contact_phone}`} className="text-blue-600 hover:text-blue-800">
                        {booking.contact_phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Booking Date</div>
                      <div className="text-gray-600">{new Date(booking.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>

                  {booking.trip && (
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Trip Dates</div>
                        <div className="text-gray-600">
                          {new Date(booking.trip.departure_date).toLocaleDateString()} - {new Date(booking.trip.return_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {booking.special_requirements && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Special Requirements</h3>
                  <p className="text-sm text-gray-600">{booking.special_requirements}</p>
                </div>
              )}

              {booking.notes && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600">{booking.notes}</p>
                </div>
              )}
            </div>

            {/* Excursions */}
            {booking.excursions && booking.excursions.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Selected Excursions</h2>
                <div className="space-y-4">
                  {booking.excursions.map((bookingExcursion) => (
                    <div key={bookingExcursion.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {bookingExcursion.excursion?.name || 'Unknown Excursion'}
                          </h3>
                          {bookingExcursion.excursion?.description && (
                            <p className="text-sm text-gray-600 mt-1">{bookingExcursion.excursion.description}</p>
                          )}
                          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                            <span>{bookingExcursion.participant_count} participants</span>
                            <span className={`px-2 py-1 rounded-full ${
                              bookingExcursion.provider_status === 'not_contacted' ? 'bg-gray-100 text-gray-800' :
                              bookingExcursion.provider_status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                              bookingExcursion.provider_status === 'booked' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {bookingExcursion.provider_status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">£{bookingExcursion.total_price}</div>
                          <div className="text-xs text-gray-500">total cost</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Log */}
            <div className="bg-white shadow rounded-lg p-6">
              <ActivityLog bookingId={booking.id} />
            </div>
          </div>

          {/* Quick Actions & Links */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-3">
                {booking.school && (
                  <Link
                    to={`/schools/${booking.school.id}`}
                    className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    ← Back to {booking.school.name}
                  </Link>
                )}
                {booking.trip && (
                  <Link
                    to={`/trips/${booking.trip.id}`}
                    className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    View Trip Details →
                  </Link>
                )}
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Booking Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Cost</span>
                  <span className="font-medium">£{(booking.trip?.base_price || 0) * booking.participant_count}</span>
                </div>
                {booking.excursions && booking.excursions.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Excursions</span>
                    <span className="font-medium">
                      £{booking.excursions.reduce((sum, e) => sum + e.total_price, 0)}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span>£{booking.total_price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {editingBooking && (
          <EditBookingForm 
            bookingId={booking.id} 
            onClose={() => setEditingBooking(false)} 
          />
        )}
      </div>
    </Layout>
  );
}