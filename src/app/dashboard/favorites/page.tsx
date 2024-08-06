"use client";
import { useQuery } from "convex/react";
import { FileBrowser } from "../_components/file-browser";
import { api } from "../../../../convex/_generated/api";

export default function FavoritesPage() {
  const favorites = useQuery(api.files.getAllFavorites);

  if (!favorites) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <FileBrowser title="Favorites" favoritesOnly favorites={favorites} />
    </div>
  );
}

