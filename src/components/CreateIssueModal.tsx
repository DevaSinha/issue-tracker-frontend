"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { useIssues } from "@/hooks/useIssue";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";

const priorities = ["LOW", "MEDIUM", "HIGH"];

function PriorityDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {value || "Select priority"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {priorities.map((priority) => (
          <DropdownMenuItem key={priority} onClick={() => onChange(priority)}>
            {priority}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type FormData = {
  title: string;
  description: string;
  priority: string;
  status: string;
};

export default function IssueModal() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { refetch } = useIssues(id as string);

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      status: "TODO",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await apiClient.post(`/projects/${id}/issues`, data);
      reset();
      setOpen(false);
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Create Issue</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Issue</DialogTitle>
          <DialogDescription>Fill in the details below</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Title" {...register("title", { required: true })} />
          <Textarea placeholder="Description" {...register("description")} />
          <Controller
            control={control}
            name="priority"
            rules={{ required: true }}
            render={({ field }) => (
              <PriorityDropdown value={field.value} onChange={field.onChange} />
            )}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
