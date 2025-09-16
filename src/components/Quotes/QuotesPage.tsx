import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Search, Calendar, Users, DollarSign, Edit, Trash2, Download } from 'lucide-react';
import QuotationForm from './QuotationForm';
import { useData } from '../../contexts/DataContext';
import type { Quotation } from '../../types';

export default function QuotesPage() {
  const { quotations, deleteQuotation } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  // Check if quotations are available
  const quotationsAvailable = quotations.length > 0 || !loading;

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredQuotes = quotations.filter(quote =>
    quote.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    expired: 'bg-orange-100 text-orange-800'
  };

  const handleDeleteQuotation = async (id: string, schoolName: string) => {
    if (window.confirm(`Are you sure you want to delete the quotation for ${schoolName}?`)) {
      setDeletingId(id);
      try {
        await deleteQuotation(id);
      } catch (error) {
      {quotationsAvailable ? (
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">All Quotations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price per Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {quotations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-lg font-medium mb-2">No quotations yet</p>
                      <p>Create your first quotation to get started</p>
                    </td>
                  </tr>
                ) : (
                  quotations.map((quotation) => (
                    <tr key={quotation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/quotations/${quotation.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {quotation.school_name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quotation.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {quotation.pax}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{quotation.price_per_person.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        £{quotation.net_total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          quotation.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                          quotation.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          quotation.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {quotation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(quotation.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleEdit(quotation)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <Download className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Quotations Feature Not Available</h3>
          <p className="text-gray-600 mb-4">
            The quotations table needs to be created in your Supabase database to use this feature.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700 mb-2">To enable quotations:</p>
            <ol className="text-sm text-gray-600 list-decimal list-inside space-y-1">
              <li>Go to your Supabase project dashboard</li>
              <li>Navigate to the SQL Editor</li>
              <li>Run the quotations table migration script</li>
            </ol>
          </div>
        </div>
      )}

      {filteredQuotes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No quotes found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first quotation.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Quote
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map((quote) => (
            <div key={quote.id} className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Link
                    to={`/quotations/${quote.id}`}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {quote.school_name}
                  </Link>
                  <div className="flex items-center mt-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {quote.destination}
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[quote.status as keyof typeof statusColors]}`}>
                  {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{quote.pax} participants</span>
                  </div>
                  <div className="flex items-center text-gray-900 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>£{quote.net_total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                <span>Created {new Date(quote.created_at).toLocaleDateString()}</span>
                <span>Valid until {quote.valid_until ? new Date(quote.valid_until).toLocaleDateString() : 'No expiry'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEditingQuotation(quote)}
                  className="flex items-center justify-center text-xs bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700 transition-colors"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => generatePDF(quote)}
                  className="flex items-center justify-center text-xs bg-green-600 text-white py-2 px-3 rounded hover:bg-green-700 transition-colors"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center text-xs bg-gray-600 text-white py-2 px-3 rounded hover:bg-gray-700 transition-colors"
                >
                  Print
                </button>
                <button
                  onClick={() => handleDeleteQuotation(quote.id, quote.school_name)}
                  disabled={deletingId === quote.id}
                  className="flex items-center justify-center text-xs bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deletingId === quote.id ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b border-white"></div>
                  ) : (
                    <Trash2 className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}