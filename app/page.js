"use client";

import { redirect } from 'next/navigation';

const HomePage = () => {
    redirect('/card');
    return null;
};

export default HomePage;