import React from "react";

export default function ExploreHeader({ title, tagline }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-neutral mb-2 text-center">{title}</h1>
      {tagline && (
        <p className="text-center text-gray-500 mb-6 text-sm">{tagline}</p>
      )}
    </>
  );
}