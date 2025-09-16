import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { ArrowLeft, FileText, Calendar, Users, DollarSign, Edit, Download, Trash2 } from 'lucide-react';
import QuotationForm from './QuotationForm';
import Layout from '../Layout/Layout';
import type { Quotation } from '../../types';

export default function QuotationDetail() {
  const { id } = useParams<{ id: string }>();
  const { quotations, deleteQuotation, loading } = useData();
  const [editingQuotation, setEditingQuotation] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const quotation = quotations.find(q => q.id === id);

  const handleDelete = async () => {
    if (!quotation) return;
    
    if (window.confirm(`Are you sure you want to delete the quotation for ${quotation.school_name}?`)) {
      setDeleting(true);
      try {
        await deleteQuotation(quotation.id);
        // Navigate back to quotes page after deletion
        window.history.back();
      } catch (error) {
        console.error('Error deleting quotation:', error);
        alert('Error deleting quotation. Please try again.');
      } finally {
        setDeleting(false);
      }
    }
  };

  const generatePDF = (quotation: Quotation) => {
    const content = `
EDUCATIONAL TOUR QUOTATION

School: ${quotation.school_name}
Party Leader: ${quotation.party_leader || 'N/A'}
Destination: ${quotation.destination}
Accommodation: ${quotation.accommodation || 'N/A'}
Board: ${quotation.board || 'N/A'}

Travel Dates:
Departure: ${quotation.date_out_uk ? new Date(quotation.date_out_uk).toLocaleDateString() : 'N/A'}
Return: ${quotation.date_back_uk ? new Date(quotation.date_back_uk).toLocaleDateString() : 'N/A'}
Duration: ${quotation.number_of_days} days, ${quotation.number_of_nights} nights

Group Details:
Total Participants: ${quotation.pax}
Free Places: ${quotation.free_places}
IST Staff: ${quotation.ist_staff_qty}

Financial Summary:
Total Cost: £${quotation.total_cost.toFixed(2)}
Markup: £${quotation.markup_amount.toFixed(2)}
Net Total: £${quotation.net_total.toFixed(2)}
Price Per Person: £${quotation.price_per_person.toFixed(2)}
Profit: £${quotation.profit.toFixed(2)}

Cost Breakdown:
${quotation.cost_items.filter(item => item.subtotal > 0).map(item => 
  `${item.description}: £${item.subtotal.toFixed(2)}`
).join('\n')}

Valid Until: ${quotation.valid_until ? new Date(quotation.valid_until).toLocaleDateString() : 'No expiry'}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quotation-${quotation.school_name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!quotation) {
    return (
      <Layout>
        <div className="p-6">
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Quotation not found</h3>
            <p className="mt-1 text-sm text-gray-500">
              The quotation you're looking for doesn't exist or may have been deleted.
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

  if (editingQuotation) {
    return (
      <QuotationForm 
        quotation={quotation}
        onClose={() => setEditingQuotation(false)}
        onSave={() => setEditingQuotation(false)}
      />
    );
  }

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    expired: 'bg-orange-100 text-orange-800'
  };

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
              <FileText className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{quotation.school_name}</h1>
                <p className="text-sm text-gray-600">{quotation.destination}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[quotation.status]}`}>
                {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
              </span>
              <button
                onClick={() => generatePDF(quotation)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button
                onClick={() => setEditingQuotation(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 disabled:opacity-50"
              >
                {deleting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quotation Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quotation Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">School Name</div>
                    <div className="text-sm text-gray-900">{quotation.school_name}</div>
                  </div>
                  
                  {quotation.party_leader && (
                    <div>
                      <div className="text-sm font-medium text-gray-700">Party Leader</div>
                      <div className="text-sm text-gray-900">{quotation.party_leader}</div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700">Destination</div>
                    <div className="text-sm text-gray-900">{quotation.destination}</div>
                  </div>
                  
                  {quotation.accommodation && (
                    <div>
                      <div className="text-sm font-medium text-gray-700">Accommodation</div>
                      <div className="text-sm text-gray-900">{quotation.accommodation}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {quotation.date_out_uk && (
                    <div>
                      <div className="text-sm font-medium text-gray-700">Departure Date</div>
                      <div className="text-sm text-gray-900">{new Date(quotation.date_out_uk).toLocaleDateString()}</div>
                    </div>
                  )}
                  
                  {quotation.date_back_uk && (
                    <div>
                      <div className="text-sm font-medium text-gray-700">Return Date</div>
                      <div className="text-sm text-gray-900">{new Date(quotation.date_back_uk).toLocaleDateString()}</div>
                    </div>
                  )}
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700">Duration</div>
                    <div className="text-sm text-gray-900">{quotation.number_of_days} days, {quotation.number_of_nights} nights</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-gray-700">Participants</div>
                    <div className="text-sm text-gray-900">{quotation.pax} total ({quotation.ist_staff_qty} IST staff)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price/Unit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotation.cost_items.filter(item => item.subtotal > 0).map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          £{item.pricePerUnit.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.quantityRequired} × {item.daysRequired} days
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          £{item.subtotal.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Summary</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Cost</span>
                  <span className="text-lg font-semibold text-gray-900">£{quotation.total_cost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Markup</span>
                  <span className="text-lg font-semibold text-blue-600">£{quotation.markup_amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <span className="text-sm font-medium text-gray-900">Net Total</span>
                  <span className="text-xl font-bold text-green-600">£{quotation.net_total.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Price Per Person</span>
                  <span className="text-lg font-semibold text-purple-600">£{quotation.price_per_person.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Profit</span>
                  <span className="text-lg font-semibold text-emerald-600">£{quotation.profit.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Quotation Info</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created</span>
                  <span className="text-gray-900">{new Date(quotation.created_at).toLocaleDateString()}</span>
                </div>
                {quotation.valid_until && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Valid Until</span>
                    <span className="text-gray-900">{new Date(quotation.valid_until).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Exchange Rate</span>
                  <span className="text-gray-900">{quotation.exchange_rate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}