"use client";

import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
       document.cookie = "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NTYiLCJlbWFpbCI6ImFkbWluQHRlc3QuY29tIiwicm9sZSI6ImFkbWluIn0.signature; path=/";
    }, []);
    return <div>Public Home Page</div>;
}