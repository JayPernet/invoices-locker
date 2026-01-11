import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProposalPage } from './features/proposal/ProposalPage';
import { AdminPage } from './features/admin/AdminPage';
import { NotFoundRedirect } from './components/NotFoundRedirect';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/propostas/:clientSlug/:proposalId" element={<ProposalPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFoundRedirect />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
