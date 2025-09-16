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
        console.error('Error deleting quotation:', error);
        alert('Error deleting quotation. Please try again.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const generatePDF = (quotation: Quotation) => {
    // Create a simple text-based quotation document
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

Valid Until: ${quotation.valid_until ? new Date(quotation.valid_until).toLocaleDateString() : 'N/A'}

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

  if (showForm) {
    return <QuotationForm onClose={() => setShowForm(false)} onSave={() => setShowForm(false)} />;
  }

  if (editingQuotation) {
    return (
      <QuotationForm 
        quotation={editingQuotation}
        onClose={() => setEditingQuotation(null)} 
        onSave={() => setEditingQuotation(null)}
      />
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quotations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage tour quotations for schools
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Quote
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search quotes by school name or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

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