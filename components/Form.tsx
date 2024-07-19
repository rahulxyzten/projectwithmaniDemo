"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
const Editor = dynamic(() => import("./Editor"), { ssr: false });

interface Project {
  title: string;
  summary: string;
  category: string;
  content: string;
  projectPrice: number;
  projectDiscount: number;
  razorpaylink: string;
  thumbnail: File;
  youtubelink: string;
  sourceCodelink: string;
}

interface Category {
  _id: string;
  categoryName: string;
}

interface Props {
  type: string;
  project: Project;
  setProject: (project: Project) => void;
  submitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({
  type,
  project,
  setProject,
  submitting,
  handleSubmit,
}: Props) => {
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories name
        const categoriesResponse = await fetch("/api/category");
        const categoriesData = await categoriesResponse.json();
        const categoryNamesList = categoriesData.map(
          (category: Category) => category.categoryName
        );
        setCategoryNames(categoryNamesList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (project.category) {
      setSelectedKeys([project.category]);
    }
  }, [project.category]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProject({ ...project, thumbnail: file });
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <form
      className="flex-center paddings mx-auto max-w-screen-xl flex-col"
      onSubmit={handleSubmit}
    >
      <div className="nav-padding w-full">
        <h1 className="mb-7 heading3 text-white-800">{type} your project ✨</h1>
        <motion.div
          className="shadow-sm dark:border-zinc-600 rounded-[10px] border-2 border-black-400 p-5"
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ duration: 0.5 }}
        >
          <Input
            type="text"
            className="mb-5 "
            variant="underlined"
            label="Title :"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
          />

          <Input
            type="text"
            className="mb-5 "
            variant="underlined"
            label="Summary :"
            value={project.summary}
            onChange={(e) =>
              setProject({ ...project, summary: e.target.value })
            }
          />

          <Select
            variant="underlined"
            label="Select an category :"
            className="max-w-xs h-full mb-7 text-white"
            value={project.category}
            selectedKeys={new Set(selectedKeys)}
            onSelectionChange={(keys) =>
              setSelectedKeys(Array.from(keys) as string[])
            }
            onChange={(e) =>
              setProject({ ...project, category: e.target.value })
            }
          >
            {categoryNames.map((item) => (
              <SelectItem className="text-white" key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <p className="mb-2 ml-1 text-sm text-gray-200">Content :</p>
          <Editor
            value={project.content}
            onChange={(value: string) =>
              setProject({ ...project, content: value })
            }
          />

          <div className="mt-7 flex flex-col md:flex-row justify-start md:gap-20">
            <Input
              type="number"
              className="mb-5 max-w-xs"
              variant="underlined"
              label="Project price :"
              value={project.projectPrice.toString()}
              onChange={(e) =>
                setProject({
                  ...project,
                  projectPrice: parseFloat(e.target.value),
                })
              }
            />
            <Input
              type="number"
              className="mb-5 max-w-xs"
              variant="underlined"
              label="Price discount :"
              value={project.projectDiscount.toString()}
              onChange={(e) =>
                setProject({
                  ...project,
                  projectDiscount: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <Input
            type="url"
            className="mb-5 "
            variant="underlined"
            label="Razorpay link :"
            value={project.razorpaylink}
            onChange={(e) =>
              setProject({ ...project, razorpaylink: e.target.value })
            }
          />

          <p className="mt-7 mb-2 ml-1 text-sm text-gray-200">
            Youtube thumbnail :
          </p>
          <Input
            type="file"
            className="mb-5"
            variant="underlined"
            placeholder=" "
            onChange={handleImage}
          />

          <Input
            type="url"
            className="mb-5 "
            variant="underlined"
            label="Youtube link :"
            value={project.youtubelink}
            onChange={(e) =>
              setProject({ ...project, youtubelink: e.target.value })
            }
          />

          <Input
            type="url"
            className="mb-5 "
            variant="underlined"
            label="Source code link :"
            value={project.sourceCodelink}
            onChange={(e) =>
              setProject({ ...project, sourceCodelink: e.target.value })
            }
          />

          <button
            className="cursor-pointer w-full block bg-white-800 border-0 rounded px-2 py-2 mt-1 hover:bg-white-500"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `{Updating}...` : type}
          </button>
        </motion.div>
      </div>
    </form>
  );
};

export default Form;
