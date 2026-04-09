import React from 'react'
import ClientHydrate from '../components/client/clientHydrate'
import ReactQueryProvider from '@/lib/reactQueryProviders'
import AdminRoute from '../utils/adminRoutes'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <ReactQueryProvider>
                <ClientHydrate>
                    <AdminRoute>
                        {children}
                    </AdminRoute>
                </ClientHydrate>
            </ReactQueryProvider>
        </div>
    )
}

export default AdminLayout
