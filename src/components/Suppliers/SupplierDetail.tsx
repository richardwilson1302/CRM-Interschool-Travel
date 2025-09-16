import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ArrowLeft, Building2, Mail, Phone, Globe, MapPin, Edit, Activity } from 'lucide-react';
import EditSupplierForm from '../Forms/EditSupplierForm';
import Layout from '../Layout/Layout';

export default function SupplierDetail() {
  const { id } = useParams<{ id: string }>();
  const { suppliers, excursions, loading } = useData();
  const [editingSupplier, setEditingSupplier] = React.useState(false);

  const supplier = suppliers.find(s => s.id === id);
  const supplierExcursions = excursions.filter(e => e.supplier_id === id);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!supplier) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Supplier not found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The supplier you're looking for doesn't exist or may have been deleted.
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
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{supplier.name}</h1>
                {supplier.contact_person && (
                  <p className="text-sm text-gray-600">Contact: {supplier.contact_person}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setEditingSupplier(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Supplier
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Supplier Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Supplier Information</h2>
                {supplier.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {supplier.category}
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Email</div>
                      <a href={`mailto:${supplier.email}`} className="text-blue-600 hover:text-blue-800">
                        {supplier.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-3 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">Phone</div>
                      <a href={`tel:${supplier.phone}`} className="text-blue-600 hover:text-blue-800">
                        {supplier.phone}
                      </a>
                    </div>
                  </div>

                  {supplier.website && (
                    <div className="flex items-center text-sm">
                      <Globe className="h-4 w-4 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">Website</div>
                        <a 
                          href={supplier.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {supplier.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {(supplier.address || supplier.city) && (
                    <div className="flex items-start text-sm">
                      <MapPin className="h-4 w-4 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium text-gray-900">Address</div>
                        <div className="text-gray-600">
                          {supplier.address && <>{supplier.address}<br /></>}
                          {supplier.city} {supplier.postcode}
                        </div>
                      </div>
                    </div>
                  )}

                  {supplier.focus && (
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">Focus/Specialty</div>
                      <div className="text-gray-600">{supplier.focus}</div>
                    </div>
                  )}

                  {supplier.approx_price && (
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">Approximate Price</div>
                      <div className="text-green-600 font-semibold">{supplier.approx_price}</div>
                    </div>
                  )}
                </div>
              </div>

              {supplier.specialties && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Specialties</h3>
                  <p className="text-sm text-gray-600">{supplier.specialties}</p>
                </div>
              )}

              {supplier.notes_for_groups && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Notes for School Groups</h3>
                  <p className="text-sm text-gray-600">{supplier.notes_for_groups}</p>
                </div>
              )}

              {supplier.notes && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">General Notes</h3>
                  <p className="text-sm text-gray-600">{supplier.notes}</p>
                </div>
              )}
            </div>

            {/* Associated Excursions */}
            {supplierExcursions.length > 0 && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Associated Excursions</h2>
                <div className="space-y-4">
                  {supplierExcursions.map((excursion) => (
                    <div key={excursion.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900">{excursion.name}</h3>
                          {excursion.description && (
                            <p className="text-sm text-gray-600 mt-1">{excursion.description}</p>
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
              <h2 className="text-lg font-medium text-gray-900 mb-4">Supplier Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Excursions</span>
                  <span className="text-lg font-semibold text-gray-900">{supplierExcursions.length}</span>
                </div>
                {supplier.travel_time && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Travel Time</span>
                    <span className="text-sm text-gray-900">{supplier.travel_time}</span>
                  </div>
                )}
                {supplier.transport_mode && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Transport</span>
                    <span className="text-sm text-gray-900">{supplier.transport_mode}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {editingSupplier && (
          <EditSupplierForm 
            supplier={supplier} 
            onClose={() => setEditingSupplier(false)} 
          />
        )}
      </div>
    </Layout>
  );
}