"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardActions } from "./file-actions";

// UserCell component to render user profile information
function UserCell({ userId }: { userId: Id<"users"> }) {
  const userProfile = useQuery(api.users.getUserProfile, { userId });

  if (!userProfile) {
    return (
      <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
        <Avatar className="w-6 h-6">
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        Loading...
      </div>
    );
  }

  return (
    <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
      <Avatar className="w-6 h-6">
        <AvatarImage src={userProfile.image} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {userProfile.name}
    </div>
  );
}

// Define columns for the DataTable
export const columns: ColumnDef<
  Doc<"files"> & { url: string; isFavorited: boolean }
>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    header: "User",
    cell: ({ row }) => <UserCell userId={row.original.userId} />,
  },
  {
    header: "Uploaded On",
    cell: ({ row }) => (
      <div>
        {formatRelative(new Date(row.original._creationTime), new Date())}
      </div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div>
        <FileCardActions
          file={row.original}
          isFavorited={row.original.isFavorited}
        />
      </div>
    ),
  },
];
