'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionModal } from '@/components/transactions/TransactionModal';
import { CSVExportButton } from '@/components/transactions/CSVExportButton';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useTransactions } from '@/hooks/useTransactions';
import { useTransactionStore } from '@/store/transaction-store';
import { Transaction, TransactionType } from '@/types';
import { TableRowSkeleton } from '@/components/shared/LoadingSkeleton';
import { Plus } from 'lucide-react';

interface TransactionFormInput {
  categoryId: string;
  amount: number;
  type: TransactionType;
  description?: string;
  date: string;
}

export default function TransactionsPage() {
  const { transactions, meta, isLoading, createTransaction, updateTransaction, deleteTransaction } =
    useTransactions();

  const { filters, setFilter } = useTransactionStore();

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeletingModalOpen, setDeletingModalOpen] = useState(false);

  const handleCreateClick = () => {
    setEditingTx(null);
    setModalOpen(true);
  };

  const handleEditClick = (tx: Transaction) => {
    setEditingTx(tx);
    setModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setDeletingModalOpen(true);
  };

  const handleModalSubmit = async (values: TransactionFormInput) => {
    try {
      if (editingTx) {
        await updateTransaction({ id: editingTx.id, data: values });
      } else {
        await createTransaction(values);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Failed to submit transaction:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingId) {
      try {
        await deleteTransaction(deletingId);
        setDeletingModalOpen(false);
        setDeletingId(null);
      } catch (error) {
        console.error('Failed to delete transaction:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Transactions Ledger"
        description="Search, filter, edit, and record your income and expenses."
        action={
          <div className="flex gap-2">
            <CSVExportButton transactions={transactions} />
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all shadow-md shadow-emerald-500/10"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </button>
          </div>
        }
      />

      {/* Query Filters component */}
      <TransactionFilters />

      {/* Transactions list */}
      {isLoading ? (
        <div className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-2">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </div>
      ) : (
        <TransactionTable
          transactions={transactions}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          page={filters.page}
          totalPages={meta?.totalPages || 1}
          onPageChange={(p) => setFilter('page', p)}
        />
      )}

      {/* Ledger Form Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingTx}
        isSubmitting={false}
      />

      {/* Delete Confirmation check */}
      <ConfirmDialog
        isOpen={isDeletingModalOpen}
        title="Delete Transaction Ledger"
        description="Are you sure you want to delete this ledger entry? This action is permanent and will reset associated budget balances."
        confirmLabel="Wipe Record"
        isDestructive
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingModalOpen(false)}
      />
    </div>
  );
}
