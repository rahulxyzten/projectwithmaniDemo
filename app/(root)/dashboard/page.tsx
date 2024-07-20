"use client";
import React from "react";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";

interface Admin {
  _id: string;
  email: string;
}

interface Category {
  _id: string;
  categoryName: string;
}

const page = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [admins, setAdmins] = useState<Admin[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [item, setItem] = useState("");

  useEffect(() => {
    // Redirect if not an admin
    if (!session?.user?.isAdmin) {
      router.push("/");
      return;
    }
  }, [session, router]);

  const fetchAdmins = async () => {
    try {
      const response = await fetch("/api/admin", {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      const data = await response.json();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category", {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
    fetchCategories();
  }, []);

  const handleAddAdmin = async (e: FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const response = await fetch("/api/admin/new", {
        method: "POST",
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      if (response.ok) {
        const newAdmin = await response.json();
        setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
        setEmail("");
        toast("Admin added successfully");
      } else {
        toast("Failed to add admin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      const response = await fetch("/api/category/new", {
        method: "POST",
        body: JSON.stringify({
          categoryName: item.trim().toLowerCase(),
        }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setItem("");
        toast("Category added successfully");
      } else {
        toast("Failed to add category");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    const hasConfirmed = confirm("Are you sure you want to delete this admin");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/admin/${id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast("Admin deleted successfully");
          setAdmins((prevAdmins) =>
            prevAdmins.filter((admin) => admin._id !== id)
          );
        } else {
          toast("Failed to delete admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this category"
    );

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/category/${id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast("Category deleted successfully");
          setCategories((prevCategories) =>
            prevCategories.filter((category) => category._id !== id)
          );
        } else {
          toast("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <section className="flex-center paddings mx-auto max-w-screen-lg flex-col">
      <div className="nav-padding w-full">
        <h1 className="mb-7 lg:ml-12 text-2xl xs:text-4xl font-bold text-white-800">
          Admins🫅🏻
        </h1>
        <div className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5 max-w-3xl mx-auto flex flex-col items-center justify-center mb-12 overflow-hidden">
          <Table
            className="whitespace-pre overflow-auto"
            removeWrapper
            aria-label="Example static collection table"
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>OPTION</TableColumn>
            </TableHeader>
            <TableBody>
              {admins.map((admin, index) => (
                <TableRow key={index}>
                  <TableCell className="text-white">{admin._id}</TableCell>
                  <TableCell className="text-white">{admin.email}</TableCell>
                  <TableCell className="text-white">
                    <div
                      onClick={() => handleDeleteAdmin(admin._id)}
                      className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
                    >
                      <svg
                        className="w-4 stroke-red-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      <button className="font-semibold text-sm text-red-700">
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 w-full">
            <form
              onSubmit={handleAddAdmin}
              className="flex flex-col justify-center sm:flex-row items-center"
            >
              <Input
                type="email"
                className="max-w-sm mr-3"
                variant="underlined"
                label="Email :"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-2 rounded active:scale-95 flex items-center justify-center gap-2"
              >
                {adding ? "Uploading..." : "Add"}
              </button>
            </form>
          </div>
        </div>
        <h1 className="mb-7 lg:ml-12 text-2xl font-bold xs:text-4xl text-white-800">
          categories✨
        </h1>
        <div className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5 max-w-2xl mx-auto flex flex-col items-center justify-center overflow-hidden">
          <Table
            className="max-w-xl whitespace-pre overflow-auto"
            removeWrapper
            aria-label="Example static collection table"
          >
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>NAME</TableColumn>
              <TableColumn>OPTION</TableColumn>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell className="text-white">{category._id}</TableCell>
                  <TableCell className="text-white">
                    {category.categoryName}
                  </TableCell>
                  <TableCell className="text-white">
                    <div
                      onClick={() => handleDeleteCategory(category._id)}
                      className="flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer"
                    >
                      <svg
                        className="w-4 stroke-red-700"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                      <button className="font-semibold text-sm text-red-700">
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 w-full">
            <form
              onSubmit={handleAddCategory}
              className="w-full flex flex-col justify-center sm:flex-row items-center"
            >
              <Input
                type="text"
                className="max-w-sm sm:max-w-72 mr-3"
                variant="underlined"
                label="Category name :"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <button
                type="submit"
                className="bg-purple w-40 hover:bg-pink transition duration-500 text-white font-bold py-2 px-4 mt-2 rounded active:scale-95 flex items-center justify-center gap-2"
              >
                {adding ? "Uploading..." : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
